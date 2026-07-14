[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RocketConfig

# Type Alias: RocketConfig

> **RocketConfig** = `Omit`\<[`VehicleConfig`](PW.VehicleConfig.md), `"position"` \| `"path"` \| `"point"` \| `"label"` \| `"model"` \| `"orientation"`\> & [`RocketDefaultVisualsOptions`](PW.RocketDefaultVisualsOptions.md) & `object`

## Type Declaration

### ascent?

> `optional` **ascent?**: [`RocketAscentInput`](PW.RocketAscentInput.md)

主动段弹道输入。传入后 Rocket 会在构造或绑定后生成 trajectory。

### autoAlignVerticalModelToFlight?

> `optional` **autoAlignVerticalModelToFlight?**: `boolean`

是否自动把竖直发射模型的本体 +Z 轴安装到 Rocket 前向 +X 轴。

许多火箭/导弹模型在 glTF 内以 +Z 作为鼻锥方向，而 Daisy Vehicle
约定本体前向为 +X。开启后会给模型附加绕本体 Y 轴 -90° 的安装俯仰。

#### Default

```ts
true
```

### autoOrientationByVelocity?

> `optional` **autoOrientationByVelocity?**: `boolean`

是否根据轨迹速度自动写入姿态。

#### Default

```ts
true
```

### bodyAxis?

> `optional` **bodyAxis?**: `boolean` \| `BodyAxisOptions`

机体坐标轴调试显示。传入 true 使用 Rocket 默认轴参数；传入对象则透传给 Entity.setBodyAxis。

### epoch?

> `optional` **epoch?**: `Daisy.JulianDate`

轨迹起始时刻。省略时优先使用场景当前时间，未绑定 Engine 时使用当前系统时间。
