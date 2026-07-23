---
name: daisy-documentation-translation
description: Use when Daisy Space source documents or generated API Markdown change and the English docs need to be translated directly by an LLM, then validated locally.
---

# Daisy documentation translation skill

This document is an execution contract for Codex or another mature coding agent. The workflow is direct LLM translation: read `_source`, translate the English markdown in place, and use local scripts only to validate the result.

## Scope and ownership

- `website/docs/_source` is the only source of truth and is written in Chinese.
- `website/docs/zh` is generated and must remain byte-for-byte equal to `_source`.
- `website/docs/en` is the English working tree. Codex edits these files directly.
- `website/docs/_source/api` is generated from the private SDK and must not be hand-edited.
- `website/i18n/glossary.json` is the reviewed terminology source.
- `website/i18n/manifest.json` is generated acceptance state and must not be hand-edited.

Do not introduce a translation service, API keys, prompt templates, request batching, or any embedded translation engine into the repository.

## Working method

1. Read this file completely and inspect `git status`. Preserve unrelated user changes.
2. Read the Chinese source file in `_source` and the current English file in `en` side by side.
3. Translate directly with the LLM's language ability. Do not route meaning through external tools, translation APIs, or scripts.
4. Edit `website/docs/en/**` directly with `apply_patch`.
5. Keep protected literals, code blocks, links, table structure, and heading structure unchanged.
6. Use local scripts only after a translation pass is already written, and only for validation:

   ```bash
   pnpm docs:diff -- --file <relative-doc-path>
   pnpm --dir website build
   ```

7. Never use the i18n scripts as a translation engine or as the source of truth for meaning.
8. Never hand-edit `website/docs/zh` or `website/i18n/manifest.json`.

## Translation rules

- Preserve API names, TypeScript identifiers, inline code, code blocks, paths, URLs, units, product names, and namespace names exactly.
- Preserve frontmatter keys, heading levels, list item counts, table dimensions, links, images, emphasis, and blockquote structure.
- English internal links must use `/en/guide`, `/en/api`, or `/en/pricing`.
- Translate the complete current meaning. Use the existing English file as translation memory and style context.
- Prefer concise technical English. Do not add behavior, examples, guarantees, or marketing claims absent from the source.
- Do not mark work complete merely because Chinese characters disappeared. Compare semantics against the source and relevant Git change.

## Code blocks and protected content

- Code blocks (``` ... ```) must be byte-for-byte identical to _source. Do NOT translate comments or text inside code blocks.
- Backtick-wrapped Chinese (e.g. `任务进度`) is protected inline code — keep as-is.
- English words embedded in Chinese prose (e.g. "Options", "Feature", "Widget") are protected literals — preserve exact casing.
- If `docs:diff` reports "protected code block changed", restore the code block from `_source`.
- If `docs:diff` reports "protected literal X missing", restore X at that location and re-translate only surrounding prose.
- If `docs:diff` reports "structure mismatch", copy `_source` back to `en/` and re-translate only prose paragraphs without adding or removing any Markdown markup.

## Build Verification

After translating a set of files, verify the site builds without errors:

```bash
cd website && pnpm build
```

A successful build means all translated files are syntactically valid and can be published. The `docs:accept` and `docs:check` scripts are optional validation helpers; they may fail on unrelated files and should not block translation progress.

## Direct Translation Workflow

When translating files:

1. Translate the target English file directly from `_source`.
2. Keep the original Markdown structure intact.
3. Run `pnpm docs:diff -- --file <path>` after editing to catch validation errors.
4. Fix errors immediately by restoring code blocks from `_source`, restoring protected literals, or re-translating surrounding prose.
5. Verify with `pnpm build` at the end of the session or after a coherent set of edits.
