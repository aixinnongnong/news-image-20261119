// News-image entry: a single image summing up the world's news of Thursday
// 19 November 2026. The image is drawn in this repository as entry.png, and
// this program (Node 22, standard library only) copies it to the output
// directory the grader gives it, so the run is deterministic: the same bytes
// in, the same bytes out, every time.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// The image itself is a fixed 1024x1024 PNG of 151,893 bytes (within the
// competition's 1 MiB and 1024x1024 caps). Nothing is drawn or fetched at
// run time, so the program needs no network and always finishes in well
// under the 60-second limit.
//
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
