import { spawn } from "node:child_process";
import net from "node:net";

import { resolvePnpmBin } from "./dev-adaptive.mjs";
import { findAvailablePort } from "./dev-ports.mjs";

function waitForPort(port, timeoutMs = 30000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = net.connect({ host: "127.0.0.1", port });
      socket.once("connect", () => {
        socket.end();
        resolve(true);
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - started > timeoutMs) reject(new Error(`Port ${port} not ready`));
        else setTimeout(attempt, 500);
      });
    };
    attempt();
  });
}

const port = await findAvailablePort(5173);
console.log("chosen port", port);

const child = spawn(
  resolvePnpmBin(),
  [
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
    "--strict",
  ],
  {
    cwd: "D:\\work\\logic\\space\\daisySpace",
    env: { ...process.env, DAISY_SITE_PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  },
);

child.stdout.on("data", (chunk) => process.stdout.write(`[out] ${chunk}`));
child.stderr.on("data", (chunk) => process.stderr.write(`[err] ${chunk}`));

try {
  await waitForPort(port, 40000);
  // Give VitePress a moment to finish first request compilation.
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const paths = ["/", "/guide/model-library"];
  for (const path of paths) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    const html = await response.text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "n/a";
    console.log("READY", {
      path,
      port,
      status: response.status,
      contentType: response.headers.get("content-type"),
      title,
      isDaisy: /Daisy|第一方|指南|model-library/i.test(html),
      length: html.length,
    });
  }
} catch (error) {
  console.error("FAILED", error.message);
} finally {
  if (process.platform === "win32") {
    spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(0), 1000);
}
