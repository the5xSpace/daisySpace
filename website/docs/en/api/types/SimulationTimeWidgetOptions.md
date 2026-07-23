[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SimulationTimeWidgetOptions

# Type Alias: SimulationTimeWidgetOptions

> **SimulationTimeWidgetOptions** = `object`

Configuration options for the simulation-time display widget.

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

Background opacity; a range from 0 to 1 is recommended.

***

### border?

> `optional` **border?**: `boolean`

Whether to show the border. Defaults to `true`.

***

### borderOpacity?

> `optional` **borderOpacity?**: `number`

Border opacity; a range from 0 to 1 is recommended.

***

### className?

> `optional` **className?**: `string`

CSS class name appended to the widget root node.

***

### offset?

> `optional` **offset?**: `object`

Pixel offset relative to the preset position; x defaults to 12 and y to 20.

#### x?

> `optional` **x?**: `number`

#### y?

> `optional` **y?**: `number`

***

### position?

> `optional` **position?**: `object`

Custom CSS positioning; when set, `preset` and `offset` are ignored.

#### bottom?

> `optional` **bottom?**: `number` \| `string`

Distance from the bottom; numeric values are interpreted as pixels.

#### left?

> `optional` **left?**: `number` \| `string`

Distance from the left; numeric values are interpreted as pixels.

#### right?

> `optional` **right?**: `number` \| `string`

Distance from the right; numeric values are interpreted as pixels.

#### top?

> `optional` **top?**: `number` \| `string`

Distance from the top; numeric values are interpreted as pixels.

#### transform?

> `optional` **transform?**: `string`

Additional CSS transform.

***

### preset?

> `optional` **preset?**: [`PanelPreset`](PanelPreset.md)

Preset position. Defaults to `rightBottom`.

***

### radius?

> `optional` **radius?**: [`SimulationTimeWidgetRadius`](SimulationTimeWidgetRadius.md)

Corner-radius preset. Defaults to `xl`.

***

### theme?

> `optional` **theme?**: [`SimulationTimeWidgetTheme`](SimulationTimeWidgetTheme.md)

Light or dark theme. Defaults to `dark`.

***

### timeClassName?

> `optional` **timeClassName?**: `string`

CSS class name appended to the time-text node.

***

### timeLabel?

> `optional` **timeLabel?**: [`TimelineLabelOptions`](../interfaces/TimelineLabelOptions.md)

Local time format; when unset, the Engine's global time format is used.

***

### title?

> `optional` **title?**: `string`

Title text; an empty string hides the title.

***

### titleClassName?

> `optional` **titleClassName?**: `string`

CSS class name appended to the title node.
