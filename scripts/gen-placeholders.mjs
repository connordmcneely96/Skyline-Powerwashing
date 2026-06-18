// Generates solid-color PNG placeholder images so layout is correct and every
// <Image> has a real, valid src. Real photos drop in by overwriting these files
// at the same paths (see public/images/README.md for dimensions).
//
// Pure Node: builds minimal valid PNGs with zlib. No external dependencies.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// Solid-color PNG with a faint diagonal so before/after wipes are visible.
function solidPng(width, height, [r, g, b]) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor
  // 10,11,12 = compression, filter, interlace = 0

  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type: none
    for (let x = 0; x < width; x++) {
      // subtle vignette/diagonal sheen for depth
      const t = (x / width + y / height) / 2;
      const lift = Math.round(18 * t);
      const o = rowStart + 1 + x * 3;
      raw[o] = Math.min(255, r + lift);
      raw[o + 1] = Math.min(255, g + lift);
      raw[o + 2] = Math.min(255, b + lift);
    }
  }

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const ROOT = resolve(process.cwd(), "public/images");
const INK = [10, 27, 51]; // #0A1B33
const INK2 = [15, 39, 71]; // #0F2747
const BRAND = [30, 107, 224]; // #1E6BE0
const BRAND_DARK = [14, 52, 110];

function write(rel, w, h, color) {
  const out = resolve(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, solidPng(w, h, color));
  console.log("wrote", rel);
}

// Hero + section imagery
write("hero.png", 1920, 1080, INK);
write("skyline.png", 1200, 900, INK2);
write("og.png", 1200, 630, INK);

// Service cards
for (const slug of [
  "pressure-washing",
  "soft-washing",
  "roof-cleaning",
  "window-cleaning",
  "gutter-cleaning",
]) {
  write(`services/${slug}.png`, 800, 600, INK2);
}

// Before/After pairs — before darker, after brand-bright so the wipe is obvious
for (const label of ["house", "driveway", "roof", "commercial"]) {
  write(`ba/${label}-before.png`, 1200, 900, BRAND_DARK);
  write(`ba/${label}-after.png`, 1200, 900, BRAND);
}
