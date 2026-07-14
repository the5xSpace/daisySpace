import { spawn } from "node:child_process";
import { firstPositionalArg, generateApiDocs } from "./generate-api-docs.mjs";

const sdkPath = firstPositionalArg(process.argv.slice(2));
const children = [];
let stopping = false;

function start(label, args, extraEnv = {}) {
  const child = spawn("pnpm", args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {...process.env, ...extraEnv},
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
      child.kill(signal);
    }
  }
}

process.on("SIGINT", () => stopChildren("SIGINT"));
process.on("SIGTERM", () => stopChildren("SIGTERM"));

try {
  await generateApiDocs(sdkPath);
  console.log("[dev:site] website: http://localhost:5173/");
  console.log("[dev:site] playground: http://localhost:5173/playground/");

  const firstExit = await Promise.race([
    start("playground", ["--dir", "playground", "dev"]),
    start("website", ["--dir", "website", "dev"], {
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
