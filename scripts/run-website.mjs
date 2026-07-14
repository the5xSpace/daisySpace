import { spawn } from "node:child_process";
import { firstPositionalArg } from "./generate-api-docs.mjs";
import { refreshDocumentation } from "./refresh-docs.mjs";

const mode = process.argv[2];
const sdkPath = firstPositionalArg(process.argv.slice(3));

if (mode !== "dev" && mode !== "build") {
  console.error("Usage: node ./scripts/run-website.mjs <dev|build> <relative-sdk-path>");
  process.exit(1);
}

function runWebsite(command) {
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", ["--dir", "website", command], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`Website ${command} exited with signal ${signal}`));
      } else if (code !== 0) {
        reject(new Error(`Website ${command} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

try {
  await refreshDocumentation(sdkPath);
  await runWebsite(mode);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
