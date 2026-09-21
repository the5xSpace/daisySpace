import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { findAvailablePort, parsePreferredPort } from "./dev-ports.mjs";

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Resolve a spawn-safe pnpm binary (Windows: pnpm.cmd, not pnpm.ps1). */
export function resolvePnpmBin() {
  return process.platform === "win32" ? "pnpm.cmd" : "pnpm";
}

const targets = {
  website: {
    packageDir: "website",
    // Spawn the tool directly to avoid re-entering package.json "dev" (which points here).
    // CLI flags make the adaptive port authoritative even if env-based config is ignored.
    buildCommandArgs: (port) => [
      "--dir",
      "website",
      "exec",
      "vitepress",
      "dev",
      "docs",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    envPortKey: "DAISY_SITE_PORT",
    preferredPort: 5173,
    url: (port) => `http://127.0.0.1:${port}/`,
  },
  playground: {
    packageDir: "playground",
    buildCommandArgs: (port) => [
      "--dir",
      "playground",
      "exec",
      "vite",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    envPortKey: "DAISY_PLAYGROUND_PORT",
    preferredPort: 5174,
    url: (port) => `http://127.0.0.1:${port}/playground/`,
  },
};

export async function resolveAdaptivePort(targetName, env = process.env) {
  const target = targets[targetName];
  if (!target) throw new Error(`Unknown dev target: ${targetName}`);
  const preferred = parsePreferredPort(env[target.envPortKey], target.preferredPort);
  return findAvailablePort(preferred);
}

export function createDevEnv(targetName, port, baseEnv = process.env) {
  const target = targets[targetName];
  if (!target) throw new Error(`Unknown dev target: ${targetName}`);
  return {
    ...baseEnv,
    [target.envPortKey]: String(port),
  };
}

async function main() {
  const targetName = process.argv[2];
  const target = targets[targetName];
  if (!target) {
    console.error("Usage: node ./scripts/dev-adaptive.mjs <website|playground>");
    process.exit(1);
  }

  const port = await resolveAdaptivePort(targetName);
  const env = createDevEnv(targetName, port);
  const url = target.url(port);
  const pnpmBin = resolvePnpmBin();

  console.log(`[dev:${targetName}] adaptive port: ${port}`);
  console.log(`[dev:${targetName}] open this URL: ${url}`);
  console.log(`[dev:${targetName}] if the browser shows another project, use the URL above.`);

  const child = spawn(pnpmBin, target.buildCommandArgs(port), {
    cwd: workspaceRoot,
    stdio: "inherit",
    env,
    // Windows: Node throws EINVAL when spawning .cmd without a shell.
    shell: process.platform === "win32",
  });

  child.on("error", (error) => {
    console.error(`[dev:${targetName}] failed to start ${pnpmBin}:`, error.message);
    process.exit(1);
  });

  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    else process.exit(code ?? 0);
  });
}

const isDirectRun = Boolean(process.argv[1])
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
