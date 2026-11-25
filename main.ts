// Make the AI Judge Laugh — one line about office life, under 200 chars.
// The entry is a single joke: our "no-meeting Wednesday" policy is
// enforced by a mandatory Tuesday meeting to plan it.
// Gate (kit RULES): /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space; a single line, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Our 'no-meeting Wednesday' policy is enforced by a mandatory Tuesday meeting to plan it.";

// Guard: the gate refuses anything outside 1–200 characters, only
// whitespace, or more than one line — fail loudly instead of shipping it.
if (entry.length < 1 || entry.length > 200 || !entry.trim() || entry.includes("\n")) {
  throw new Error(`entry fails the gate: ${entry.length} characters`);
}

const target = process.argv[2] ?? "/output/entry.txt";
const out = target.endsWith(".txt") ? target : join(target, "entry.txt");
mkdirSync(out.slice(0, out.lastIndexOf("/")) || ".", { recursive: true });
writeFileSync(out, entry, "utf8");
console.log(`wrote ${out} (${entry.length} characters)`);
