import { createHash } from "node:crypto";

import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { gfm } from "micromark-extension-gfm";
import { parseDocument } from "yaml";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const NON_TRANSLATABLE_TYPES = new Set([
  "code",
  "definition",
  "html",
  "thematicBreak",
]);

function normalizeLineEndings(value) {
  return value.replace(/\r\n?/g, "\n");
}

export function hashText(value) {
  return createHash("sha256").update(normalizeLineEndings(value), "utf8").digest("hex");
}

function slugifyHeading(raw) {
  const plain = raw
    .replace(/^#{1,6}\s+/, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim()
    .toLocaleLowerCase();
  return plain
    .replace(/[^\p{L}\p{N}._-]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function yamlKeys(raw) {
  const body = raw.replace(/^---\r?\n/, "").replace(/\r?\n---(?:\r?\n)?$/, "");
  const document = parseDocument(body);
  if (document.errors.length > 0) {
    throw new Error(`invalid frontmatter: ${document.errors[0].message}`);
  }
  if (!document.contents || document.contents.type === "SEQ") return [];
  return document.contents.items
    .map((pair) => pair?.key?.value)
    .filter((key) => typeof key === "string")
    .sort();
}

function countDescendants(node, type) {
  let count = 0;
  const visit = (current) => {
    if (!current || typeof current !== "object") return;
    if (current.type === type) count += 1;
    if (Array.isArray(current.children)) current.children.forEach(visit);
  };
  visit(node);
  return count;
}

function blockSignature(block) {
  const { node, kind } = block;
  if (kind === "frontmatter") return `frontmatter:${yamlKeys(block.raw).join(",")}`;
  let base = kind;
  if (kind === "heading") base = `heading:${node.depth}`;
  if (kind === "list") {
    base = `list:${node.ordered ? "ordered" : "unordered"}:${node.children.length}:code=${countDescendants(node, "code")}`;
  }
  if (kind === "table") {
    const columns = node.children[0]?.children?.length ?? 0;
    base = `table:${node.children.length}x${columns}`;
  }
  if (kind === "code") base = `code:${node.lang ?? ""}:${node.meta ?? ""}`;
  if (kind === "blockquote") {
    base = `blockquote:${node.children.map((child) => child.type).join(",")}`;
  }
  return `${base}:inlineCode=${countDescendants(node, "inlineCode")}` +
    `:links=${countDescendants(node, "link")}` +
    `:images=${countDescendants(node, "image")}` +
    `:strong=${countDescendants(node, "strong")}` +
    `:emphasis=${countDescendants(node, "emphasis")}`;
}

function createBlock({ file, kind, raw, start, end, node, headingPath, ordinal }) {
  const section = headingPath.length > 0 ? headingPath.join("/") : "root";
  return {
    id: `${file}#${section}/${kind}-${ordinal}`,
    kind,
    raw,
    start,
    end,
    node,
    translatable: !NON_TRANSLATABLE_TYPES.has(kind),
    sourceHash: hashText(raw),
  };
}

export function extractMarkdownBlocks(markdown, file = "document.md") {
  const blocks = [];
  let bodyOffset = 0;
  const frontmatter = markdown.match(FRONTMATTER_RE);

  if (frontmatter) {
    yamlKeys(frontmatter[0]);
    blocks.push(createBlock({
      file,
      kind: "frontmatter",
      raw: frontmatter[0],
      start: 0,
      end: frontmatter[0].length,
      node: { type: "frontmatter" },
      headingPath: [],
      ordinal: 0,
    }));
    bodyOffset = frontmatter[0].length;
  }

  const body = markdown.slice(bodyOffset);
  const tree = fromMarkdown(body, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
  const headingPath = [];
  const counters = new Map();
  const headingOccurrences = new Map();

  for (const node of tree.children) {
    const start = bodyOffset + (node.position?.start.offset ?? 0);
    const end = bodyOffset + (node.position?.end.offset ?? 0);
    const raw = markdown.slice(start, end);

    if (node.type === "heading") {
      headingPath.length = node.depth - 1;
      const slug = slugifyHeading(raw);
      const occurrenceKey = `${node.depth}:${headingPath.join("/")}:${slug}`;
      const occurrence = headingOccurrences.get(occurrenceKey) ?? 0;
      headingOccurrences.set(occurrenceKey, occurrence + 1);
      headingPath[node.depth - 1] = occurrence === 0 ? slug : `${slug}~${occurrence + 1}`;
    }

    const counterKey = `${headingPath.join("/")}:${node.type}`;
    const ordinal = counters.get(counterKey) ?? 0;
    counters.set(counterKey, ordinal + 1);
    blocks.push(createBlock({
      file,
      kind: node.type,
      raw,
      start,
      end,
      node,
      headingPath,
      ordinal,
    }));
  }

  const signatures = blocks.map(blockSignature);
  return {
    file,
    markdown,
    blocks,
    structureHash: hashText(signatures.join("\n")),
    signatures,
  };
}

function shield(text, patterns) {
  const tokens = [];
  let value = text;
  const save = (match) => {
    const token = `__DAISY_TOKEN_${String(tokens.length).padStart(3, "0")}__`;
    tokens.push({ token, value: match });
    return token;
  };

  for (const pattern of patterns) {
    value = value.replace(pattern, (match) => {
      if (/^__DAISY_TOKEN_\d{3}__$/.test(match)) return match;
      return save(match);
    });
  }

  const restore = (translated) => {
    let restored = translated;
    for (const { token, value: original } of tokens) {
      const count = restored.split(token).length - 1;
      if (count !== 1) {
        throw new Error(`protected token ${token} must appear exactly once, found ${count}`);
      }
      restored = restored.replace(token, original);
    }
    if (/__DAISY_TOKEN_\d{3}__/.test(restored)) {
      throw new Error("unknown protected token in translated content");
    }
    return restored;
  };

  return { text: value, tokens, restore };
}

const CODE_PATTERNS = [
  /(```|~~~)[^\n]*\n[\s\S]*?\n\1/g,
  /`+[^`\n]+`+/g,
];

export function protectMarkdown(markdown) {
  return shield(markdown, [
    ...CODE_PATTERNS,
    /<[^>]+>/g,
    /(?<=\]\()[^\s)]+(?=(?:\s+["'][^"']*["'])?\))/g,
    /https?:\/\/[^\s)>]+/g,
    /\b(?:[A-Z][A-Za-z0-9_$]*|[a-z]+[A-Z][A-Za-z0-9_$]*)(?:\.[A-Za-z_$][\w$]*(?:\(\))?)*\b/g,
  ]);
}

export function protectFrontmatter(frontmatter) {
  return shield(frontmatter, [
    /^---\s*$/gm,
    /^(?!(?:title|description)\s*:).+$/gm,
    /^(?:title|description)\s*:\s*/gm,
    /\b(?:[A-Z][A-Za-z0-9_$]*|[a-z]+[A-Z][A-Za-z0-9_$]*)(?:\.[A-Za-z_$][\w$]*(?:\(\))?)*\b/g,
  ]);
}

export function localizeMarkdownLinks(markdown, locale) {
  if (locale !== "en") return markdown;
  const protectedCode = shield(markdown, CODE_PATTERNS);
  const localized = protectedCode.text
    .replace(/(\]\()\/(?!en\/)(api|guide|pricing)(?=\/|#|\))/g, "$1/en/$2")
    .replace(/^(\s*\[[^\]]+\]:\s*)\/(?!en\/)(api|guide|pricing)(?=\/|#|\s|$)/gm, "$1/en/$2")
    .replace(/(href\s*=\s*["'])\/(?!en\/)(api|guide|pricing)(?=\/|#|["'])/g, "$1/en/$2");
  return protectedCode.restore(localized);
}

export function validateDocumentStructure(sourceDocument, targetMarkdown, file = sourceDocument.file) {
  const targetDocument = extractMarkdownBlocks(targetMarkdown, file);
  if (sourceDocument.structureHash !== targetDocument.structureHash) {
    throw new Error(
      `structure mismatch for ${file}: expected ${sourceDocument.signatures.join(" | ")}, ` +
      `received ${targetDocument.signatures.join(" | ")}`,
    );
  }

  for (let index = 0; index < sourceDocument.blocks.length; index += 1) {
    const sourceBlock = sourceDocument.blocks[index];
    const targetBlock = targetDocument.blocks[index];
    if (!sourceBlock.translatable && sourceBlock.raw !== targetBlock.raw) {
      throw new Error(`protected ${sourceBlock.kind} block changed in ${file} at index ${index}`);
    }
  }
  return targetDocument;
}

export function applyBlockReplacements(markdown, replacements) {
  const ordered = [...replacements].sort((left, right) => right.start - left.start);
  let output = markdown;
  let previousStart = Number.POSITIVE_INFINITY;
  for (const replacement of ordered) {
    if (replacement.end > previousStart) {
      throw new Error("overlapping markdown block replacements");
    }
    output = output.slice(0, replacement.start) + replacement.value + output.slice(replacement.end);
    previousStart = replacement.start;
  }
  return output;
}
