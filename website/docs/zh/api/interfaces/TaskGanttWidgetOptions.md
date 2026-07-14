[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttWidgetOptions

# Interface: TaskGanttWidgetOptions

TaskGanttWidget 配置项。

## Properties

### axisTimeFormat?

> `optional` **axisTimeFormat?**: [`TimeFormatConfig`](../types/TimeFormatConfig.md)

甘特图轴刻度时间格式。未设置时跟随 timeFormat / Engine 全局格式。

***

### bottom?

> `optional` **bottom?**: `string` \| `number`

初始底部位置，设置后可让面板按底部锚定。

***

### container?

> `optional` **container?**: `HTMLElement`

挂载容器，默认追加到 engine 容器

***

### ~~formatTime?~~

> `optional` **formatTime?**: `TimeFormatter`

#### Deprecated

请优先使用 timeFormat。该旧接口仍保留兼容。

***

### height?

> `optional` **height?**: `number`

面板高度（px），默认 260

***

### maxScrollHeight?

> `optional` **maxScrollHeight?**: `number`

任务轨道最大滚动高度（px），默认 240。
任务数量多时轨道可滚动，此值限制最大高度。

***

### minHeight?

> `optional` **minHeight?**: `number`

最小高度（px），默认 180

***

### minPixelsPerMinute?

> `optional` **minPixelsPerMinute?**: `number`

最小像素密度（px / 分钟），默认 1。
低于这个值时会强制回退到该阈值，避免时间轴被压得过细。

***

### minWidth?

> `optional` **minWidth?**: `number`

最小宽度（px），默认 480

***

### mode?

> `optional` **mode?**: `"lite"` \| `"standard"`

显示模式：standard 为完整甘特图，lite 为窄版概览。

***

### pixelsPerMinute?

> `optional` **pixelsPerMinute?**: `number`

时间轴像素密度（px / 分钟），默认 18。
场景时间过长时，右侧条块区域会出现横向滚动条，而不是继续压缩。

***

### renderer?

> `optional` **renderer?**: [`TaskGanttRenderer`](../types/TaskGanttRenderer.md)

自定义渲染函数（可选）。

设置后会替换默认的 lit-html 模板渲染。

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

初始右侧位置，设置后可让面板按右侧锚定。

***

### tickCount?

> `optional` **tickCount?**: `number`

时间轴刻度数量（可选），默认 6。
在时间轴上均匀生成 N 个刻度标签。

***

### timeFormat?

> `optional` **timeFormat?**: [`TimeFormatConfig`](../types/TimeFormatConfig.md)

推荐的时间格式配置。未设置时使用 Engine 的全局 timeFormat。

***

### title?

> `optional` **title?**: `string`

面板标题，默认 "时间线"

***

### width?

> `optional` **width?**: `string` \| `number`

面板宽度，默认 860。
传数字视为 px，传字符串原样应用（如 "50%"、"860px"）。

***

### x?

> `optional` **x?**: `number`

初始水平位置（px），默认 auto（CSS 底部靠左）。
设置后覆盖默认的 `left: 12px` 定位。

***

### y?

> `optional` **y?**: `number`

初始垂直位置（px），默认 auto（CSS 底部靠左）。
设置后覆盖默认的 `bottom: 12px` 定位。
