---
title: Installation
---

# Installation

Daisy Space SDK is published as an npm package, recommended for use in modern front-end projects such as Vite, Vue, React, or Svelte.

## Requirements

| Project | Requirement |
|---------|-------------|
| Node.js | 18+ |
| Package manager | npm / pnpm / yarn (all supported) |
| TypeScript | `strict` mode recommended |
| Browser | Modern browser with WebGL2 support |

The SDK pins the underlying rendering runtime version internally, so consuming projects do not need to declare or upgrade the rendering dependency.

## Install the SDK

```bash
# npm
npm install daisy-space-sdk

# pnpm
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

## Minimal Project Setup

Prepare a container element in your HTML:

```html
<div id="daisyContainer" style="width: 100vw; height: 100vh"></div>
```

Create the engine in your application code:

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

## Static Asset Paths

`daisy-space-sdk` ships with Cesium runtime, Workers, imagery, and model assets. Applications must preserve the SDK `dist` directory structure, and set `BuildModuleUrl` to the public directory before creating the engine:

```typescript
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")
const engine = await Daisy.Engine.create("daisyContainer")
```

When referencing SDK built-in assets, you must generate URLs through `Daisy.BuildModuleUrl.getUrl()`. Do not use application root paths such as `/static/...` or `/sandAssets/...`. For the full asset directory listing and bundler integration requirements, see [内置静态资源](/en/guide/builtin-assets).

## Next Steps

After installation, first run through the [Quick Start](/en/guide/) minimal example, then proceed to [Satellite](/en/guide/satellite), [Sensor](/en/guide/sensor), or [Route Aircraft](/en/guide/route-aircraft) based on your use case.
