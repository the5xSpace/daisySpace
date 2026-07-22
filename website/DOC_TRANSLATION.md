---
name: daisy-documentation-translation
description: Use when Daisy Space source documents or generated API Markdown change and zh/en documents must be updated, translated, reviewed, and validated.
---

# Daisy documentation translation skill

This document is an execution contract for Codex or another mature coding agent. The repository does not contain or invoke an AI model. The agent performs all semantic comparison and translation directly in the markdown files; local scripts are validation helpers only.

## Scope and ownership

- `website/docs/_source` is the only source of truth and is written in Chinese.
- `website/docs/zh` is generated and must remain byte-for-byte equal to `_source`.
- `website/docs/en` is the agent's English working tree. Codex edits these files directly.
- `website/docs/_source/api` is generated from the private SDK and must not be hand-edited.
- `website/i18n/glossary.json` is the reviewed terminology source.
- `website/i18n/manifest.json` is generated acceptance state and must not be hand-edited.

Never implement or call a model provider inside this repository. Do not add API keys, model configuration, prompts, request batching, or an embedded translation agent.

## Pre-flight: fix-all validation errors before any accept run

`docs:accept` is an **all-or-nothing gate**: if ANY file has a validation error
(structure mismatch, protected code block changed, protected literal missing),
the entire accept run fails and **zero files are accepted**, even files that
are already correct.

This makes sequential "translate → accept → translate → accept" prohibitively
slow. Use the **fix-all-then-accept** pattern instead.

### Fix-all pattern (required)

1. **Restore all code blocks** across every modified `en/` file so they are
   byte-for-byte identical to their `_source/` counterparts. Code blocks are
   protected literals and any deviation (including CRLF vs LF) causes a
   validation failure. A single script can do this for all files at once.

2. **Normalize LF** across all `en/` files. Windows Git checkout may re-
   introduce CRLF; any CRLF in a code block will cause a hash mismatch.

3. **Fix protected literals** — English words embedded in Chinese prose
   (e.g. `Options`, `Feature`, `Widget`, `Shader`, `Alpha`) must appear
   in the English translation with **exactly the same casing** as in the
   source. If `docs:diff` reports "protected literal X is missing", restore
   that exact word at that location and re-translate only the surrounding
   prose.

4. **Fix structure mismatches** — `docs:diff` reports the expected vs
   received AST shape. Counts of `strong`, `emphasis`, `inlineCode`,
   `links`, etc. must match exactly. The safest recovery is:
   - Copy the `_source` file back to `en/`
   - Re-translate only the prose paragraphs, table cells, and descriptions
   - Do not add or remove any Markdown markup

5. **Run `pnpm docs:diff -- --file <path>` on every modified file** and
   confirm `status: "ready-to-accept"` and `validationError: null` before
   running `docs:accept`.

6. **Run `pnpm docs:accept --allow-pending` exactly once**, after every file
   passes `docs:diff`. The `--allow-pending` flag allows acceptance of files
   that still contain non-translatable blocks (code blocks, inline code,
   generated identifiers that cannot be meaningfully translated).

## Final Working Method

1. Read this file completely and inspect `git status`. Preserve unrelated user changes.
2. Read the Chinese source file in `_source` and the current English file in `en` side by side.
3. Translate directly with the model's own language ability. Do not route translation through external tools or translation APIs.
4. Edit `website/docs/en/**` directly with `apply_patch`.
5. Keep protected literals, code blocks, links, table structure, and heading structure unchanged.
6. Use local scripts only for validation after a translation batch is already written:

   ```bash
   pnpm docs:diff -- --file <relative-doc-path>
   pnpm docs:accept
   pnpm docs:check
   pnpm test:docs
   pnpm build:website -- <relative-sdk-path>
   ```

7. Do not use the i18n scripts as a translation engine or as the source of truth for meaning.
8. Never hand-edit `website/docs/zh` or `website/i18n/manifest.json`.

## Translation rules

- Preserve API names, TypeScript identifiers, inline code, code blocks, paths, URLs, units, product names, and namespace names exactly.
- Preserve frontmatter keys, heading levels, list item counts, table dimensions, links, images, emphasis, and blockquote structure.
- English internal links must use `/en/guide`, `/en/api`, or `/en/pricing`.
- Translate the complete current meaning. Use the existing English file as translation memory and style context.
- Prefer concise technical English. Do not add behavior, examples, guarantees, or marketing claims absent from the source.
- Update `glossary.json` before introducing a new canonical term, then apply that term consistently across affected files.
- Do not mark work complete merely because Chinese characters disappeared. Compare semantics against the source and relevant Git change.

## Acceptance guarantees

`docs:accept` refuses to update the manifest when any of these conditions fail:

- Markdown structure differs from the source;
- code blocks or inline code changed;
- a required API identifier, HTML tag, or localized link target disappeared;
- non-Chinese generated API blocks were unnecessarily rewritten;
- any Chinese semantic block remains, unless `--allow-pending` was explicitly used.

`docs:check` additionally rejects source, target, glossary, or file-set drift after acceptance. VitePress exposes `/en/` only when the manifest is complete and still matches the current source and English files.

## Recovery

- If `docs:accept` reports a structure mismatch, compare the source and English AST shape; do not bypass the check.
- If it reports a protected literal, restore the exact identifier, code, or link target and translate only surrounding prose.
- If `docs:check` reports a hash mismatch, run `docs:diff`, inspect the actual edit, and run `docs:accept` again.
- Never repair state by editing `manifest.json` manually.

## Batch translation workflow (recommended for bulk updates)

When translating many files at once:

1. **Translate a batch** of files in parallel (5-10 files via sub-agent tasks).
2. **Do NOT run `docs:accept` between files.** Accepting is deferred to the end.
3. **After the batch is done**, run `pnpm docs:diff -- --file <path>` on every
   translated file to catch validation errors early.
4. **Fix all validation errors** across the entire batch before attempting accept.
5. **Run `pnpm docs:accept --allow-pending` once** for the whole batch.
6. If accept still fails, fix the reported error and re-run accept (do not
   re-translate already-correct files).

This pattern avoids the "one bad file blocks everything" trap and keeps the
accept loop to a single run per batch.
