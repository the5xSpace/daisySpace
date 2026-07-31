# DaisySpace

DaisySpace is the open-source website and interactive Playground for the DaisySpace SDK.

The SDK implementation is maintained separately. This repository consumes a released
`daisy-space-sdk` package and does not import SDK source files.

## Development

Install dependencies from the repository root:

```bash
pnpm install
pnpm dev:playground
```

Generate API documentation directly from a local SDK checkout. The SDK path is
resolved relative to this repository root:

```bash
pnpm docs:api -- ../DaisySim
```

The canonical Markdown lives in `website/docs/_source`. Chinese output is
generated; English Markdown is maintained directly by Codex or another mature
coding agent. See [`website/DOC_TRANSLATION.md`](website/DOC_TRANSLATION.md) for
the skill-style incremental diff, translation, acceptance, and validation workflow.

```bash
pnpm docs:prepare
pnpm docs:diff
pnpm docs:accept
pnpm docs:check
pnpm test:docs
```

`docs:prepare`, `docs:diff`, and `docs:accept` are incremental by default: they
select only Git-changed source/English files since the accepted manifest baseline.
Pass explicit document paths for a smaller batch, or `--all` for a deliberate
full-tree operation. `docs:check` remains a full strict audit.

Website builds regenerate TypeDoc output and refuse stale translations. The
repository never calls a model or stores model credentials. Until Codex finishes
strict acceptance, English routes are excluded rather than serving stale content.

Website development and builds generate the API documentation first:

```bash
pnpm dev:website -- ../DaisySim
pnpm build:website -- ../DaisySim
```

For integrated development with live Playground updates, start both applications:

```bash
pnpm dev:site -- ../DaisySim
```

The command selects available ports for both servers and prints the actual website and
`/playground/` URLs. When the preferred ports are occupied, it automatically advances
to the next available ports and keeps the proxy and HMR configuration synchronized.

Build the Playground and VitePress website together:

```bash
pnpm build:site -- ../DaisySim
```
