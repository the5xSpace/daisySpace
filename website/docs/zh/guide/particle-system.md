# 粒子系统

Daisy 提供两类粒子能力：[ParticleFeature](/api/classes/ParticleFeature)（世界空间粒子，逐粒子物理积分）和 [CapsuleParticleFeature](/api/classes/CapsuleParticleFeature)（宿主绑定的预渲染画布面片）。

**选型指南：**

| 场景 | 用 |
|------|----|
| 雨、雪、烟雾、风尘、水流等自然粒子 | [ParticleFeature](/api/classes/ParticleFeature) |
| 火箭喷焰、飞机尾焰、姿控喷口等强绑定宿主的效果 | [CapsuleParticleFeature](/api/classes/CapsuleParticleFeature) |

---

## ParticleFeature

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
entity.addFeature(new Daisy.ParticleFeature({
    image: "/assets/particle.png",

    // 发射器
    emitter: Daisy.createParticleEmitter({
        type: "circle",
        radius: 5,
        emitFrom: "shell",
    }),

    // 基础参数
    emissionRate: 100,
    speed: 50,
    minimumSpeed: 30,
    maximumSpeed: 80,
    lifetime: 2.0,
    loop: true,

    // 缩放与颜色渐变（出生 → 消亡）
    startScale: 0.5,
    endScale: 1.5,
    startColor: Daisy.Color.ORANGE.withAlpha(0.9),
    endColor: Daisy.Color.RED.withAlpha(0.0),

    // 发射方向（heading/pitch/roll，单位度）
    emitterDirection: { heading: 0, pitch: 0, roll: 0 },

    // 宿主跟随
    followEntity: true,
}))
```

### 参数表

| 参数 | 类型 | 说明 |
|------|------|------|
| `image` | `string \| Canvas \| { image, x, y, width, height } \| { image, frameWidth, frameHeight, count, columns }` | 粒子贴图，支持图片裁切和序列帧 |
| `preserveImageColor` | `boolean` | 保留贴图自身 RGB，仅用颜色控制 alpha |
| `imageSize` | `Cartesian2` | 粒子尺寸（像素） |
| `emitter` | [ParticleEmitterConfig](/api/types/ParticleEmitterConfig) | 发射器配置 |
| `emitterModelMatrix` | `Matrix4` | 发射器变换矩阵 |
| `emitterDirection` | `{ heading, pitch, roll }` | 发射朝向（度） |
| `emissionRate` | `number` | 发射速率（粒子/秒） |
| `speed` | `number` | 基准速度 |
| `minimumSpeed` / `maximumSpeed` | `number` | 速度范围 |
| `lifetime` / `particleLife` | `number` | 粒子寿命（秒） |
| `minimumParticleLife` / `maximumParticleLife` | `number` | 寿命范围 |
| `startScale` / `endScale` | `number` | 出生/消亡缩放 |
| `scale` | `number` | 统一缩放 |
| `startColor` / `endColor` | `DColor` | 出生/消亡色 |
| `color` | `DColor` | 统一色 |
| `mass` | `number` | 质量（影响重力） |
| `minimumMass` / `maximumMass` | `number` | 质量范围 |
| `gravity` | `boolean \| number \| Cartesian3 \| { enabled, acceleration, vector }` | 重力配置 |
| `loop` | `boolean` | 循环发射 |
| `bursts` | `ParticleBurst[]` | 爆发式发射 |
| `followEntity` | `boolean` | 粒子跟随宿主本地坐标 |
| `screenSpaceLimit` | `boolean \| ParticleScreenSpaceLimitOptions` | 屏幕空间预算 |
| `updateCallback` | `function` | 每帧自定义更新回调 |
| `sizeInMeters` | `boolean` | 粒子尺寸使用米制 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | 距离显示条件 |

### 发射器类型

通过 `createParticleEmitter()` 创建，支持 17 种形状：

| 类型 | 关键参数 |
|------|----------|
| `"point"` | `direction` |
| `"circle"` | `radius`, `arc`, `radiusThickness`, `emitFrom` |
| `"box"` | `dimensions`, `scale`, `emitFrom` |
| `"cone"` | `angle`, `radius`, `height`, `emitFrom` |
| `"sphere"` | `radius`, `arc`, `emitFrom` |
| `"line"` | `length`, `axis` |
| `"rectangle"` | `width`, `height`, `scale`, `rotation` |
| `"diamond"` | `width`, `height`, `rotation`, `emitFrom` |
| `"ring"` | `innerRadius`, `outerRadius` |
| `"cylinder"` | `radius`, `height` |
| `"hemisphere"` | `radius` |
| `"torus"` | `majorRadius`, `tubeRadius` |
| `"spiral"` | `radius`, `height`, `turns` |
| `"crown"` | `radius`, `height` |
| `"wave"` | `length`, `amplitude`, `width`, `frequency` |
| `"vibration"` | `amplitude`, `radius`, `axis`, `phase` |
| `"orbit"` | `radius`, `height`, `phase`, `clockwise` |

只有部分发射器支持 `emitFrom`（`"volume"` / `"shell"` / `"edge"`）；`direction` 也只适用于支持该字段的发射器。

### 重力

```typescript
// 使用宿主天体表面重力
gravity: true

// 指定数值（m/s²），沿天体局部 -Up 方向
gravity: 3.72    // 火星表面重力

// 世界坐标加速度
gravity: new Daisy.Cartesian3(0, 0, -9.8)

// 完整配置
gravity: {
    enabled: true,
    acceleration: 9.8,
    vector: new Daisy.Cartesian3(0, 0, -1),
}
```

### 屏幕空间预算

```typescript
screenSpaceLimit: {
    enabled: true,
    maxTailLengthPx: 200,
    maxParticleSizePx: 64,
    targetParticleSpacingPx: 8,
    maxEmissionRate: 500,
    minEmissionRate: 20,
}
```

### 自定义贴图（Canvas）

```typescript
const canvas = document.createElement("canvas")
canvas.width = 96; canvas.height = 96
const ctx = canvas.getContext("2d")
const gradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 44)
gradient.addColorStop(0, "rgba(255,255,255,1)")
gradient.addColorStop(0.5, "rgba(255,100,20,0.8)")
gradient.addColorStop(1, "rgba(255,0,0,0)")
ctx.fillStyle = gradient; ctx.fillRect(0, 0, 96, 96)

entity.addFeature(new Daisy.ParticleFeature({
    image: canvas,
    // ...
}))
```

---

## CapsuleParticleFeature

胶囊粒子将整个粒子系统预渲染为一张 canvas，作为单个 Sprite 面片播放。适合需要强绑宿主、连续主体形态的效果。

```typescript
entity.addFeature(new Daisy.CapsuleParticleFeature({
    // 预设
    preset: "rocket-flame",

    // 或自定义发射器参数
    emitter: {
        totalParticles: 420,
        emissionRate: 260,
        sourceVarianceX: 0.082,
        sourceVarianceY: 0.014,
        angle: 90,
        angleVariance: 16,
        speed: 0.82,
        speedVariance: 0.2,
        life: 1.05,
        lifeVariance: 0.24,
        radialAcceleration: 0.04,
        tangentialAcceleration: 0.035,
        gravityY: -0.025,
        startScale: 1.32,
        endScale: 0.34,
        stretch: 1.72,
        blendMode: "additive",
    },

    // 视觉缩放
    scale: 1.0,
    visualScaleMode: "none",   // "none" | "match-model"

    // 贴图生成参数
    textureWidth: 256,
    textureHeight: 128,
    frameCount: 1,
}))
```

### 预设

| 预设 | 效果 |
|------|------|
| `"rocket-flame"` | 火箭尾焰（橙红色、拉伸强） |
| `"jet-flame"` | 喷气火焰（蓝白色、高速） |
| `"energy-plume"` | 能量羽流（扩散性强） |
| `"soft-plume"` | 柔和尾烟 |
| `"linear-streak"` | 线状拖尾 |

### 参数表

| 参数 | 类型 | 说明 |
|------|------|------|
| `preset` | `CapsuleParticlePreset` | 预设（覆盖 emitter） |
| `emitter` | `object` | 自定义发射器参数（totalParticles/emissionRate/spread/angle/speed/life/stretch/blendMode/gravity等） |
| `scale` | `number` | 视觉缩放 |
| `visualScaleMode` | `"none" \| "match-model"` | 匹配模型尺寸的缩放模式 |
| `textureWidth` / `textureHeight` | `number` | 贴图尺寸（像素） |
| `frameCount` | `number` | 序列帧帧数 |
| `particleImage` | `string \| HTMLCanvasElement \| HTMLImageElement` | 单颗粒子图片/贴图源 |
| `show` | `boolean` | 显隐 |

---

<!--
示例参考: [ParticleSystemWorkbench.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/features/ParticleSystemWorkbench.svelte)
-->
