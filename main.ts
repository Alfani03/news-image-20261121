// News image entry for make.fun: "Sum up 21 November's world news in one image".
// The picture itself is entry.png next to this file; it was drawn for this
// bounty and sums up Saturday 21 November 2026 in six stories.
// This program only places that picture where the grader expects it:
// /output/entry.png, or MAKEFUN_OUTPUT_DIR/entry.png when that is set.
// Node 22, standard library only, no network, deterministic output.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), join(outDir, "entry.png"));
