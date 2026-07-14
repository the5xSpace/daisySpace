[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SimulationTimeWidgetOptions

# Type Alias: SimulationTimeWidgetOptions

> **SimulationTimeWidgetOptions** = `object`

仿真时间显示控件配置项。

## Example

```ts
const ui = engine.ui;
if (ui) new Daisy.SimulationTimeWidget(ui, ui.overlay, {
 preset: "rightBottom",
 theme: "dark",
 radius: "2xl",
 title: "SIM TIME",
 backgroundOpacity: 0.72,
 borderOpacity: 0.25,
 timeLabel: { preset: "date-time-ms", utcOffsetHours: 8 },
});
```

## Properties

### backgroundOpacity?

> `optional` **backgroundOpacity?**: `number`

背景透明度，范围建议为 0 至 1。

***

### border?

> `optional` **border?**: `boolean`

是否显示边框。默认 `true`。

***

### borderOpacity?

> `optional` **borderOpacity?**: `number`

边框透明度，范围建议为 0 至 1。

***

### className?

> `optional` **className?**: `string`

追加到控件根节点的 CSS 类名。

***

### offset?

> `optional` **offset?**: `object`

相对预设位置的像素偏移；默认 x 为 12、y 为 20。

#### x?

> `optional` **x?**: `number`

#### y?

> `optional` **y?**: `number`

***

### position?

> `optional` **position?**: `object`

自定义 CSS 定位；设置后忽略 `preset` 和 `offset`。

#### bottom?

> `optional` **bottom?**: `number` \| `string`

底部距离；数字按像素解释。

#### left?

> `optional` **left?**: `number` \| `string`

左侧距离；数字按像素解释。

#### right?

> `optional` **right?**: `number` \| `string`

右侧距离；数字按像素解释。

#### top?

> `optional` **top?**: `number` \| `string`

顶部距离；数字按像素解释。

#### transform?

> `optional` **transform?**: `string`

额外 CSS transform。

***

### preset?

> `optional` **preset?**: [`PanelPreset`](PanelPreset.md)

预设位置。默认 `rightBottom`。

***

### radius?

> `optional` **radius?**: [`SimulationTimeWidgetRadius`](SimulationTimeWidgetRadius.md)

圆角预设。默认 `xl`。

***

### theme?

> `optional` **theme?**: [`SimulationTimeWidgetTheme`](SimulationTimeWidgetTheme.md)

明暗主题。默认 `dark`。

***

### timeClassName?

> `optional` **timeClassName?**: `string`

追加到时间文本节点的 CSS 类名。

***

### timeLabel?

> `optional` **timeLabel?**: [`TimelineLabelOptions`](../interfaces/TimelineLabelOptions.md)

局部时间格式；未设置时使用引擎全局时间格式。

***

### title?

> `optional` **title?**: `string`

标题文本；空字符串不显示标题。

***

### titleClassName?

> `optional` **titleClassName?**: `string`

追加到标题节点的 CSS 类名。
