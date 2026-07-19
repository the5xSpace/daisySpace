# Website documentation rules

Before changing any documentation or API Markdown, read `DOC_TRANSLATION.md` completely and follow the final translation method documented there.

- Read `_source` and `en` side by side, then translate directly into `docs/en`.
- Use the model's own language ability for translation. Do not route meaning through external tools or translation APIs.
- Never edit `docs/zh` or `i18n/manifest.json` manually.
- Use `pnpm docs:diff -- --file <path>` only as a validation aid after translation, not as the translation method.
- Run `pnpm docs:accept`, `pnpm docs:check`, `pnpm test:docs`, and the website build only when you need verification.
- Do not publish or approve English documentation while strict validation reports pending blocks.
