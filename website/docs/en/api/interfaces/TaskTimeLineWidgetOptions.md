[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskTimeLineWidgetOptions

# Interface: TaskTimeLineWidgetOptions

Task timeline widget configuration.

## Properties

### bottom?

> `optional` **bottom?**: `string` \| `number`

Distance from the bottom of the container for custom positioning; numbers are interpreted as pixels, CSS lengths are also accepted.

***

### container?

> `optional` **container?**: `HTMLElement`

Widget mount container; when unset, mounts to the engine view container.

***

### ~~formatTime?~~

> `optional` **formatTime?**: [`TimeFormatter`](../types/TimeFormatter.md)

#### Deprecated

Please use `timeFormat` instead; this function will completely override the global time format.

***

### height?

> `optional` **height?**: `number`

Panel minimum initial height, in pixels. Standard mode defaults to 180, lite mode defaults to 260.

***

### maxScrollHeight?

> `optional` **maxScrollHeight?**: `number`

Maximum scroll height of the task list, in pixels.

***

### minHeight?

> `optional` **minHeight?**: `number`

Minimum height allowed when the user resizes the panel, in pixels.

***

### minWidth?

> `optional` **minWidth?**: `number`

Minimum width allowed when the user resizes the panel, in pixels.

***

### mode?

> `optional` **mode?**: `"lite"` \| `"standard"`

Display mode. Defaults to `standard`.

***

### onStepClick?

> `optional` **onStepClick?**: (`task`) => `void`

Triggered when a task step is clicked; the parameter is the raw task object from the scheduler.

#### Parameters

##### task

[`TimeTask`](../classes/TimeTask.md)

#### Returns

`void`

***

### renderer?

> `optional` **renderer?**: [`TaskStepListRenderer`](../types/TaskStepListRenderer.md)

Custom list renderer; when unset, uses the widget's built-in template.

***

### right?

> `optional` **right?**: `string` \| `number`

Distance from the right of the container for custom positioning; numbers are interpreted as pixels, CSS lengths are also accepted.

***

### timeFormat?

> `optional` **timeFormat?**: [`TimeFormatConfig`](../types/TimeFormatConfig.md)

Local time format; when unset, uses the engine's global `timeFormat`.

***

### title?

> `optional` **title?**: `string`

Panel title. Defaults to `任务进度`.

***

### width?

> `optional` **width?**: `string` \| `number`

Panel width; numbers are interpreted as pixels, CSS lengths are also accepted. Standard mode defaults to 320, lite mode defaults to 220.

***

### x?

> `optional` **x?**: `number`

Pixel distance from the left of the container for custom positioning.

***

### y?

> `optional` **y?**: `number`

Pixel distance from the top of the container for custom positioning.
