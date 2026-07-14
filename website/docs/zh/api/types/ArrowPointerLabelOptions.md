[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerLabelOptions

# Type Alias: ArrowPointerLabelOptions

> **ArrowPointerLabelOptions** = [`DaisyLabelOptions`](../interfaces/DaisyLabelOptions.md) & `object` \| `string`

箭头前端 label 配置。

该类型在 `DaisyLabelOptions` 的基础上要求必须提供 `text`。

## Example

```ts
const label: ArrowPointerLabelOptions = {
 text: "SUN",
 font: "16px sans-serif",
 fillColor: Daisy.Color.YELLOW,
};
```
