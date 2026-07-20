// Reusable translation applier for daisySpace docs/en.
// Reads Chinese from website/docs/en, applies [chineseKey, englishValue]
// pairs, and writes the result back to website/docs/en.
// IMPORTANT: reads EN file (not _source) to preserve localized links (/en/api/).
//
// Usage: node scripts/translate_apply.mjs <batchfile.json>
// batchfile.json shape:
//   { "api/classes/X.md": [ ["chinese key", "english value"], ... ], ... }

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "website", "docs");
const batchFile = process.argv[2];
if (!batchFile) {
  console.error("Usage: node scripts/translate_apply.mjs <batchfile.json>");
  process.exit(1);
}

const batch = JSON.parse(fs.readFileSync(batchFile, "utf8"));
let totalOk = 0;
let totalWarn = 0;
let totalErr = 0;

for (const rel of Object.keys(batch)) {
  const srcPath = path.join(docsDir, "en", rel);  // Read from en (preserves localized links)
  if (!fs.existsSync(srcPath)) {
    console.error(`MISSING EN FILE: ${rel}`);
    totalErr++;
    continue;
  }
  let raw = fs.readFileSync(srcPath, "utf8");
  const normal = raw.replace(/\r\n/g, '\n');
  const pairs = batch[rel];
  let fileOk = 0;
  let fileWarn = 0;
  for (const [zh, en] of pairs) {
    const zhNorm = zh.replace(/\r\n/g, '\n');
    const count = normal.split(zhNorm).length - 1;
    if (count === 0) {
      console.error(`NOT FOUND [${rel}]: ${zhNorm.slice(0, 80)}`);
      totalErr++;
      continue;
    }
    if (count > 1) {
      console.warn(`AMBIGUOUS x${count} [${rel}]: ${zhNorm.slice(0, 80)}`);
      fileWarn++;
      totalWarn++;
    }
    const escaped = zhNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = escaped.replace(/\n/g, '\r?\n');
    raw = raw.replace(new RegExp(pattern, 'g'), (match) => {
      const hasCR = /\r/.test(match);
      return hasCR ? en.replace(/\n/g, '\r\n') : en;
    });
    fileOk++;
    totalOk++;
  }
  raw = raw.replace(/\r\n/g, '\n'); // Normalize to LF to match _source line endings
  fs.writeFileSync(srcPath, raw);
  console.log(`WROTE ${rel}: ok=${fileOk} warn=${fileWarn}`);
}

console.log(`\nSUMMARY: ok=${totalOk} warn=${totalWarn} err=${totalErr}`);
if (totalErr > 0) process.exit(2);
