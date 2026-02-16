import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

const seedFile = process.env.SEED_FILE || "import/menu.ndjson";
const replaceFlag = process.env.SEED_REPLACE === "false" ? false : true;

const sanityBin = path.join(
  cwd,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "sanity.cmd" : "sanity"
);

if (!fs.existsSync(sanityBin)) {
  throw new Error(
    "Sanity CLI not found. Run npm install in /cms before seeding."
  );
}

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with ${result.status}`);
  }
};

run("node", ["import/generate-ndjson.mjs"]);

const importArgs = ["dataset", "import", seedFile, dataset];
if (replaceFlag) importArgs.push("--replace");

run(sanityBin, importArgs);
