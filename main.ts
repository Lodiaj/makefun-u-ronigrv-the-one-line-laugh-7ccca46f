// One-line laugh for make.fun (Node 22, standard library only).
// The joke lives in LINE below: a single sentence, at most 200 characters.
// Before handing it to the judge, this program proves the line obeys the
// bouty's own gate — one line, 1 to 200 characters, not only whitespace —
// and then writes it byte for byte to /output/entry.txt.
//
// To try it outside the grader, point MAKEFUN_OUTPUT_DIR at a folder
// of your own, for example:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one funny line, single sentence, twist at the end.
const LINE =
  "My smartwatch congratulated me on 10,000 steps today, so I thanked the dog, who actually walked them all.";

function fail(message: string): never {
  throw new Error(`line rejected: ${message}`);
}

// The gate's limits for this bounty: 1 to 200 characters, not blank.
const MAX_CHARS = 200;

const chars = [...LINE];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  fail(`it is ${chars.length} characters, outside the 1 to ${MAX_CHARS} range`);
}
if (LINE.trim().length === 0) {
  fail("it is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("it is more than one line");
}
for (const ch of LINE) {
  const code = ch.charCodeAt(0);
  if (code < 32 || code > 126) {
    fail(`it holds a non-printable character (code ${code})`);
  }
}

const words = LINE.trim().split(/\s+/);
if (words.length < 3) {
  fail(`it has only ${words.length} words`);
}

// One sentence: exactly one sentence-ending mark, and it closes the line.
const terminators = (LINE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !LINE.endsWith(".")) {
  fail("it is not a single sentence ending in a full stop");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE);
console.log(
  `entry.txt OK: ${chars.length} characters, ${words.length} words, written to ${outDir}/entry.txt`,
);
