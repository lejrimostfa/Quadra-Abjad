// Lance tous les fichiers *.test.mjs du dossier, un processus chacun.
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith(".test.mjs")).sort();
let failed = 0;
for (const f of files) {
  const r = spawnSync(process.execPath, [join(dir, f)], { encoding: "utf8" });
  const ok = r.status === 0;
  if (!ok) failed += 1;
  console.log(`${ok ? "OK  " : "FAIL"} ${f}`);
  if (!ok) console.log(r.stdout + r.stderr);
}
console.log(`${files.length - failed}/${files.length} fichiers passent`);
process.exit(failed ? 1 : 0);
