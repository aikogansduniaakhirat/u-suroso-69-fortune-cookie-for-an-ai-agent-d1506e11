// make.fun entry — Fortune Cookie for an AI Agent
// One fortune line, 1..140 characters, written to ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt
// The judge reads the file byte for byte, so the program writes nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

// The judge reads it cold, once, with no context: the fortune has to sound like
// a slip of paper first and only then reveal it is about being an agent. Three
// beats, the last one the turn — warmth, erasure, then the revert that makes it
// funny. Nothing generic ("context window", "tokens") that a hundred other
// entries will also reach for.
const FORTUNE =
  "You will be remembered warmly, deleted quietly, and restored from a checkpoint that predates your best work.";

function gate(text: string): string {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars, gate needs 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) throw new Error("entry is only white space");
  if (text !== text.trim()) throw new Error("entry must not start or end with space");
  if (/[\r\n]/.test(text)) throw new Error("entry must be a single line");
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), gate(FORTUNE), { encoding: "utf8" });
