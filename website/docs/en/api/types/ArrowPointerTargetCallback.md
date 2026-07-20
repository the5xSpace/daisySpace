[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerTargetCallback

# Type Alias: ArrowPointerTargetCallback

> **ArrowPointerTargetCallback** = (`entity`, `time`) => `Daisy.Cartesian3` \| `undefined`

Target types available for ArrowPointerFeature.

- `Daisy.Cartesian3`: static coordinate point
- `Entity`: Daisy entity (internally converted to a callback, gets its current position each frame)
- `Entity`: entity (internally converted to a callback, uses `position.getValue(time)` / `getValueInReferenceFrame` each frame)
- `ArrowPointerTargetCallback`: callback function (the caller computes the target position)

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
