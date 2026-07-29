# Website documentation rules

Before changing any documentation or API Markdown, read `DOC_TRANSLATION.md` completely and follow the final translation method documented there.

- Read `_source` and `en` side by side, then translate directly into `docs/en`.
- Use the model's own language ability for translation. Do not route meaning through external tools or translation APIs.
- Never edit `docs/zh` or `i18n/manifest.json` manually.
- Use `pnpm docs:finish <path> [more-paths...]` after translating each file-scoped batch; it prepares, validates, accepts, and strictly checks only those files.
- Use `pnpm docs:diff <path>` for diagnostics. Run `pnpm test:docs` and `pnpm --dir website build` for final verification.
- Do not publish or approve English documentation while strict validation reports pending blocks.
