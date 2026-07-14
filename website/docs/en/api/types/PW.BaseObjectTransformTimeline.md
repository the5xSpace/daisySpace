[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BaseObjectTransformTimeline

# Type Alias: BaseObjectTransformTimeline

> **BaseObjectTransformTimeline** = `object`

物理对象的局部变换时间采样配置。

说明：
- 支持常量、回调、采样数组、采样序列四种 `TimeValue` 形式
- `translate` 为推荐字段名
- `tanslate` 为历史兼容拼写

## Properties

### rotation?

> `optional` **rotation?**: [`TimeValue`](TimeValue.md)\<[`Rotation`](Rotation.md)\>

***

### scale?

> `optional` **scale?**: [`TimeValue`](TimeValue.md)\<`Daisy.Cartesian3`\>

***

### tanslate?

> `optional` **tanslate?**: [`TimeValue`](TimeValue.md)\<`Daisy.Cartesian3`\>

***

### translate?

> `optional` **translate?**: [`TimeValue`](TimeValue.md)\<`Daisy.Cartesian3`\>
