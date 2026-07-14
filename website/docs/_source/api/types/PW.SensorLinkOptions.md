[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorLinkOptions

# Type Alias: SensorLinkOptions

> **SensorLinkOptions** = `object`

传感器链路跟踪与流动效果配置。

## Properties

### flow?

> `optional` **flow?**: [`SensorFlowOptions`](PW.SensorFlowOptions.md)

链路中的波束流动效果配置。

推荐写法：
```ts
flow: {
 activeWhen: windows,
}
```

上述写法会直接使用内置默认流动材质；
如果需要覆盖默认表现，再补充 `material` 或其它参数即可。

***

### track?

> `optional` **track?**: [`SensorTrackInterval`](PW.SensorTrackInterval.md)[]

链路跟踪计划（可按时段切换目标）。

推荐写法：
- 只写 `track` 即可完成基础跟踪
- 当你只需要“默认流动效果”时，`flow` 也可以只写
 `activeWhen`
- 默认材质会自动根据波束颜色生成，视觉效果通常已经足够好
