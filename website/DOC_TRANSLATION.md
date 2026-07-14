---
name: daisy-documentation-translation
description: Use when Daisy Space source documents or generated API Markdown change and zh/en documents must be updated, translated, reviewed, and validated.
---

# Daisy documentation translation skill

This document is an execution contract for Codex or another mature coding agent. The repository does not contain or invoke an AI model. The agent performs all semantic comparison and translation; local scripts only prepare files, report deterministic differences, and enforce acceptance rules.

## Scope and ownership

- `website/docs/_source` is the only source of truth and is written in Chinese.
- `website/docs/zh` is generated and must remain byte-for-byte equal to `_source`.
- `website/docs/en` is the agent's English working tree. Codex edits these files directly.
- `website/docs/_source/api` is generated from the private SDK and must not be hand-edited.
- `website/i18n/glossary.json` is the reviewed terminology source.
- `website/i18n/manifest.json` is generated acceptance state and must not be hand-edited.

Never implement or call a model provider inside this repository. Do not add API keys, model configuration, prompts, request batching, or an embedded translation agent.

## Required workflow

1. Read this file completely and inspect `git status`. Preserve unrelated user changes.
2. Update source documents:

   - Guides: edit `website/docs/_source/**/*.md`.
   - API: run `pnpm docs:api -- <relative-sdk-path>`.

3. Prepare deterministic targets:

   ```bash
   pnpm docs:prepare
   ```

   This synchronizes `zh`, creates missing `en` work files, removes targets whose source was deleted, and never overwrites an existing English translation.

4. Generate the worklist:

   ```bash
   pnpm docs:diff
   ```

   The default output is a compact, one-line-per-file worklist. Do not request or paste the full repository report into the agent context. For one file's block-level details, run:

   ```bash
   pnpm docs:diff -- --file guide/index.md
   ```

   Use `--details` only when an external deterministic tool explicitly needs the complete JSON report. Read each file's `status`, `validationError`, and, for a selected file, `blocks[]`. The report combines manifest hashes with the recorded Git baseline. Relevant statuses are:

   - `needs-agent`: source changed or the English structure is invalid.
   - `in-progress`: English was edited but still contains pending blocks.
   - `pending`: an accepted bootstrap block is still Chinese.
   - `ready-to-accept`: current English content passes deterministic validation.

5. Work in small coherent batches. For each reported file, request only that file's details, read both `_source/<file>` and `en/<file>`, inspect that file's Git diff when available, then update `en/<file>` directly. Translate only changed meaning while keeping unchanged accepted translation intact.
6. After a coherent batch, validate and record progress:

   ```bash
   pnpm docs:accept -- --allow-pending
   pnpm docs:diff
   ```

   Partial acceptance is allowed only to checkpoint a long agent task. It does not enable the English website.

7. When all files are complete, run strict acceptance and verification:

   ```bash
   pnpm docs:accept
   pnpm docs:check
   pnpm test:docs
   pnpm build:website -- <relative-sdk-path>
   ```

8. Review the final Git diff. Commit source, zh, en, glossary, and manifest together.

## Translation rules

- Preserve API names, TypeScript identifiers, inline code, code blocks, paths, URLs, units, product names, and namespace names exactly.
- Preserve frontmatter keys, heading levels, list item counts, table dimensions, links, images, emphasis, and blockquote structure.
- English internal links must use `/en/guide`, `/en/api`, or `/en/pricing`. `docs:prepare` localizes links only when creating a new English file; Codex must preserve them afterward.
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
