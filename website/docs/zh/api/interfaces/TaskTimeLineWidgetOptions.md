[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskTimeLineWidgetOptions

# Interface: TaskTimeLineWidgetOptions

任务时间线控件配置。

## Properties

### bottom?

> `optional` **bottom?**: `string` \| `number`

自定义定位时相对容器底部的距离；数字按像素解释，也可传 CSS 长度。

***

### container?

> `optional` **container?**: `HTMLElement`

控件挂载容器；未设置时挂载到引擎视图容器。

***

### ~~formatTime?~~

> `optional` **formatTime?**: [`TimeFormatter`](../types/TimeFormatter.md)

#### Deprecated

请优先使用 `timeFormat`；该函数会完整覆盖全局时间格式。

***

### height?

> `optional` **height?**: `number`

面板最小初始高度，单位为像素。标准模式默认 180，精简模式默认 260。

***

### maxScrollHeight?

> `optional` **maxScrollHeight?**: `number`

任务列表的最大滚动高度，单位为像素。

***

### minHeight?

> `optional` **minHeight?**: `number`

用户缩放面板时允许的最小高度，单位为像素。

***

### minWidth?

> `optional` **minWidth?**: `number`

用户缩放面板时允许的最小宽度，单位为像素。

***

### mode?

> `optional` **mode?**: `"lite"` \| `"standard"`

显示模式。默认 `standard`。

***

### onStepClick?

> `optional` **onStepClick?**: (`task`) => `void`

点击任务步骤时触发，参数为调度器中的原始任务对象。

#### Parameters

##### task

[`TimeTask`](../classes/TimeTask.md)

#### Returns

`void`

***

### renderer?

> `optional` **renderer?**: [`TaskStepListRenderer`](../types/TaskStepListRenderer.md)

自定义列表渲染器；未设置时使用控件内置模板。

***

### right?

> `optional` **right?**: `string` \| `number`

自定义定位时相对容器右侧的距离；数字按像素解释，也可传 CSS 长度。

***

### timeFormat?

> `optional` **timeFormat?**: [`TimeFormatConfig`](../types/TimeFormatConfig.md)

局部时间格式；未设置时使用引擎的全局 `timeFormat`。

***

### title?

> `optional` **title?**: `string`

面板标题。默认 `任务进度`。

***

### width?

> `optional` **width?**: `string` \| `number`

面板宽度；数字按像素解释，也可传 CSS 长度。标准模式默认 320，精简模式默认 220。

***

### x?

> `optional` **x?**: `number`

自定义定位时相对容器左侧的像素距离。

***

### y?

> `optional` **y?**: `number`

自定义定位时相对容器顶部的像素距离。
