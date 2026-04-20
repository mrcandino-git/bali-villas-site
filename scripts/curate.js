/**
 * curate.js — visual-heuristic curation from raw/ images
 * --------------------------------------------------------
 * No re-download. Reads existing raw/<villa>/img_*.jpg files.
 * Writes curated set to public/villas/<villa>/
 *
 * Classification strategy (no ML):
 *   1. Airbnb gallery order  — host-curated sequence
 *   2. File size percentiles — luxury interiors compress large;
 *                              outdoor/pool shots compress small
 *   3. Position zones        — early = outdoor, mid = living/beds, late = bath/detail
 *
 * Usage: node curate.js
 */

const fse  = require("fs-extra");
const fs   = require("fs");
const path = require("path");

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const VILLAS = [
  "villa-vittoria",
  "villa-lumira",
  "villa-salty",
  "villa-lux",
  "villa-aurea",
];

const RAW_DIR    = path.resolve(__dirname, "raw");
const PUBLIC_DIR = path.resolve(__dirname, "../public/villas");

const MIN_SIZE_KB  = 80;          // strip broken / thumbnail images
const MAX_CURATED  = 15;          // hard cap per villa
const DUPE_THRESH  = 0.04;        // within 4% file size = same shot
const BLACKLIST_IN = VILLAS.length; // only blacklist sizes present in ALL villas

// Category caps — controls how many of each type appear in the final set
const CAPS = {
  hero:     1,
  pool:     1,
  exterior: 2,
  living:   2,
  bedroom:  5,
  bathroom: 2,
  detail:   3,
};

// SEO filename generator per category
const SEO = {
  hero:     ()  => "hero",
  pool:     ()  => "pool",
  exterior: (n) => n === 1 ? "exterior"   : `exterior-${n}`,
  living:   (n) => n === 1 ? "living"     : `living-${n}`,
  bedroom:  (n) => `bedroom-${n}`,
  bathroom: (n) => n === 1 ? "bathroom"   : `bathroom-${n}`,
  detail:   (n) => `detail-${n}`,
};

// Priority order for final selection (fills slots in this order)
const PRIORITY = ["hero", "pool", "exterior", "living", "bedroom", "bathroom", "detail"];

// ─────────────────────────────────────────────
// STEP 1 — build cross-villa blacklist
// Only blacklist exact file sizes present in ALL villas → guaranteed Airbnb UI assets
// ─────────────────────────────────────────────
function buildBlacklist() {
  const sizeCount = new Map();

  for (const villa of VILLAS) {
    const dir = path.join(RAW_DIR, villa);
    if (!fs.existsSync(dir)) continue;
    const seen = new Set();
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".jpg"))) {
      const size = fs.statSync(path.join(dir, f)).size;
      if (!seen.has(size)) { seen.add(size); sizeCount.set(size, (sizeCount.get(size) || 0) + 1); }
    }
  }

  const bl = new Set([...sizeCount.entries()].filter(([, c]) => c >= BLACKLIST_IN).map(([s]) => s));
  console.log(`  🚫 Blacklisted ${bl.size} shared Airbnb asset sizes (present in all ${VILLAS.length} villas)\n`);
  return bl;
}

// ─────────────────────────────────────────────
// STEP 2 — load valid raw images, in Airbnb's original order
// ─────────────────────────────────────────────
function loadValid(villa, blacklist) {
  const dir = path.join(RAW_DIR, villa);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => /^img_\d+\.jpg$/.test(f))
    .sort()
    .map(f => {
      const fullPath = path.join(dir, f);
      const size     = fs.statSync(fullPath).size;
      const index    = parseInt(f.replace("img_", "").replace(".jpg", ""), 10);
      return { file: f, fullPath, size, index };
    })
    .filter(img => img.size >= MIN_SIZE_KB * 1024 && !blacklist.has(img.size));
}

// ─────────────────────────────────────────────
// STEP 3 — remove near-duplicate shots in sequence order
// ─────────────────────────────────────────────
function removeDupes(images) {
  const kept = [];
  for (const img of images) {
    const isDupe = kept.some(
      k => Math.abs(k.size - img.size) / Math.max(k.size, img.size) < DUPE_THRESH
    );
    if (!isDupe) kept.push(img);
  }
  return kept;
}

// ─────────────────────────────────────────────
// STEP 4 — classify using size percentiles + position zones
//
// For luxury villas on Airbnb:
//   • Outdoor shots (pool, exterior, garden) → small/medium files
//     Sky, water, plants → lower entropy → tighter compression
//   • Indoor shots (living, bedroom, bathroom) → large files
//     Fabrics, art, furniture → high entropy → looser compression
//   • Gallery order: hero → outdoor → living → bedroom → bathroom → details
// ─────────────────────────────────────────────
function classify(images) {
  const n = images.length;
  if (n === 0) return [];

  // Compute size percentiles
  const sortedSizes = [...images].sort((a, b) => a.size - b.size).map(i => i.size);
  const pct = (p) => sortedSizes[Math.min(Math.floor(n * p), n - 1)];
  const p25  = pct(0.25);
  const p50  = pct(0.50); // median
  const p75  = pct(0.75);

  // Find the largest file in positions 2-5 → that's the pool shot (best outdoor)
  const outdoorZone  = images.slice(1, Math.min(6, n));
  const poolCandidate = outdoorZone.length
    ? outdoorZone.reduce((best, img) => (img.size > best.size ? img : best), outdoorZone[0])
    : null;

  const counters = {};
  const getCount = (cat) => counters[cat] || 0;
  const bump = (cat) => { counters[cat] = getCount(cat) + 1; return getCount(cat); };

  return images.map((img, i) => {
    const pos  = i + 1;  // 1-based position in valid filtered sequence
    const cat  = resolve(img, pos, n, p25, p50, p75, poolCandidate);

    // Enforce caps — overflow goes to detail
    if (cat !== "detail" && getCount(cat) >= (CAPS[cat] ?? 99)) {
      const detailN = bump("detail");
      return { ...img, category: "detail", n: detailN };
    }

    const n_ = bump(cat);
    return { ...img, category: cat, n: n_ };
  });
}

function resolve(img, pos, total, p25, p50, p75, poolCandidate) {
  // Position 1 is always the hero (Airbnb hero photo)
  if (pos === 1) return "hero";

  // Positions 2-6 = outdoor zone (pool, exterior, garden)
  if (pos <= 6) {
    if (poolCandidate && img.file === poolCandidate.file) return "pool";
    return "exterior";
  }

  // From position 7 onward, use file size to distinguish indoor space types
  // ─── Large files (≥ p75): living room / master bedroom with heavy furnishing
  if (img.size >= p75) {
    // First 2 large images in this zone → living room (open plan, high detail)
    // Subsequent → bedroom
    return "living"; // will be capped to CAPS.living; excess → bedroom via overflow
  }

  // ─── Medium files (p25..p75): standard bedrooms
  if (img.size >= p25) {
    return "bedroom";
  }

  // ─── Small files (< p25): bathrooms (tight space, lower entropy) or details
  // Later positions (past 60% of gallery) → bathroom; earlier → detail
  if (pos > Math.ceil(total * 0.60)) {
    return "bathroom";
  }

  return "detail";
}

// ─────────────────────────────────────────────
// STEP 5 — select final curated set and assign SEO filenames
// ─────────────────────────────────────────────
function select(classified) {
  const byCategory = {};
  for (const img of classified) {
    (byCategory[img.category] = byCategory[img.category] || []).push(img);
  }

  const selected = [];
  for (const cat of PRIORITY) {
    const pool = byCategory[cat] || [];
    for (let i = 0; i < Math.min(pool.length, CAPS[cat] ?? 99); i++) {
      if (selected.length >= MAX_CURATED) break;
      selected.push({ ...pool[i], seoName: SEO[cat](i + 1) });
    }
    if (selected.length >= MAX_CURATED) break;
  }

  return selected;
}

// ─────────────────────────────────────────────
// STEP 6 — copy to public/ and update data.json
// ─────────────────────────────────────────────
function publish(villa, selected) {
  const dest    = path.join(PUBLIC_DIR, villa);
  const jsonPath = path.join(dest, "data.json");

  fse.ensureDirSync(dest);

  // Remove previous curated images, keep data.json
  for (const f of fs.readdirSync(dest)) {
    if (f !== "data.json") fs.unlinkSync(path.join(dest, f));
  }

  const manifest = [];
  for (const img of selected) {
    const filename = `${img.seoName}.jpg`;
    fse.copySync(img.fullPath, path.join(dest, filename), { overwrite: true });
    manifest.push({
      label:    img.seoName,
      category: img.category,
      path:     `/villas/${villa}/${filename}`,
      size_kb:  Math.round(img.size / 1024),
    });
  }

  // Preserve existing meta (title, description, amenities)
  let existing = {};
  if (fs.existsSync(jsonPath)) {
    try { existing = JSON.parse(fs.readFileSync(jsonPath, "utf8")); } catch {}
  }
  fse.outputFileSync(jsonPath, JSON.stringify({ ...existing, images: manifest }, null, 2));

  return manifest;
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
function main() {
  console.log("🎨 Bali Villas — Visual Heuristic Curation\n");
  fse.ensureDirSync(PUBLIC_DIR);

  const blacklist = buildBlacklist();
  const recap = [];

  for (const villa of VILLAS) {
    const raw        = loadValid(villa, blacklist);
    const deduped    = removeDupes(raw);
    const classified = classify(deduped);
    const selected   = select(classified);
    const manifest   = publish(villa, selected);

    recap.push({ villa, raw: raw.length, deduped: deduped.length, manifest });

    console.log(`📂 ${villa}`);
    console.log(`   ${raw.length} valid  →  ${deduped.length} deduped  →  ${manifest.length} curated`);
    for (const img of manifest) {
      const bar = "█".repeat(Math.round(img.size_kb / 100)).padEnd(20);
      console.log(`   ${img.label.padEnd(14)} ${bar} ${img.size_kb} KB`);
    }
    console.log();
  }

  // ── Recap table ──────────────────────────────
  console.log("─────────────────────────────────────────────────");
  console.log("Recap");
  console.log("─────────────────────────────────────────────────");
  for (const { villa, manifest } of recap) {
    const counts = {};
    for (const m of manifest) counts[m.category] = (counts[m.category] || 0) + 1;
    const summary = PRIORITY
      .filter(c => counts[c])
      .map(c => `${counts[c]}× ${c}`)
      .join("  ");
    console.log(`  ${villa.padEnd(22)}  ${String(manifest.length).padStart(2)} images   ${summary}`);
  }
  console.log(`\nPublic: ${PUBLIC_DIR}`);
}

main();
