// News-image entry: a single image summing up the world's news of Thursday
// 19 November 2026. The image is drawn in this repository as entry.png, and
// this program (Node 22, standard library only) copies it to the output
// directory the grader gives it, so the run is deterministic: the same bytes
// in, the same bytes out, every time.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { closeSync, copyFileSync, mkdirSync, openSync, readSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The image itself is a fixed 1024x1024 PNG of 151,893 bytes (within the
// competition's 1 MiB and 1024x1024 caps). Nothing is drawn or fetched at
// run time, so the program needs no network and always finishes in well
// under the 60-second limit.
//
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);

// Fail loudly instead of handing the grader a bad file: entry.png must
// start with the PNG signature, otherwise something in the repository is
// wrong and the copy would be silently wrong too.
const fd = openSync(src, 'r');
const head = Buffer.alloc(8);
readSync(fd, head, 0, 8, 0);
closeSync(fd);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(pngSignature)) {
  throw new Error('entry.png is not a PNG file');
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(src, outPath);
const bytes = statSync(outPath).size;
console.log(`Wrote ${outPath} (${bytes} bytes)`);
