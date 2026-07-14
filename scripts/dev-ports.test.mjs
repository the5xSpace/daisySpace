import assert from "node:assert/strict";
import test from "node:test";

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
