[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / generateDistinctColors

# Function: generateDistinctColors()

> **generateDistinctColors**(`count`): `string`[]

使用黄金角偏移生成 N 个视觉区分度高的 HSL 颜色。

黄金角（~137.508°）确保相邻颜色在色环上均匀分布，避免颜色聚集。
饱和度和亮度固定（70%/55%），仅旋转色相，适合在深色背景上使用。

## Parameters

### count

`number`

生成颜色数量

## Returns

`string`[]

HSL 颜色字符串数组，如 `["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", ...]`

## Example

```ts
const colors = Utils.generateDistinctColors(5);
// ["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", "hsl(275, 70%, 55%)", ...]

// 用于为列表项分配唯一颜色
items.forEach((item, i) => {
 item.color = colors[i % colors.length];
});
```
