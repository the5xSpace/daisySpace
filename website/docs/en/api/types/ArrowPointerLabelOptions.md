[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerLabelOptions

# Type Alias: ArrowPointerLabelOptions

> **ArrowPointerLabelOptions** = [`DaisyLabelOptions`](../interfaces/DaisyLabelOptions.md) & `object` \| `string`

Arrow tip label configuration.

This type extends `DaisyLabelOptions` and requires that `text` be provided.

## Example

```ts
const label: ArrowPointerLabelOptions = {
 text: "SUN",
 font: "16px sans-serif",
 fillColor: Daisy.Color.YELLOW,
};
```
