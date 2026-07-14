---
title: 安装
---

# 安装

DaisySpace-Sdk 以 npm 包形式发布，推荐在 Vite / Vue / React / Svelte 等现代前端工程中使用。

## 环境要求

| 项目 | 要求 |
|------|------|
| Node.js | 18+ |
| 包管理器 | npm / pnpm / yarn 均可 |
| TypeScript | 推荐开启 `strict` |
| 浏览器 | 支持 WebGL2 的现代浏览器 |

SDK 已在包内锁定底层渲染运行时版本，业务项目不需要额外声明或升级底层渲染依赖。

## 安装 SDK

```bash
# npm
npm install daisy-space-sdk

# pnpm
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

## 最小工程接入

HTML 中准备一个容器：

```html
<div id="daisyContainer" style="width: 100vw; height: 100vh"></div>
```

业务代码中创建引擎：

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
engine.play()
```

容器也可以直接传入 `HTMLElement`：

```typescript
const container = document.getElementById("daisyContainer")
if (!container) throw new Error("daisyContainer not found")

const engine = await Daisy.Engine.create(container)
```

## 静态资源路径

`daisy-space-sdk` 包含 Cesium 运行时、Worker、影像、模型等静态资源。应用需要保留 SDK `dist` 的目录结构，并在创建引擎前将 `BuildModuleUrl` 指向该公开目录：

```typescript
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")
const engine = await Daisy.Engine.create("daisyContainer")
```

业务代码引用 SDK 内置资源时，必须通过 `Daisy.BuildModuleUrl.getUrl()` 生成 URL，不要使用 `/static/...` 或 `/sandAssets/...` 等应用根路径。完整目录清单和构建工具接入要求见 [内置静态资源](/guide/builtin-assets)。

## 下一步

安装完成后，先跑通 [快速开始](/guide/) 的最小示例，再按业务类型进入 [卫星](/guide/satellite)、[传感器](/guide/sensor) 或 [航线飞行器](/guide/route-aircraft)。
