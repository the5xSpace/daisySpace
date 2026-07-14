import assert from "node:assert/strict";
import test from "node:test";

import {
  extractMarkdownBlocks,
  hashText,
  localizeMarkdownLinks,
  protectMarkdown,
  protectFrontmatter,
  validateDocumentStructure,
} from "./markdown.mjs";

const SAMPLE = `---
title: 安装 Daisy Space
description: 快速安装与配置 SDK
layout: doc
---

# 安装 \`DaisySpace\`

使用 [API 文档](/api/classes/Engine) 创建 \`Engine\`。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| \`token\` | \`string\` | 访问令牌 |

- 保留 \`npm install daisy-space-sdk\`
- 查看 [快速开始](/guide/)

\`\`\`ts
const engine = await Engine.create("container");
\`\`\`
`;

test("extracts translatable blocks while keeping code fenced off", () => {
  const document = extractMarkdownBlocks(SAMPLE, "guide/installation.md");
  const kinds = document.blocks.map((block) => block.kind);

  assert.deepEqual(kinds, [
    "frontmatter",
    "heading",
    "paragraph",
    "table",
    "list",
    "code",
  ]);
  assert.equal(document.blocks.at(-1).translatable, false);
  assert.match(document.blocks[2].id, /^guide\/installation\.md#安装-daisyspace\/paragraph-/);
  assert.equal(document.structureHash.length, 64);
});

test("hashes equivalent line endings identically", () => {
  assert.equal(hashText("a\r\nb\r\n"), hashText("a\nb\n"));
});

test("protects code, destinations, html and technical identifiers", () => {
  const original =
    "使用 `Engine.create()` 和 [API](/api/classes/Engine)，不要修改 <Badge type=\"tip\" />。";
  const protectedBlock = protectMarkdown(original);

  assert.doesNotMatch(protectedBlock.text, /Engine\.create|\/api\/classes|<Badge/);
  assert.equal(protectedBlock.restore(protectedBlock.text), original);
  assert.throws(
    () => protectedBlock.restore(protectedBlock.text.replace("__DAISY_TOKEN_000__", "")),
    /protected token/,
  );
});

test("frontmatter exposes only translatable scalar values", () => {
  const original = "---\ntitle: 安装 DaisySpace\ndescription: 快速开始\nlayout: page\n---\n";
  const protectedBlock = protectFrontmatter(original);
  assert.match(protectedBlock.text, /安装/);
  assert.doesNotMatch(protectedBlock.text, /title:|description:|layout:|DaisySpace/);
  assert.equal(protectedBlock.restore(protectedBlock.text), original);
});

test("duplicate headings still receive unique stable block ids", () => {
  const document = extractMarkdownBlocks(
    "# 示例\n\n第一段。\n\n# 示例\n\n第二段。\n",
    "guide/duplicate.md",
  );
  const ids = document.blocks.map((block) => block.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("localizes only documentation links for English output", () => {
  const localized = localizeMarkdownLinks(
    "[API](/api/classes/Engine) [Guide](/guide/) [Demo](/playground/) `fetch('/api/raw')`\n\n[engine]: /api/classes/Engine",
    "en",
  );

  assert.equal(
    localized,
    "[API](/en/api/classes/Engine) [Guide](/en/guide/) [Demo](/playground/) `fetch('/api/raw')`\n\n[engine]: /en/api/classes/Engine",
  );
  assert.equal(localizeMarkdownLinks(localized, "en"), localized);
  assert.equal(localizeMarkdownLinks(localized, "zh"), localized);
});

test("rejects translations that change markdown structure", () => {
  const source = extractMarkdownBlocks(SAMPLE, "guide/installation.md");
  const valid = SAMPLE.replace("使用", "Use").replace("创建", "to create");
  assert.doesNotThrow(() => validateDocumentStructure(source, valid, "guide/installation.md"));
  assert.throws(
    () => validateDocumentStructure(source, SAMPLE.replace("```ts", ""), "guide/installation.md"),
    /structure mismatch/,
  );
});
