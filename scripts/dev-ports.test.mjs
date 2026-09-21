import assert from "node:assert/strict";
import test from "node:test";

import { createDevEnv, resolveAdaptivePort, resolvePnpmBin } from "./dev-adaptive.mjs";
import { findAvailablePort, parsePreferredPort } from "./dev-ports.mjs";

test("uses the fallback when no preferred port is configured", () => {
  assert.equal(parsePreferredPort(undefined, 5173), 5173);
  assert.equal(parsePreferredPort("", 5173), 5173);
});

test("validates an explicitly configured preferred port", () => {
  assert.equal(parsePreferredPort("6200", 5173), 6200);
  assert.throws(() => parsePreferredPort("invalid", 5173), /Invalid port/);
  assert.throws(() => parsePreferredPort("70000", 5173), /Invalid port/);
});

test("finds the next available port and respects reserved ports", async () => {
  const checked = [];
  const port = await findAvailablePort(5173, {
    excluded: new Set([5174]),
    isAvailable: async (candidate) => {
      checked.push(candidate);
      return candidate === 5175;
    },
  });

  assert.equal(port, 5175);
  assert.deepEqual(checked, [5173, 5175]);
});

test("website adaptive port honors DAISY_SITE_PORT when free", async () => {
  const port = await resolveAdaptivePort("website", { DAISY_SITE_PORT: "6210" });
  assert.equal(port, 6210);
});

test("playground adaptive env sets DAISY_PLAYGROUND_PORT", () => {
  const env = createDevEnv("playground", 5188, { PATH: "/usr/bin" });
  assert.equal(env.DAISY_PLAYGROUND_PORT, "5188");
  assert.equal(env.PATH, "/usr/bin");
});

test("resolvePnpmBin returns a spawn-safe binary name", () => {
  const bin = resolvePnpmBin();
  if (process.platform === "win32") {
    assert.equal(bin, "pnpm.cmd");
  } else {
    assert.equal(bin, "pnpm");
  }
});
