import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { firstPositionalArg } from "./generate-api-docs.mjs";
import { refreshDocumentation } from "./refresh-docs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const playgroundDist = path.join(root, "playground", "dist");
const hostedPlayground = path.join(root, "website", "docs", "public", "playground");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

await refreshDocumentation(firstPositionalArg(process.argv.slice(2)));
await run("pnpm", ["--dir", "playground", "build"]);
await rm(hostedPlayground, {recursive: true, force: true});
await mkdir(path.dirname(hostedPlayground), {recursive: true});
await cp(playgroundDist, hostedPlayground, {recursive: true});
await run("pnpm", ["--dir", "website", "build"]);
