import assert from "node:assert/strict";
import test from "node:test";

import { formatDiffReport } from "../docs-i18n.mjs";

const REPORT = {
  sourceCommit: "abc123+dirty",
  gitChanges: ["M website/docs/_source/guide/index.md"],
  modifiedFiles: 2,
  pendingBlocks: 3,
  pendingCharacters: 42,
  files: [
    {
      file: "guide/index.md",
      status: "needs-agent",
      sourceChanged: true,
      targetChanged: false,
      validationError: null,
      pendingBlocks: 2,
      pendingCharacters: 30,
      blocks: [{ id: "guide/index.md#heading-0", preview: "快速开始" }],
    },
    {
      file: "guide/engine.md",
      status: "pending",
      sourceChanged: false,
      targetChanged: false,
      validationError: null,
      pendingBlocks: 1,
      pendingCharacters: 12,
      blocks: [{ id: "guide/engine.md#paragraph-0", preview: "创建引擎" }],
    },
  ],
};

test("default diff output is a token-efficient file worklist", () => {
  const output = formatDiffReport(REPORT);

  assert.match(output, /diff: files=2 pending=3 characters=42/);
  assert.match(output, /needs-agent\t2\t30\tguide\/index\.md/);
  assert.doesNotMatch(output, /快速开始|"blocks"/);
});

test("file-scoped diff output includes only that file's block details", () => {
  const output = formatDiffReport(REPORT, { file: ".\\guide\\index.md" });
  const selected = JSON.parse(output);

  assert.equal(selected.modifiedFiles, 1);
  assert.equal(selected.pendingBlocks, 2);
  assert.equal(selected.files[0].file, "guide/index.md");
  assert.equal(selected.files[0].blocks[0].preview, "快速开始");
});

test("full details remain available only when explicitly requested", () => {
  const output = formatDiffReport(REPORT, { details: true });

  assert.match(output, /"blocks"/);
  assert.match(output, /快速开始/);
});
