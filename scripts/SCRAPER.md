# Airbnb Villa Scraper

Extracts images, title, description, and amenities from Airbnb listings.
Downloads full-quality images and organises them into folders ready for the website.

---

## Requirements

- Node.js 18+
- A working internet connection
- ~500 MB free disk space (images)

---

## Setup & Run

```bash
cd scripts
npm install        # installs puppeteer (~300 MB, includes Chromium)
node scraper.js
```

---

## Output

Images and data land in `public/villas/` (served directly by Next.js):

```
public/villas/
  villa-vittoria/
    hero.jpg
    pool.jpg
    living.jpg
    bedroom1.jpg
    bedroom2.jpg
    bathroom.jpg
    data.json
  villa-lumira/
    …
```

Each `data.json` contains:

```json
{
  "name": "villa-vittoria",
  "title": "Airbnb listing title",
  "description": "Full description text",
  "amenities": ["Pool", "WiFi", "Kitchen", "…"],
  "images": [
    { "label": "hero",     "path": "/villas/villa-vittoria/hero.jpg" },
    { "label": "pool",     "path": "/villas/villa-vittoria/pool.jpg" },
    { "label": "bedroom1", "path": "/villas/villa-vittoria/bedroom1.jpg" }
  ]
}
```

---

## How images are classified

| Filename     | Detected by keywords in URL / alt text             |
|--------------|----------------------------------------------------|
| `hero.jpg`   | Always the first image in the listing              |
| `pool.jpg`   | pool, swim, water                                  |
| `living.jpg` | living, lounge, sofa, sala, sitting                |
| `bedroom1/2` | bedroom, bed, sleep, master (numbered if repeated) |
| `bathroom`   | bathroom, bath, shower                             |
| `kitchen`    | kitchen, dining, cook                              |
| `garden`     | garden, terrace, balcony, outdoor                  |
| `exterior`   | exterior, facade, entrance, front                  |

Images that don't match any keyword are skipped after the hero.
You can manually rename files after running if a match is wrong.

---

## Troubleshooting

**Images not downloading / 0 images found**
Airbnb may be rate-limiting or showing a CAPTCHA. Try:
- Running with `headless: false` in `scraper.js` to watch the browser
- Adding a longer `sleep` delay between villas (change `3000` to `8000`)
- Running one villa at a time (comment out others in the `VILLAS` array)

**`headless: false` mode (debug)**
In `scraper.js`, find the `puppeteer.launch` call and change:
```js
headless: "new"  →  headless: false
```
This opens a visible browser window so you can see exactly what's happening.

**Chromium won't launch on macOS**
```bash
# Allow the Chromium binary downloaded by puppeteer
xattr -cr ./node_modules/puppeteer/.local-chromium
```

**Running only one villa**
Comment out the others in the `VILLAS` array at the top of `scraper.js`.
