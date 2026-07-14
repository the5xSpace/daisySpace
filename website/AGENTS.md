# Website documentation rules

Before changing any documentation or API Markdown, read `DOC_TRANSLATION.md` completely and follow its update, translation, and validation workflow.

- Edit source content only in `docs/_source`; edit translations directly in `docs/en` as instructed by the skill.
- Never edit `docs/zh` or `i18n/manifest.json` manually.
- Run `pnpm docs:prepare` and `pnpm docs:diff` before translating.
- Use `pnpm docs:diff -- --file <path>` for block details; do not load the full `--details` report into the Agent context.
- Run `pnpm docs:accept` after editing English files.
- Run `pnpm docs:check`, `pnpm test:docs`, and the website build before delivery.
- Do not publish or approve English documentation while strict `docs:check` reports pending blocks.
