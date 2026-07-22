[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttWidgetOptions

# Interface: TaskGanttWidgetOptions

TaskGanttWidget configuration options.

## Properties

### axisTimeFormat?

> `optional` **axisTimeFormat?**: [`TimeFormatConfig`](../types/TimeFormatConfig.md)

Gantt chart axis tick time format. Falls back to timeFormat / Engine global format when not set.

***

### bottom?

> `optional` **bottom?**: `string` \| `number`

Initial bottom position; when set, anchors the panel to the bottom.

***

### container?

> `optional` **container?**: `HTMLElement`

Mount container, defaults to appending to the engine container

***

### ~~formatTime?~~

> `optional` **formatTime?**: `TimeFormatter`

#### Deprecated

Please use timeFormat instead. This old interface is kept for compatibility.

***

### height?

> `optional` **height?**: `number`

Panel height (px), default 260

***

### maxScrollHeight?

> `optional` **maxScrollHeight?**: `number`

Maximum scroll height for task tracks (px), default 240.
The track becomes scrollable when there are many tasks; this value limits the maximum height.

***

### minHeight?

> `optional` **minHeight?**: `number`

Minimum height (px), default 180

***

### minPixelsPerMinute?

> `optional` **minPixelsPerMinute?**: `number`

Minimum pixel density (px / minute), default 1.
When below this value, it forcibly falls back to this threshold to prevent the timeline from being compressed too finely.

***

### minWidth?

> `optional` **minWidth?**: `number`

Minimum width (px), default 480

***

### mode?

> `optional` **mode?**: `"lite"` \| `"standard"`

Display mode: standard for full Gantt chart, lite for narrow overview.

***

### pixelsPerMinute?

> `optional` **pixelsPerMinute?**: `number`

Timeline pixel density (px / minute), default 18.
When the scene time is too long, the right-side bar area shows a horizontal scrollbar instead of continuing to compress.

***

### renderer?

> `optional` **renderer?**: [`TaskGanttRenderer`](../types/TaskGanttRenderer.md)

Custom render function (optional).

When set, replaces the default lit-html template rendering.

#### Example

```ts
new TaskGanttWidget(schedule, {
 renderer: (container, state) => {
 render(html`
 
 ${state.tasks.map(t => html`
 ${t.name}
 `)}
 
 `, container);
 }
});
```

***

### right?

> `optional` **right?**: `string` \| `number`

Initial right position; when set, anchors the panel to the right.

***

### tickCount?

> `optional` **tickCount?**: `number`

Number of timeline tick marks (optional), default 6.
Generates N evenly spaced tick labels on the timeline.

***

### timeFormat?

> `optional` **timeFormat?**: [`TimeFormatConfig`](../types/TimeFormatConfig.md)

Recommended time format configuration. Uses Engine's global timeFormat when not set.

***

### title?

> `optional` **title?**: `string`

Panel title, default "Timeline"

***

### width?

> `optional` **width?**: `string` \| `number`

Panel width, default 860.
Pass a number for px, pass a string as-is (e.g., "50%", "860px").

***

### x?

> `optional` **x?**: `number`

Initial horizontal position (px), default auto (CSS bottom-left).
When set, overrides the default `left: 12px` positioning.

***

### y?

> `optional` **y?**: `number`

Initial vertical position (px), default auto (CSS bottom-left).
When set, overrides the default `bottom: 12px` positioning.
