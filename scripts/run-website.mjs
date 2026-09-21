import { spawn } from "node:child_process";
import { findAvailablePort, parsePreferredPort } from "./dev-ports.mjs";
import { resolvePnpmBin } from "./dev-adaptive.mjs";
import { firstPositionalArg } from "./generate-api-docs.mjs";
import { refreshDocumentation } from "./refresh-docs.mjs";

const mode = process.argv[2];
const sdkPath = firstPositionalArg(process.argv.slice(3));

if (mode !== "dev" && mode !== "build") {
  console.error("Usage: node ./scripts/run-website.mjs <dev|build> <relative-sdk-path>");
  process.exit(1);
}

function runWebsite(command, env = process.env) {
  return new Promise((resolve, reject) => {
    // dev mode: spawn vitepress directly after adaptive port resolution.
    // Calling package.json "dev" would re-enter the adaptive wrapper.
    const args = command === "dev"
      ? [
        "--dir",
        "website",
        "exec",
        "vitepress",
        "dev",
        "docs",
        "--host",
        "127.0.0.1",
        "--port",
        String(env.DAISY_SITE_PORT),
      ]
      : ["--dir", "website", command];
    const child = spawn(resolvePnpmBin(), args, {
      stdio: "inherit",
      env,
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
  if (mode === "dev") {
    const preferredPort = parsePreferredPort(process.env.DAISY_SITE_PORT, 5173);
    const port = await findAvailablePort(preferredPort);
    const env = {
      ...process.env,
      DAISY_SITE_PORT: String(port),
    };
    console.log(`[dev:website] adaptive port: ${port}`);
    console.log(`[dev:website] open this URL: http://127.0.0.1:${port}/`);
    await runWebsite(mode, env);
  } else {
    await runWebsite(mode);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
