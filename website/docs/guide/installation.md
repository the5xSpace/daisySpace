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

`Engine.create()` 会自动设置 SDK 静态资源基址。若你的应用把底层运行时资源部署在独立目录，需要在创建引擎前指定该资源目录：

```typescript
Daisy.Engine.setEngineBaseUrl("/path/to/cesium/")
const engine = await Daisy.Engine.create("daisyContainer")
```

如果默认地球影像、模型或天体纹理加载失败，优先检查资源目录是否能被浏览器访问，以及 `Engine.setEngineBaseUrl()` 是否在 `Engine.create()` 之前调用。

## 下一步

安装完成后，先跑通 [快速开始](/guide/) 的最小示例，再按业务类型进入 [卫星](/guide/satellite)、[传感器](/guide/sensor) 或 [航线飞行器](/guide/route-aircraft)。
