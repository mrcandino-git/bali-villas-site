/**
 * Airbnb Villa Scraper
 * --------------------
 * Phase 1 — scrape & download ALL images to /raw/<villa>/
 * Phase 2 — curate the best 12–18 per villa into /public/villas/<villa>/
 *
 * Usage:
 *   cd scripts && npm install && node scraper.js
 */

const puppeteer = require("puppeteer");
const axios = require("axios");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const VILLAS = [
  { name: "villa-vittoria", url: "https://www.airbnb.co.uk/rooms/581864799939880567" },
  { name: "villa-lumira",   url: "https://www.airbnb.co.uk/rooms/1173027803281523078" },
  { name: "villa-salty",    url: "https://www.airbnb.co.uk/rooms/21816459" },
  { name: "villa-lux",      url: "https://www.airbnb.co.uk/rooms/1007160083731851693" },
  { name: "villa-aurea",    url: "https://www.airbnb.co.uk/rooms/1282620047333334876" },
];

const RAW_DIR    = path.resolve(__dirname, "raw");
const PUBLIC_DIR = path.resolve(__dirname, "../public/villas");

const MIN_CURATED = 12;
const MAX_CURATED = 18;
const MIN_FILE_SIZE_KB = 80; // anything smaller is a thumbnail or broken image

// ─────────────────────────────────────────────
// CURATION PRIORITY
// Each slot has a category, a max count, and an
// SEO filename template (n = 1-based index within slot)
// ─────────────────────────────────────────────
const PRIORITY_SLOTS = [
  { category: "hero",     max: 1,  seo: ()  => "hero"       },
  { category: "exterior", max: 2,  seo: (n) => n === 1 ? "exterior" : `exterior${n}` },
  { category: "pool",     max: 2,  seo: (n) => n === 1 ? "pool"     : `pool${n}`     },
  { category: "living",   max: 2,  seo: (n) => n === 1 ? "living"   : `living${n}`   },
  { category: "bedroom",  max: 6,  seo: (n) => `bedroom${n}`                         },
  { category: "bathroom", max: 2,  seo: (n) => n === 1 ? "bathroom" : `bathroom${n}` },
  { category: "kitchen",  max: 1,  seo: ()  => "kitchen"    },
  { category: "garden",   max: 2,  seo: (n) => n === 1 ? "garden"   : `garden${n}`   },
  { category: "detail",   max: 2,  seo: (n) => n === 1 ? "detail"   : `detail${n}`   },
];

// ─────────────────────────────────────────────
// CLASSIFICATION KEYWORDS
// ─────────────────────────────────────────────
const CLASSIFIERS = [
  { category: "pool",     keywords: ["pool", "swim"] },
  { category: "living",   keywords: ["living", "lounge", "sofa", "sala", "sitting", "couch"] },
  { category: "bedroom",  keywords: ["bedroom", "bed", "sleep", "master"] },
  { category: "bathroom", keywords: ["bathroom", "bath", "shower", "toilet", "wc"] },
  { category: "kitchen",  keywords: ["kitchen", "dining", "cook"] },
  { category: "garden",   keywords: ["garden", "terrace", "balcony", "yard", "outdoor lounge"] },
  { category: "exterior", keywords: ["exterior", "outside", "facade", "entrance", "front", "aerial", "drone"] },
  { category: "detail",   keywords: ["detail", "decor", "art", "design"] },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function toHdUrl(raw) {
  try {
    const u = new URL(raw);
    u.searchParams.delete("aki_policy");
    u.pathname = u.pathname.replace(/\/aki_policy=[^/]+/, "");
    u.searchParams.set("im_w", "1440");
    return u.toString();
  } catch {
    return raw;
  }
}

function isAirbnbImage(url) {
  return typeof url === "string" && url.includes("a0.muscache.com");
}

function dedupeKey(url) {
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch {
    return url;
  }
}

function classifyUrl(url, alt = "") {
  const text = (url + " " + alt).toLowerCase();
  for (const { category, keywords } of CLASSIFIERS) {
    if (keywords.some((k) => text.includes(k))) return category;
  }
  return "detail"; // default bucket
}

async function downloadFile(fileUrl, destPath) {
  const res = await axios.get(fileUrl, {
    responseType: "stream",
    headers: { "User-Agent": "Mozilla/5.0" },
    maxRedirects: 5,
    timeout: 30000,
  });
  await fse.ensureDir(path.dirname(destPath));
  const writer = fs.createWriteStream(destPath);
  res.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

// ─────────────────────────────────────────────
// PHASE 1 — SCRAPE
// ─────────────────────────────────────────────

async function scrapeVilla(browser, villa) {
  console.log(`\n📍 Scraping: ${villa.name}`);
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  );
  await page.setViewport({ width: 1440, height: 900 });
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-GB,en;q=0.9" });

  const networkImages = new Set();
  page.on("response", (res) => {
    const url = res.url();
    if (isAirbnbImage(url)) networkImages.add(toHdUrl(url));
  });

  await page.goto(villa.url, { waitUntil: "load", timeout: 90000 });
  await sleep(2000);

  // Dismiss modals
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find(
      (b) => /close|dismiss|accept|ok|got it/i.test(b.textContent) && b.offsetParent
    );
    if (btn) btn.click();
  }).catch(() => {});
  await sleep(800);

  // Open full photo gallery
  try {
    await page.click('[data-testid="hero-view-photos-button"]');
    await sleep(3000);
    console.log("  ✓ Opened photo gallery");
  } catch {
    console.log("  Gallery button not found, continuing...");
  }

  // Scroll to trigger lazy loading
  await page.evaluate(() => new Promise((resolve) => {
    let total = 0;
    const timer = setInterval(() => {
      window.scrollBy(0, 400);
      total += 400;
      if (total >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }
    }, 200);
  }));
  await sleep(1500);

  const { title, description, amenities, domImgs } = await page.evaluate(() => {
    const titleEl = document.querySelector("h1") || document.querySelector('[data-testid="listing-title"]');
    const descEls = [...document.querySelectorAll('[data-testid="listing-description"] span, [data-section-id="DESCRIPTION_DEFAULT"] span')];
    const amenityEls = [...document.querySelectorAll('[data-testid="amenity-row"] span, [data-section-id="AMENITIES_DEFAULT"] li')];
    const imgs = [...document.querySelectorAll("img")].map((i) => ({ src: i.src || i.dataset.src || "", alt: i.alt || "" }));
    return {
      title: titleEl?.textContent.trim() ?? "",
      description: descEls.map((e) => e.textContent.trim()).filter((t) => t.length > 80).join(" ").slice(0, 2000),
      amenities: [...new Set(amenityEls.map((e) => e.textContent.trim()).filter((t) => t.length > 1 && t.length < 80))],
      domImgs: imgs,
    };
  });

  // Merge DOM + network images, dedupe by pathname
  const seen = new Set();
  const allImages = [];

  for (const { src, alt } of domImgs) {
    if (!isAirbnbImage(src)) continue;
    const hd = toHdUrl(src);
    const key = dedupeKey(hd);
    if (seen.has(key)) continue;
    seen.add(key);
    allImages.push({ url: hd, alt, category: classifyUrl(hd, alt) });
  }
  for (const url of networkImages) {
    const key = dedupeKey(url);
    if (seen.has(key)) continue;
    seen.add(key);
    allImages.push({ url, alt: "", category: classifyUrl(url) });
  }

  // First image in listing is always the hero
  if (allImages.length > 0) allImages[0].category = "hero";

  console.log(`  ✓ ${allImages.length} unique images — title: "${title}"`);
  await page.close();

  return { title, description, amenities, images: allImages };
}

// ─────────────────────────────────────────────
// PHASE 1b — DOWNLOAD ALL TO /raw
// ─────────────────────────────────────────────

async function downloadRaw(villaName, images) {
  const rawDir = path.join(RAW_DIR, villaName);
  fse.ensureDirSync(rawDir);

  const downloaded = [];
  console.log(`\n  📥 Downloading ${images.length} images to raw/${villaName}/`);

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const filename = `img_${String(i + 1).padStart(3, "0")}.jpg`;
    const destPath = path.join(rawDir, filename);

    // Skip if already downloaded from a previous run
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
      downloaded.push({ ...img, rawPath: destPath, filename, size: fs.statSync(destPath).size });
      process.stdout.write("·");
      continue;
    }

    try {
      await downloadFile(img.url, destPath);
      const size = fs.statSync(destPath).size;
      downloaded.push({ ...img, rawPath: destPath, filename, size });
      process.stdout.write("↓");
    } catch {
      process.stdout.write("✗");
    }
  }

  console.log(`\n  ✓ ${downloaded.length} raw images ready`);
  return downloaded;
}

// ─────────────────────────────────────────────
// PHASE 2 — CURATE
// ─────────────────────────────────────────────

function removeSimilar(images) {
  // Within a category group, images whose file sizes differ by <4% are
  // likely the same shot. Keep the larger one (= more detail/less compressed).
  const out = [];
  for (const img of images) {
    const isDupe = out.some(
      (kept) =>
        kept.category === img.category &&
        Math.abs(kept.size - img.size) / Math.max(kept.size, img.size) < 0.04
    );
    if (!isDupe) out.push(img);
  }
  return out;
}

async function curateAndCopy(villaName, rawImages) {
  const publicDir = path.join(PUBLIC_DIR, villaName);
  fse.ensureDirSync(publicDir);

  // Drop broken/thumbnail images below minimum size
  const valid = rawImages.filter((img) => img.size >= MIN_FILE_SIZE_KB * 1024);
  console.log(`  ↳ ${rawImages.length - valid.length} images removed (< ${MIN_FILE_SIZE_KB} KB)`);

  // Dedupe visually similar shots
  const deduped = removeSimilar(valid);

  // Group by category, sort each group by file size desc (larger = better quality)
  const byCategory = {};
  for (const img of deduped) {
    (byCategory[img.category] = byCategory[img.category] || []).push(img);
  }
  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort((a, b) => b.size - a.size);
  }

  // Apply priority slots
  const selected = [];
  for (const slot of PRIORITY_SLOTS) {
    const pool = byCategory[slot.category] || [];
    const take = Math.min(slot.max, pool.length);
    for (let n = 1; n <= take; n++) {
      const img = pool[n - 1];
      const seoName = slot.seo(n);
      selected.push({ img, seoName });
    }
    if (selected.length >= MAX_CURATED) break;
  }

  // If still under MIN, fill from detail bucket
  if (selected.length < MIN_CURATED) {
    const detailPool = (byCategory["detail"] || []).filter(
      (img) => !selected.some((s) => s.img.rawPath === img.rawPath)
    );
    let extra = 1;
    for (const img of detailPool) {
      if (selected.length >= MIN_CURATED) break;
      selected.push({ img, seoName: `detail${extra++}` });
    }
  }

  // Copy to public with SEO filenames
  console.log(`\n  🎨 Curating ${villaName}: ${selected.length} images selected`);
  const manifest = [];

  for (const { img, seoName } of selected) {
    const filename = `${seoName}.jpg`;
    const destPath = path.join(publicDir, filename);
    fse.copySync(img.rawPath, destPath, { overwrite: true });
    const relativePath = `/villas/${villaName}/${filename}`;
    manifest.push({
      label: seoName,
      path: relativePath,
      category: img.category,
      size: img.size,
    });
    console.log(`    ✓ ${filename}  (${Math.round(img.size / 1024)} KB)`);
  }

  return manifest;
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

async function main() {
  console.log("🌴 Bali Villas — Airbnb Scraper\n");
  fse.ensureDirSync(RAW_DIR);
  fse.ensureDirSync(PUBLIC_DIR);

  const LAUNCH_ARGS = {
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
  };

  const results = [];

  for (const villa of VILLAS) {
    const browser = await puppeteer.launch(LAUNCH_ARGS);
    try {
      // Phase 1 — scrape
      const scraped = await scrapeVilla(browser, villa);

      // Phase 1b — download all to raw/
      const rawImages = await downloadRaw(villa.name, scraped.images);

      // Phase 2 — curate into public/
      const manifest = await curateAndCopy(villa.name, rawImages);

      // Write data.json (curated images only)
      const output = {
        name: villa.name,
        url: villa.url,
        title: scraped.title,
        description: scraped.description,
        amenities: scraped.amenities,
        images: manifest,
      };
      const jsonPath = path.join(PUBLIC_DIR, villa.name, "data.json");
      fse.outputFileSync(jsonPath, JSON.stringify(output, null, 2));
      console.log(`  ✓ data.json saved`);

      results.push({ villa: villa.name, raw: rawImages.length, curated: manifest.length, ok: true });
    } catch (err) {
      console.error(`\n  ✗ Failed: ${villa.name} — ${err.message}`);
      results.push({ villa: villa.name, ok: false, error: err.message });
    } finally {
      await browser.close();
    }

    await sleep(3000);
  }

  console.log("\n─────────────────────────────────────");
  console.log("Summary");
  console.log("─────────────────────────────────────");
  for (const r of results) {
    if (r.ok) {
      console.log(`  ✓ ${r.villa}: ${r.raw} raw → ${r.curated} curated`);
    } else {
      console.log(`  ✗ ${r.villa}: ${r.error}`);
    }
  }
  console.log(`\nRaw:     ${RAW_DIR}`);
  console.log(`Public:  ${PUBLIC_DIR}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
