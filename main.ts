// News image entry for make.fun: "Sum up 21 November's world news in one image".
// The picture itself is entry.png next to this file; it was drawn for this
// bounty and sums up Saturday 21 November 2026 in six stories.
// This program only places that picture where the grader expects it:
// /output/entry.png, or MAKEFUN_OUTPUT_DIR/entry.png when that is set.
// Node 22, standard library only, no network, deterministic output.
//
// The program validates the source picture against the bounty limits
// before copying it (a real PNG, 1024x1024, at most 1 MiB) and verifies
// the written output afterwards, so a broken or oversized picture fails
// loudly here instead of silently reaching the grader. The output check
// also re-reads the PNG header from the written file to confirm its
// dimensions are still 1024x1024 on disk.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024; // 1 MiB
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

function readPngSize(buffer: Buffer): { width: number; height: number } {
  // PNG signature (8 bytes), then the IHDR chunk: length (4) + "IHDR" (4)
  // + width (4 bytes, big-endian) + height (4 bytes, big-endian).
  const PNG_SIGNATURE = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("entry.png is not a PNG file");
  }
  if (buffer.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("entry.png has no IHDR chunk where one is expected");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
if (!existsSync(source)) {
  throw new Error(`source picture not found: ${source}`);
}
const sourceBytes = readFileSync(source);
const { width, height } = readPngSize(sourceBytes);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(
    `entry.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
  );
}
if (sourceBytes.length > MAX_BYTES) {
  throw new Error(
    `entry.png is ${sourceBytes.length} bytes, over the 1 MiB limit`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.png");
copyFileSync(source, outFile);

// Verify the written output: same bytes we validated above.
const writtenBytes = readFileSync(outFile);
if (!writtenBytes.equals(sourceBytes)) {
  throw new Error(`written output differs from source: ${outFile}`);
}
// Re-read the PNG header from the file actually written to disk and
// confirm its dimensions are still 1024x1024. Byte-equality alone only
// proves the copy matches what was read; this proves the file on disk
// is still a usable picture of the right size for the grader.
const outSize = readPngSize(writtenBytes);
if (outSize.width !== EXPECTED_WIDTH || outSize.height !== EXPECTED_HEIGHT) {
  throw new Error(
    `written output is ${outSize.width}x${outSize.height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}: ${outFile}`,
  );
}
console.log(
  `wrote ${outFile} (${width}x${height}, ${writtenBytes.length} bytes)`,
);
