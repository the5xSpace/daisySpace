import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  acceptDocuments,
  checkDocuments,
  diffDocuments,
  finishDocuments,
  prepareDocuments,
} from "./workflow.mjs";

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), "daisy-docs-i18n-"));
  const docsDir = path.join(root, "docs");
  const i18nDir = path.join(root, "i18n");
  await mkdir(path.join(docsDir, "_source", "guide"), { recursive: true });
  await writeFile(path.join(docsDir, "_source", "guide", "index.md"),
    "# 快速开始\n\n阅读 [API](/api/) 并创建 `Engine`。\n", "utf8");
  await mkdir(i18nDir, { recursive: true });
  await writeFile(path.join(i18nDir, "glossary.json"), '{"Engine":"Engine"}\n', "utf8");
  return { docsDir, i18nDir };
}

test("prepare creates source-aligned zh and an English work copy", async () => {
  const { docsDir, i18nDir } = await fixture();
  const result = await prepareDocuments({ docsDir, i18nDir });

  assert.equal(result.files, 1);
  assert.match(await readFile(path.join(docsDir, "zh", "guide", "index.md"), "utf8"), /快速开始/);
  assert.match(await readFile(path.join(docsDir, "en", "guide", "index.md"), "utf8"), /\/en\/api\//);
});

test("Codex edits English directly, then accept records and check verifies it", async () => {
  const { docsDir, i18nDir } = await fixture();
  await prepareDocuments({ docsDir, i18nDir });
  const englishFile = path.join(docsDir, "en", "guide", "index.md");
  await writeFile(englishFile, "# Quick Start\n\nRead the [API](/en/api/) and create an `Engine`.\n", "utf8");

  await acceptDocuments({ docsDir, i18nDir, sourceCommit: "abc123" });
  await checkDocuments({ docsDir, i18nDir });

  await writeFile(englishFile, "# Getting Started\n\nRead the [API](/en/api/) and create an `Engine`.\n", "utf8");
  await assert.rejects(checkDocuments({ docsDir, i18nDir }), /target hash mismatch/);
});

test("prepare preserves an existing English translation when source changes", async () => {
  const { docsDir, i18nDir } = await fixture();
  await prepareDocuments({ docsDir, i18nDir });
  const englishFile = path.join(docsDir, "en", "guide", "index.md");
  const sourceFile = path.join(docsDir, "_source", "guide", "index.md");
  const english = "# Quick Start\n\nRead the [API](/en/api/) and create an `Engine`.\n";
  await writeFile(englishFile, english, "utf8");
  await acceptDocuments({ docsDir, i18nDir });

  await writeFile(sourceFile, "# 五分钟快速开始\n\n阅读 [API](/api/) 并创建、启动 `Engine`。\n", "utf8");
  await prepareDocuments({ docsDir, i18nDir });
  assert.equal(await readFile(englishFile, "utf8"), english);

  const report = await diffDocuments({ docsDir, i18nDir });
  assert.equal(report.modifiedFiles, 1);
  assert.equal(report.files[0].status, "needs-agent");
  assert.ok(report.files[0].blocks.length > 0);
});

test("partial agent work can be accepted as pending but strict check still fails", async () => {
  const { docsDir, i18nDir } = await fixture();
  await prepareDocuments({ docsDir, i18nDir });
  const result = await acceptDocuments({ docsDir, i18nDir, allowPending: true });

  assert.ok(result.pendingBlocks > 0);
  await checkDocuments({ docsDir, i18nDir, allowPending: true });
  await assert.rejects(checkDocuments({ docsDir, i18nDir }), /pending translations/);
});

test("scoped accept updates one file without scanning or gating other files", async () => {
  const { docsDir, i18nDir } = await fixture();
  await mkdir(path.join(docsDir, "_source", "guide", "advanced"), { recursive: true });
  await writeFile(path.join(docsDir, "_source", "guide", "advanced", "index.md"),
    "# 高级用法\n\n仍待翻译的内容。\n", "utf8");
  await prepareDocuments({ docsDir });

  const englishFile = path.join(docsDir, "en", "guide", "index.md");
  await writeFile(englishFile, "# Quick Start\n\nRead the [API](/en/api/) and create an `Engine`.\n", "utf8");

  const result = await acceptDocuments({
    docsDir,
    i18nDir,
    files: ["guide/index.md"],
    sourceCommit: "abc123",
  });

  assert.equal(result.scoped, true);
  assert.equal(result.files, 1);
  const manifest = JSON.parse(await readFile(path.join(i18nDir, "manifest.json"), "utf8"));
  assert.equal(manifest.files["guide/index.md"].locales.en.status, "translated");
  assert.equal(manifest.files["guide/advanced/index.md"], undefined);
});

test("scoped diff only evaluates the requested file", async () => {
  const { docsDir, i18nDir } = await fixture();
  await prepareDocuments({ docsDir });
  const englishFile = path.join(docsDir, "en", "guide", "index.md");
  await writeFile(englishFile, "# Quick Start\n\nRead the [API](/en/api/) and create an `Engine`.\n", "utf8");
  await acceptDocuments({ docsDir, i18nDir, files: ["guide/index.md"] });

  const report = await diffDocuments({
    docsDir,
    i18nDir,
    files: ["guide/index.md"],
  });

  assert.equal(report.scoped, true);
  assert.equal(report.modifiedFiles, 0);
  assert.deepEqual(report.files, []);
});

test("scoped prepare does not create or update unrelated targets", async () => {
  const { docsDir } = await fixture();
  const unrelatedSource = path.join(docsDir, "_source", "guide", "advanced.md");
  const unrelatedEnglish = path.join(docsDir, "en", "guide", "advanced.md");
  await writeFile(unrelatedSource, "# 高级用法\n", "utf8");
  await mkdir(path.dirname(unrelatedEnglish), { recursive: true });
  await writeFile(unrelatedEnglish, "# Existing translation\n", "utf8");

  const result = await prepareDocuments({ docsDir, files: ["guide/index.md"] });

  assert.equal(result.files, 1);
  assert.equal(await readFile(unrelatedEnglish, "utf8"), "# Existing translation\n");
  await assert.rejects(
    readFile(path.join(docsDir, "zh", "guide", "advanced.md"), "utf8"),
    /ENOENT/,
  );
});

test("scoped check ignores stale unrelated documents", async () => {
  const { docsDir, i18nDir } = await fixture();
  const advancedSource = path.join(docsDir, "_source", "guide", "advanced.md");
  await writeFile(advancedSource, "# 高级用法\n\n检查更多能力。\n", "utf8");
  await prepareDocuments({ docsDir });
  await writeFile(
    path.join(docsDir, "en", "guide", "index.md"),
    "# Quick Start\n\nRead the [API](/en/api/) and create an `Engine`.\n",
    "utf8",
  );
  await writeFile(
    path.join(docsDir, "en", "guide", "advanced.md"),
    "# Advanced Usage\n\nExplore more capabilities.\n",
    "utf8",
  );
  await acceptDocuments({ docsDir, i18nDir });
  await writeFile(path.join(docsDir, "en", "guide", "advanced.md"), "# Stale\n", "utf8");

  const result = await checkDocuments({
    docsDir,
    i18nDir,
    files: ["guide/index.md"],
  });

  assert.equal(result.scoped, true);
  assert.equal(result.files, 1);
  await assert.rejects(checkDocuments({ docsDir, i18nDir }), /target hash mismatch/);
});

test("finish accepts and checks only a completed translation", async () => {
  const { docsDir, i18nDir } = await fixture();
  await prepareDocuments({ docsDir, files: ["guide/index.md"] });
  await writeFile(
    path.join(docsDir, "en", "guide", "index.md"),
    "# Quick Start\n\nRead the [API](/en/api/) and create an `Engine`.\n",
    "utf8",
  );

  const result = await finishDocuments({
    docsDir,
    i18nDir,
    files: ["guide/index.md"],
    sourceCommit: "abc123",
  });

  assert.equal(result.files, 1);
  assert.equal(result.checked.scoped, true);
  const manifest = JSON.parse(await readFile(path.join(i18nDir, "manifest.json"), "utf8"));
  assert.equal(manifest.files["guide/index.md"].locales.en.status, "translated");
});

test("finish fails concisely when the requested translation is pending", async () => {
  const { docsDir, i18nDir } = await fixture();

  await assert.rejects(
    finishDocuments({ docsDir, i18nDir, files: ["guide/index.md"] }),
    (error) => {
      assert.match(error.message, /documentation translation is incomplete/);
      assert.match(error.message, /guide\/index\.md: pending=2 characters=/);
      assert.doesNotMatch(error.message, /快速开始/);
      return true;
    },
  );
});

test("finish refuses an unscoped run", async () => {
  const { docsDir, i18nDir } = await fixture();

  await assert.rejects(
    finishDocuments({ docsDir, i18nDir, files: [] }),
    /requires at least one document path/,
  );
});
