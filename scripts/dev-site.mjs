import { spawn, spawnSync } from "node:child_process";
import { findAvailablePort, parsePreferredPort } from "./dev-ports.mjs";
import { resolvePnpmBin } from "./dev-adaptive.mjs";
import { firstPositionalArg } from "./generate-api-docs.mjs";
import { refreshDocumentation } from "./refresh-docs.mjs";

const sdkPath = firstPositionalArg(process.argv.slice(2));
const children = [];
let stopping = false;

function start(label, args, extraEnv = {}) {
  const child = spawn(resolvePnpmBin(), args, {
    stdio: "inherit",
    env: {...process.env, ...extraEnv},
    shell: process.platform === "win32",
  });
  children.push(child);

  const done = new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code, signal) => resolve({label, code, signal}));
  });
  return done;
}

function stopChildren(signal = "SIGTERM") {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) {
      if (process.platform === "win32" && child.pid) {
        spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
          stdio: "ignore",
          shell: false,
        });
      } else {
        child.kill(signal);
      }
    }
  }
}

process.on("SIGINT", () => stopChildren("SIGINT"));
process.on("SIGTERM", () => stopChildren("SIGTERM"));

try {
  await refreshDocumentation(sdkPath);
  const preferredWebsitePort = parsePreferredPort(process.env.DAISY_SITE_PORT, 5173);
  const websitePort = await findAvailablePort(preferredWebsitePort);
  const preferredPlaygroundPort = parsePreferredPort(
    process.env.DAISY_PLAYGROUND_PORT,
    websitePort + 1,
  );
  const playgroundPort = await findAvailablePort(preferredPlaygroundPort, {
    excluded: new Set([websitePort]),
  });
  const siteEnvironment = {
    DAISY_SITE_PORT: String(websitePort),
    DAISY_PLAYGROUND_PORT: String(playgroundPort),
  };

  console.log(`[dev:site] website: http://127.0.0.1:${websitePort}/`);
  console.log(`[dev:site] playground: http://127.0.0.1:${websitePort}/playground/`);
  console.log(`[dev:site] internal playground port: ${playgroundPort}`);
  console.log(`[dev:site] if the browser shows another project, use the website URL above.`);

  const firstExit = await Promise.race([
    start("playground", [
      "--dir",
      "playground",
      "exec",
      "vite",
      "--host",
      "127.0.0.1",
      "--port",
      String(playgroundPort),
    ], siteEnvironment),
    start("website", [
      "--dir",
      "website",
      "exec",
      "vitepress",
      "dev",
      "docs",
      "--host",
      "127.0.0.1",
      "--port",
      String(websitePort),
    ], {
      ...siteEnvironment,
      DAISY_PLAYGROUND_PROXY: "true",
    }),
  ]);

  if (!stopping) {
    const reason = firstExit.signal ? `signal ${firstExit.signal}` : `code ${firstExit.code}`;
    throw new Error(`${firstExit.label} dev server exited unexpectedly with ${reason}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  stopChildren();
}
