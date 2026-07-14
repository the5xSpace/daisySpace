import {
  extractMarkdownBlocks,
  hashText,
  localizeMarkdownLinks,
  protectFrontmatter,
  protectMarkdown,
  validateDocumentStructure,
} from "./markdown.mjs";

const CJK_RE = /[\u3400-\u9fff]/u;

export function containsCjk(value) {
  return CJK_RE.test(value);
}

function protectionFor(block, value) {
  return block.kind === "frontmatter"
    ? protectFrontmatter(value)
    : protectMarkdown(value);
}

function visibleText(block, value) {
  return protectionFor(block, value).text;
}

function countOccurrences(text, value) {
  if (value === "") return 0;
  return text.split(value).length - 1;
}

function validateProtectedLiterals(sourceBlock, targetBlock, locale, file) {
  const expected = localizeMarkdownLinks(sourceBlock.raw, locale);
  if (!sourceBlock.translatable || !containsCjk(sourceBlock.raw)) {
    if (targetBlock.raw !== expected) {
      throw new Error(`non-translatable block changed in ${file}: ${sourceBlock.id}`);
    }
    return;
  }

  const required = new Map();
  for (const token of protectionFor(sourceBlock, expected).tokens) {
    required.set(token.value, (required.get(token.value) ?? 0) + 1);
  }
  for (const [literal, count] of required) {
    if (countOccurrences(targetBlock.raw, literal) < count) {
      throw new Error(`protected literal ${JSON.stringify(literal)} is missing in ${file}: ${sourceBlock.id}`);
    }
  }
}

export function validateLocaleDocument(sourceMarkdown, targetMarkdown, file, locale) {
  if (locale === "zh" && targetMarkdown !== sourceMarkdown) {
    throw new Error(`zh/${file} must exactly match _source/${file}`);
  }
  const sourceDocument = extractMarkdownBlocks(sourceMarkdown, file);
  const targetDocument = validateDocumentStructure(sourceDocument, targetMarkdown, file);
  if (locale === "en") {
    for (let index = 0; index < sourceDocument.blocks.length; index += 1) {
      validateProtectedLiterals(
        sourceDocument.blocks[index],
        targetDocument.blocks[index],
        locale,
        file,
      );
    }
  }
  return { sourceDocument, targetDocument };
}

function statusForSourceBlock(sourceBlock, targetBlock, locale) {
  if (!sourceBlock.translatable || locale === "zh" || !containsCjk(sourceBlock.raw)) return "copied";
  return containsCjk(visibleText(targetBlock, targetBlock.raw)) ? "pending" : "translated";
}

export function createLocaleRecord({ file, locale, sourceMarkdown, targetMarkdown }) {
  const { sourceDocument, targetDocument } = validateLocaleDocument(
    sourceMarkdown,
    targetMarkdown,
    file,
    locale,
  );
  const allBlocks = sourceDocument.blocks.map((sourceBlock, index) => {
    const targetBlock = targetDocument.blocks[index];
    return {
      index,
      id: sourceBlock.id,
      kind: sourceBlock.kind,
      sourceHash: sourceBlock.sourceHash,
      targetHash: hashText(targetBlock.raw),
      status: statusForSourceBlock(sourceBlock, targetBlock, locale),
    };
  });
  const blocks = locale === "en"
    ? allBlocks.filter((block) => {
      const sourceBlock = sourceDocument.blocks[block.index];
      return sourceBlock.translatable && containsCjk(sourceBlock.raw);
    })
    : [];
  return {
    sourceHash: hashText(sourceMarkdown),
    targetHash: hashText(targetMarkdown),
    structureHash: sourceDocument.structureHash,
    status: blocks.some((block) => block.status === "pending") ? "pending" : "translated",
    blocks,
  };
}

export function sourceWorkBlocks(sourceMarkdown, file, previousRecord) {
  const sourceDocument = extractMarkdownBlocks(sourceMarkdown, file);
  const previousBlocks = previousRecord?.blocks ?? [];
  const translatedHashes = new Set(
    previousBlocks
      .filter((block) => block.status === "translated")
      .map((block) => `${block.kind}:${block.sourceHash}`),
  );
  return sourceDocument.blocks
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => block.translatable && containsCjk(block.raw))
    .filter(({ block }) => !translatedHashes.has(`${block.kind}:${block.sourceHash}`))
    .map(({ block, index }) => ({
      id: block.id,
      index,
      kind: block.kind,
      sourceHash: block.sourceHash,
      preview: block.raw.replace(/\s+/g, " ").trim().slice(0, 240),
    }));
}
