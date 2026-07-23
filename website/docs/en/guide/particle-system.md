# Particle Systems

Daisy provides two particle capabilities: [ParticleFeature](/en/api/classes/ParticleFeature) (world-space particles with per-particle physics integration) and [CapsuleParticleFeature](/en/api/classes/CapsuleParticleFeature) (host-bound pre-rendered canvas sprites).

**Selection Guide:**

| Scenario | Use |
|------|----|
| Natural particles such as rain, snow, smoke, dust, and flowing water | [ParticleFeature](/en/api/classes/ParticleFeature) |
| Strongly host-bound effects such as rocket exhaust, aircraft contrails, and attitude-control thrusters | [CapsuleParticleFeature](/en/api/classes/CapsuleParticleFeature) |

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

### Parameter Table

| Parameter | Type | Description |
|------|------|------|
| `image` | `string \| Canvas \| { image, x, y, width, height } \| { image, frameWidth, frameHeight, count, columns }` | Particle image; supports image cropping and sprite sheets |
| `preserveImageColor` | `boolean` | Preserve the image's RGB and use color only for alpha |
| `imageSize` | `Cartesian2` | Particle size in pixels |
| `emitter` | [ParticleEmitterConfig](/en/api/types/ParticleEmitterConfig) | Emitter configuration |
| `emitterModelMatrix` | `Matrix4` | Emitter transform matrix |
| `emitterDirection` | `{ heading, pitch, roll }` | Emission direction in degrees |
| `emissionRate` | `number` | Emission rate in particles per second |
| `speed` | `number` | Base speed |
| `minimumSpeed` / `maximumSpeed` | `number` | Speed range |
| `lifetime` / `particleLife` | `number` | Particle lifetime in seconds |
| `minimumParticleLife` / `maximumParticleLife` | `number` | Lifetime range |
| `startScale` / `endScale` | `number` | Birth/death scale |
| `scale` | `number` | Uniform scale |
| `startColor` / `endColor` | `DColor` | Birth/death color |
| `color` | `DColor` | Uniform color |
| `mass` | `number` | Mass, affecting gravity |
| `minimumMass` / `maximumMass` | `number` | Mass range |
| `gravity` | `boolean \| number \| Cartesian3 \| { enabled, acceleration, vector }` | Gravity configuration |
| `loop` | `boolean` | Loop emission |
| `bursts` | `ParticleBurst[]` | Burst emission |
| `followEntity` | `boolean` | Follow the host's local coordinates |
| `screenSpaceLimit` | `boolean \| ParticleScreenSpaceLimitOptions` | Screen-space budget |
| `updateCallback` | `function` | Custom per-frame update callback |
| `sizeInMeters` | `boolean` | Use meters for particle size |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | Distance display condition |

### Emitter Types

Create emitters with `createParticleEmitter()`. Seventeen shapes are supported:

| Type | Key parameters |
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

Only some emitters support `emitFrom` (`"volume"` / `"shell"` / `"edge"`); `direction` is likewise available only on emitters that support the field.

### Gravity

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

### Screen-Space Budget

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

### Custom Image (Canvas)

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

Capsule particles pre-render the entire particle system to a canvas and play it as a single Sprite plane (Billboard). They are suitable for effects that need a strongly bound host and a continuous body shape.

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

### Presets

| Preset | Effect |
|------|------|
| `"rocket-flame"` | Rocket exhaust (orange-red, strongly stretched) |
| `"jet-flame"` | Jet flame (blue-white, high speed) |
| `"energy-plume"` | Energy plume (strongly dispersed) |
| `"soft-plume"` | Soft exhaust smoke |
| `"linear-streak"` | Linear trail |

### Parameter Table

| Parameter | Type | Description |
|------|------|------|
| `preset` | `CapsuleParticlePreset` | Preset; overrides emitter |
| `emitter` | `object` | Custom emitter options (totalParticles/emissionRate/spread/angle/speed/life/stretch/blendMode/gravity, and others) |
| `scale` | `number` | Visual scale |
| `visualScaleMode` | `"none" \| "match-model"` | Scale mode that matches the model size |
| `textureWidth` / `textureHeight` | `number` | Texture dimensions in pixels |
| `frameCount` | `number` | Number of sprite-sheet frames |
| `particleImage` | `string \| HTMLCanvasElement \| HTMLImageElement` | Single-particle image/texture source |
| `show` | `boolean` | Visibility |

---

<!--
示例参考: [ParticleSystemWorkbench.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/features/ParticleSystemWorkbench.svelte)
-->
