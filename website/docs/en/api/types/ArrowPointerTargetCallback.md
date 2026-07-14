[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerTargetCallback

# Type Alias: ArrowPointerTargetCallback

> **ArrowPointerTargetCallback** = (`entity`, `time`) => `Daisy.Cartesian3` \| `undefined`

ArrowPointerFeature 可用的指向目标类型。

- `Daisy.Cartesian3`：静态坐标点
- `Entity`：Daisy 实体（内部会转成回调，每帧取其当前位置）
- `Entity`： 实体（内部会转成回调，每帧用 `position.getValue(time)` / `getValueInReferenceFrame`）
- `ArrowPointerTargetCallback`：回调函数（由使用方自行计算目标位置）

## Parameters

### entity

[`Entity`](../classes/Entity.md)

### time

`Daisy.JulianDate`

## Returns

`Daisy.Cartesian3` \| `undefined`

## Example

```ts
const target: ArrowPointerTarget = ArrowPointerFeature.targetSun;
```
