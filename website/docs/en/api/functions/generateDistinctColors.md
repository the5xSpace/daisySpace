[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / generateDistinctColors

# Function: generateDistinctColors()

> **generateDistinctColors**(`count`): `string`[]

Generates N visually distinct HSL colors using golden angle offset.

The golden angle (~137.508°) ensures adjacent colors are evenly distributed on the color wheel, avoiding color clustering.
Saturation and lightness are fixed (70%/55%), only hue rotates, suitable for use on dark backgrounds.

## Parameters

### count

`number`

Number of colors to generate

## Returns

`string`[]

HSL color string array, e.g., `["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", ...]`

## Example

```ts
const colors = Utils.generateDistinctColors(5);
// ["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", "hsl(275, 70%, 55%)", ...]

// 用于为列表项分配唯一颜色
items.forEach((item, i) => {
 item.color = colors[i % colors.length];
});
```
