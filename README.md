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

Website development and builds generate the API documentation first:

```bash
pnpm dev:website -- ../DaisySim
pnpm build:website -- ../DaisySim
```

For integrated development with live Playground updates, start both applications:

```bash
pnpm dev:site -- ../DaisySim
```

The website runs at `http://localhost:5173/` and proxies `/playground/` to the
Playground dev server on port `5174`.

Build the Playground and VitePress website together:

```bash
pnpm build:site -- ../DaisySim
```
