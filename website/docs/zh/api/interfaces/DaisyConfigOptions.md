[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyConfigOptions

# Interface: DaisyConfigOptions

Daisy Engine/UI 的全局默认配置项。

通过 `GlobalConfig.configure({
})` 设置后，会影响后续创建的实例。

## Properties

### animation?

> `optional` **animation?**: `boolean`

是否创建底层默认动画控件。默认 `false`。

***

### controlPanel?

> `optional` **controlPanel?**: `object`

控制面板配置。

#### customize?

> `optional` **customize?**: `string`[]

自定义模式下显示的控件标识列表。

#### draggable?

> `optional` **draggable?**: `boolean`

是否允许拖拽面板。默认 `true`。

#### layout?

> `optional` **layout?**: `"row"` \| `"column"`

控件排列方向。默认 `column`。

#### mode?

> `optional` **mode?**: `"lite"` \| `"standard"` \| `"customize"`

面板模式。

#### offset?

> `optional` **offset?**: `object`

相对预设位置的像素偏移。

##### offset.x?

> `optional` **x?**: `number`

##### offset.y?

> `optional` **y?**: `number`

#### preset?

> `optional` **preset?**: `"default"` \| `"center"` \| `"leftTop"` \| `"leftBottom"` \| `"leftCenter"` \| `"centerTop"` \| `"centerBottom"` \| `"rightTop"` \| `"rightBottom"` \| `"rightCenter"`

面板预设位置。默认 `leftBottom`。

#### speedMax?

> `optional` **speedMax?**: `number`

速度调节范围的最大值。

#### speedMin?

> `optional` **speedMin?**: `number`

速度调节范围的最小值。

#### speedPositiveOnly?

> `optional` **speedPositiveOnly?**: `boolean`

是否仅允许正向仿真速度。默认 `true`。

***

### creditContainer?

> `optional` **creditContainer?**: `string` \| `Element`

底层版权信息的显示容器；默认由 SDK 接管为隐藏容器。

***

### creditViewport?

> `optional` **creditViewport?**: `string` \| `Element`

底层版权信息弹层的挂载容器；默认由 SDK 接管为隐藏容器。

***

### defaultImagery?

> `optional` **defaultImagery?**: [`BuiltinImageryType`](../enums/BuiltinImageryType.md)

场景创建时使用的 SDK 内置影像；默认 `earth`，`natural-earth-ii` 为第二资源。

***

### disableCesiumIon?

> `optional` **disableCesiumIon?**: `boolean`

未配置 Ion 资产 访问凭据时，是否阻止访问该资源服务。默认 `true`。

***

### disableDaisyUI?

> `optional` **disableDaisyUI?**: `boolean`

是否禁用 Daisy UI。默认 `false`。

***

### disableOriginDefaultUI?

> `optional` **disableOriginDefaultUI?**: `boolean`

是否在创建场景时关闭底层默认界面。默认 `true`。

***

### hideDefaultToolbar?

> `optional` **hideDefaultToolbar?**: `boolean`

是否隐藏底层场景自带的工具栏、动画区和时间轴区域。默认 `true`。

***

### hideOriginCredit?

> `optional` **hideOriginCredit?**: `boolean`

是否隐藏底层场景自带的版权展示区域。默认 `true`。

***

### simulationTimeWidget?

> `optional` **simulationTimeWidget?**: `boolean` \| [`SimulationTimeWidgetOptions`](../types/SimulationTimeWidgetOptions.md)

仿真时间控件配置；`true` 使用默认配置，`false` 不创建。

***

### theme?

> `optional` **theme?**: `DaisyThemeOptions`

Daisy UI 主题配置。

***

### thirdPartyResources?

> `optional` **thirdPartyResources?**: [`ThirdPartyResourceOptions`](ThirdPartyResourceOptions.md)

Ion 资产、ArcGIS、OpenStreetMap 等第三方资源的全局授权与地址配置。

***

### timeFormat?

> `optional` **timeFormat?**: [`TimeFormatOptions`](TimeFormatOptions.md)

控件时间显示的全局默认格式。

各控件若设置了自己的 `timeFormat` / `timeLabel`，会优先使用局部配置。
未设置时使用此配置；默认使用 UTC。

***

### timeline?

> `optional` **timeline?**: `boolean`

是否显示底层时间轴组件。

说明：
- 底层时间轴组件会被创建以保证仿真时间行为一致
- 自 vNext 起 timeline 固定启用，该字段仅保留兼容，不再支持显式关闭

#### Default

```ts
true
```

***

### ~~timelineLabel?~~

> `optional` **timelineLabel?**: [`TimelineLabelOptions`](TimelineLabelOptions.md)

时间轴和时间控件的旧版格式化配置。

#### Deprecated

请优先使用 `timeFormat`；该字段仅保留兼容。

#### Example

```ts
Daisy.GlobalConfig.configure({
 timelineLabel: { preset: "iso-ms", utcOffsetHours: 0 },
});
```

***

### timelineStyle?

> `optional` **timelineStyle?**: `"none"` \| `"daisy"` \| `"native"`

时间轴样式；`none` 隐藏时间轴视图但不关闭时间系统。默认 `daisy`。

***

### uiMode?

> `optional` **uiMode?**: `"lite"` \| `"standard"` \| `"customize"`

UI 模式：精简、标准或自定义。默认 `standard`。

***

### watermark?

> `optional` **watermark?**: [`WatermarkWidgetOptions`](WatermarkWidgetOptions.md)

全局水印配置。
