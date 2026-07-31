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
6. Use local scripts only to discover and validate work. Finish each translated file or small related batch with one command:

   ```bash
   pnpm docs:finish <relative-doc-path> [more-paths...]
   ```

7. Never use the i18n scripts as a translation engine or as the source of truth for meaning.
8. Never hand-edit `website/docs/zh` or `website/i18n/manifest.json`.

The discovery commands are incremental by default. `docs:prepare`, `docs:diff`,
and `docs:accept` derive their file set from Git changes since the accepted
manifest baseline. Use explicit paths for the smallest possible agent batch and
reserve `--all` for deliberate full-tree maintenance. A glossary change is the
only automatic reason to fall back to a full scan.

## Fast incremental workflow

Use this sequence for normal documentation work. It is the default workflow for
Codex and other agents:

1. Discover only currently changed translation units:

   ```bash
   pnpm docs:diff
   ```

   If the summary reports `files=0 pending=0`, stop. There is no translation work.

2. Pick one file, or a small group of closely related files, from the compact
   worklist. Request block details only for the file being translated:

   ```bash
   pnpm docs:diff guide/engine.md --details
   ```

3. Read only the matching source and English files side by side:

   ```text
   website/docs/_source/guide/engine.md
   website/docs/en/guide/engine.md
   ```

4. Edit only `website/docs/en/**`. Translate the reported prose blocks while
   preserving the surrounding Markdown structure and protected content.

5. Prepare, validate, accept, and strictly check only that file or small batch:

   ```bash
   pnpm docs:finish guide/engine.md
   # or
   pnpm docs:finish guide/engine.md guide/entity.md
   ```

6. Run `pnpm docs:diff` again. Continue until it reports `files=0 pending=0`.

7. Run the full website build once after the coherent translation session, not
   once per file:

   ```bash
   pnpm --dir website build
   ```

`docs:finish` already performs scoped preparation, acceptance, and strict
validation. Do not run `docs:prepare` or `docs:accept` before it during the normal
flow.

## Performance guardrails

- Do not run `docs:diff --all`, `docs:prepare --all`, or `docs:accept --all` for
  routine edits. These commands intentionally scan the entire documentation tree.
- Do not read or send the complete `_source/api` and `en/api` trees to an agent.
  Work from the compact `docs:diff` list and request `--details` for one file at a
  time.
- Keep an agent batch small, normally one to five related files. This keeps context
  focused and lets `docs:finish` fail with a precise file-level reason.
- Do not run the VitePress build after every translated file. `docs:finish` is the
  per-file gate; the website build is the final session or release gate.
- The compact `docs:diff` output truncates verbose structural errors. Use a
  file-scoped `--details` call only when the short error is insufficient.
- An empty incremental file set must return immediately and must never fall back to
  a full scan.
- The incremental selector includes committed changes since the accepted manifest
  baseline, staged changes, working-tree changes, untracked files, and deletions in
  both `_source` and `en`.
- Use `--all` only for initial manifest creation, an intentional full audit,
  recovery from a missing/invalid manifest baseline, or a glossary-wide review.
  A changed glossary intentionally triggers a full scan because it can affect every
  English document.

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
pnpm --dir website build
```

A successful build means all translated files are syntactically valid and can be published. Run it once after a coherent translation session. `docs:finish` prepares the Chinese mirror, validates the English translation, accepts the requested files, and performs a scoped strict check. It requires at least one path, so it cannot accidentally scan or update the entire documentation tree. The lower-level commands accept positional paths or repeated `--file` options; `docs:prepare`, `docs:diff`, and `docs:accept` otherwise use the incremental Git-derived scope, while `docs:check` remains a full release audit. Pass `--all` only when a full operation is intentional.

## Direct Translation Workflow

When translating files, follow **Fast incremental workflow** above. Fix scoped
validation errors immediately by restoring code blocks from `_source`, restoring
protected literals, or re-translating surrounding prose. A file is complete only
after `docs:finish <path>` passes; a session is complete when `docs:diff` reports
zero pending files and the final website build succeeds.
