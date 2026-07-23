---
title: Installation
---

# Installation

DaisySpace-Sdk is published as an npm package and is recommended for modern frontend projects built with Vite, Vue, React, or Svelte.

## Requirements

| Item | Requirement |
|------|-------------|
| Node.js | 18+ |
| Package manager | npm / pnpm / yarn |
| TypeScript | `strict` mode recommended |
| Browser | A modern browser with WebGL2 support |

The SDK ships with a locked rendering runtime version, so application projects do not need to declare or upgrade the low-level rendering dependency separately.

## Install the SDK

```bash
# npm
npm install daisy-space-sdk

# pnpm
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

## Minimal Setup

Prepare a container in HTML:

```html
<div id="daisyContainer" style="width: 100vw; height: 100vh"></div>
```

Create the engine in application code:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
engine.play()
```

You can also pass an `HTMLElement` directly:

```typescript
const container = document.getElementById("daisyContainer")
if (!container) throw new Error("daisyContainer not found")

const engine = await Daisy.Engine.create(container)
```

## Static Asset Path

`daisy-space-sdk` includes static assets such as the Cesium runtime, Worker, imagery, and models. Applications must preserve the SDK `dist` directory structure and point `BuildModuleUrl` to that public directory before creating the engine:

```typescript
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")
const engine = await Daisy.Engine.create("daisyContainer")
```

When application code references SDK-built-in assets, always generate URLs through `Daisy.BuildModuleUrl.getUrl()`. Do not use application-root paths such as `/static/...` or `/sandAssets/...`. See [Built-in Assets](/en/guide/builtin-assets) for the full directory list and build-tool integration requirements.

## Next Steps

After installation, run the minimal example in [Quick Start](/en/guide/) first, then move on to [Satellite](/en/guide/satellite), [Sensor](/en/guide/sensor), or [Route Aircraft](/en/guide/route-aircraft) based on your use case.
