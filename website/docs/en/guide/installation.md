---
title: Installation
---

# Installation

DaisySpace-Sdk is distributed as an npm package and is intended for modern frontend projects such as Vite, Vue, React, and Svelte.

## Requirements

| Item | Requirement |
|------|------|
| Node.js | 18+ |
| Package manager | npm / pnpm / yarn |
| TypeScript | `strict` is recommended |
| Browser | A modern browser with WebGL2 support |

The SDK pins its underlying rendering runtime inside the package. Applications do not need to declare or upgrade that rendering dependency separately.

## Install The SDK

```bash
# npm
npm install daisy-space-sdk

# pnpm
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

## Minimal Integration

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

The container can also be passed directly as an `HTMLElement`:

```typescript
const container = document.getElementById("daisyContainer")
if (!container) throw new Error("daisyContainer not found")

const engine = await Daisy.Engine.create(container)
```

## Static Resource Path

`daisy-space-sdk` includes the Cesium runtime, Worker, imagery, models, and other static resources. Keep the SDK `dist` directory structure and point `BuildModuleUrl` at the public directory before creating the engine:

```typescript
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")
const engine = await Daisy.Engine.create("daisyContainer")
```

When application code references an SDK asset, generate its URL with `Daisy.BuildModuleUrl.getUrl()`. Do not use application-root paths such as `/static/...` or `/sandAssets/...`. See [Built-in Static Resources](/en/guide/builtin-assets) for the complete directory list and build-tool requirements.

## Next Steps

After installation, run the minimal example in [Quick Start](/en/guide/), then continue with [Satellite](/en/guide/satellite), [Sensor](/en/guide/sensor), or [Route Aircraft](/en/guide/route-aircraft) for your use case.
