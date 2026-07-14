[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorFlowConfigDetail

# Type Alias: SensorFlowConfigDetail

> **SensorFlowConfigDetail** = `object`

传感器波束流动效果配置。

## Properties

### activeWhen?

> `optional` **activeWhen?**: [`SensorFlowSchedule`](PW.SensorFlowSchedule.md)

流动效果激活条件。

支持：
- `true`：始终激活
- `false`：始终关闭（默认）
- `TimeValue<boolean>`：按仿真时间动态开关
- `TimeValue<TimeRanges>` / `TimeRanges`：按时间区间开关

不传时默认“跟随 track 是否有目标”。

***

### count?

> `optional` **count?**: `number`

带状层密度（0~1）。

#### Default

```ts
0.3
```

***

### direction?

> `optional` **direction?**: [`SensorFlowDirection`](PW.SensorFlowDirection.md)

流动方向。

- `forward` / `1`：正向（默认）
- `reverse` / `-1`：反向

说明：
- 这个字段是可选增强项
- 如果不写，默认会沿用内置流动材质的正向效果

***

### intervalColor?

> `optional` **intervalColor?**: [`DColor`](DColor.md)

间隔色（可选）。不传时将自动由波束填充色推导出更透明且略微加深的颜色。

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

流动效果材质（可选）。

- 可传颜色字符串或 Daisy 颜色对象，作为纯色材质
- 可传自定义材质，例如 `MaterialFactory.SpiralFlow(...)`
- 不传时使用默认回退：内部会基于波束 `color` 自动生成一套
 流动材质，并用补色工具自动推导 `spiralColor`
- 对常规链路/跟踪场景而言，通常直接省略这个字段就足够

***

### opacity?

> `optional` **opacity?**: `number`

透明度（0~1）。

#### Default

```ts
1.0
```

***

### speed?

> `optional` **speed?**: `number`

流速系数。

#### Default

```ts
1.0
```

***

### thickness?

> `optional` **thickness?**: `number`

带宽（0~1）。

#### Default

```ts
0.35
```
