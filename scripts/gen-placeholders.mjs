// Generates solid-color JPEG placeholder images so the layout is correct and
// every <Image> has a real, valid src. Real photos drop in by overwriting these
// files at the same paths (see public/images/README.md for dimensions).
//
// Uses jpeg-js (pure JS, no native deps) to emit valid baseline JPEGs.
import jpeg from "jpeg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ROOT = resolve(process.cwd(), "public/images");
const INK = [10, 27, 51]; // #0A1B33
const INK2 = [15, 39, 71]; // #0F2747
const BRAND = [30, 107, 224]; // #1E6BE0
const BRAND_DARK = [14, 52, 110];

/** Solid color with a faint diagonal sheen so before/after wipes are visible. */
function solidJpeg(width, height, [r, g, b]) {
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const t = (x / width + y / height) / 2;
      const lift = Math.round(18 * t);
      const o = (y * width + x) * 4;
      data[o] = Math.min(255, r + lift);
      data[o + 1] = Math.min(255, g + lift);
      data[o + 2] = Math.min(255, b + lift);
      data[o + 3] = 255;
    }
  }
  return jpeg.encode({ data, width, height }, 82).data;
}

function write(rel, w, h, color) {
  const out = resolve(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, solidJpeg(w, h, color));
  console.log("wrote", rel);
}

// Hero + section imagery
write("hero.jpg", 1920, 1080, INK);
write("skyline.jpg", 1200, 900, INK2);
write("og.jpg", 1200, 630, INK);

// Service cards (drone-led + ground-supported)
for (const slug of [
  "commercial-building-wash",
  "drone-roof-cleaning",
  "high-rise-window-cleaning",
  "solar-panel-cleaning",
  "pressure-washing",
  "soft-washing",
  "window-cleaning",
  "gutter-cleaning",
]) {
  write(`services/${slug}.jpg`, 800, 600, INK2);
}

// Before/After pairs — before darker, after brand-bright so the wipe is obvious
for (const label of ["house", "driveway", "roof", "commercial"]) {
  write(`ba/${label}-before.jpg`, 1200, 900, BRAND_DARK);
  write(`ba/${label}-after.jpg`, 1200, 900, BRAND);
}
