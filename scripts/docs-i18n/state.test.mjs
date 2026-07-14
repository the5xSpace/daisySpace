import assert from "node:assert/strict";
import test from "node:test";

import {
  createLocaleRecord,
  validateLocaleDocument,
} from "./state.mjs";

const SOURCE = `# Engine 引擎

阅读 [API](/api/classes/Engine) 并创建 \`Engine\` 实例。

\`\`\`ts
const engine = await Engine.create("container");
\`\`\`
`;

const ENGLISH = `# Engine

Read the [API](/en/api/classes/Engine) and create an \`Engine\` instance.

\`\`\`ts
const engine = await Engine.create("container");
\`\`\`
`;

test("records a Codex-edited English document as translated", () => {
  const record = createLocaleRecord({
    file: "guide/engine.md",
    locale: "en",
    sourceMarkdown: SOURCE,
    targetMarkdown: ENGLISH,
  });

  assert.equal(record.status, "translated");
  assert.ok(record.blocks.length > 0);
  assert.ok(record.blocks.every((block) => block.status === "translated"));
});

test("keeps untranslated Chinese blocks pending", () => {
  const record = createLocaleRecord({
    file: "guide/engine.md",
    locale: "en",
    sourceMarkdown: SOURCE,
    targetMarkdown: SOURCE.replaceAll("(/api/", "(/en/api/"),
  });

  assert.equal(record.status, "pending");
  assert.ok(record.blocks.some((block) => block.status === "pending"));
});

test("rejects code, inline code, link, and identifier corruption", () => {
  assert.throws(
    () => validateLocaleDocument(SOURCE, ENGLISH.replace("Engine.create", "Engine.open"), "guide/engine.md", "en"),
    /protected code block changed/,
  );
  assert.throws(
    () => validateLocaleDocument(SOURCE, ENGLISH.replaceAll("`Engine`", "`Viewer`"), "guide/engine.md", "en"),
    /protected literal.*Engine/,
  );
  assert.throws(
    () => validateLocaleDocument(SOURCE, ENGLISH.replace("/en/api/classes/Engine", "/api/classes/Engine"), "guide/engine.md", "en"),
    /protected literal.*\/en\/api/,
  );
});

test("requires non-Chinese technical blocks to remain byte-equivalent", () => {
  const source = "# Engine\n\n`Engine.create()`\n";
  assert.throws(
    () => validateLocaleDocument(source, source.replace("# Engine", "# Core Engine"), "api/classes/Engine.md", "en"),
    /non-translatable block changed/,
  );
});
