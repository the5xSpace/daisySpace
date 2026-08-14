[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyConfigOptions

# Interface: DaisyConfigOptions

Global defaults for the Daisy Engine and UI.

After `GlobalConfig.configure({
})` is called, the settings affect subsequently created instances.

## Properties

### animation?

> `optional` **animation?**: `boolean`

Whether to create the underlying default animation widget. Defaults to `false`.

***

### controlPanel?

> `optional` **controlPanel?**: `object`

Control panel configuration.

#### customize?

> `optional` **customize?**: `string`[]

List of widget identifiers shown in customize mode.

#### draggable?

> `optional` **draggable?**: `boolean`

Whether the panel can be dragged. Defaults to `true`.

#### layout?

> `optional` **layout?**: `"row"` \| `"column"`

Widget layout direction. Defaults to `column`.

#### mode?

> `optional` **mode?**: `"lite"` \| `"standard"` \| `"customize"`

Panel mode.

#### offset?

> `optional` **offset?**: `object`

Pixel offset relative to the preset position.

##### offset.x?

> `optional` **x?**: `number`

##### offset.y?

> `optional` **y?**: `number`

#### preset?

> `optional` **preset?**: `"default"` \| `"center"` \| `"leftTop"` \| `"leftBottom"` \| `"leftCenter"` \| `"centerTop"` \| `"centerBottom"` \| `"rightTop"` \| `"rightBottom"` \| `"rightCenter"`

Panel preset position. Defaults to `leftBottom`.

#### speedMax?

> `optional` **speedMax?**: `number`

Maximum value for the speed-control range.

#### speedMin?

> `optional` **speedMin?**: `number`

Minimum value for the speed-control range.

#### speedPositiveOnly?

> `optional` **speedPositiveOnly?**: `boolean`

Whether to allow only positive simulation speeds. Defaults to `true`.

***

### creditContainer?

> `optional` **creditContainer?**: `string` \| `Element`

Container for displaying underlying provider credits; the SDK uses a hidden container by default.

***

### creditViewport?

> `optional` **creditViewport?**: `string` \| `Element`

Container for mounting the underlying provider credit popup; the SDK uses a hidden container by default.

***

### defaultImagery?

> `optional` **defaultImagery?**: [`BuiltinImageryType`](../enums/BuiltinImageryType.md)

SDK built-in imagery used when creating a scene; defaults to `earth`, with `natural-earth-ii` as the second resource.

***

### disableCesiumIon?

> `optional` **disableCesiumIon?**: `boolean`

Whether to block access to Ion asset services when no access credential is configured. Defaults to `true`.

***

### disableDaisyUI?

> `optional` **disableDaisyUI?**: `boolean`

Whether to disable Daisy UI. Defaults to `false`.

***

### disableOriginDefaultUI?

> `optional` **disableOriginDefaultUI?**: `boolean`

Whether to disable the underlying default UI when creating a scene. Defaults to `true`.

***

### hideDefaultToolbar?

> `optional` **hideDefaultToolbar?**: `boolean`

Whether to hide the underlying scene toolbar, animation area, and timeline area. Defaults to `true`.

***

### hideOriginCredit?

> `optional` **hideOriginCredit?**: `boolean`

Whether to hide the underlying scene credit area. Defaults to `true`.

***

### simulationTimeWidget?

> `optional` **simulationTimeWidget?**: `boolean` \| [`SimulationTimeWidgetOptions`](../types/SimulationTimeWidgetOptions.md)

Simulation time widget configuration; `true` uses the default configuration and `false` prevents creation.

***

### theme?

> `optional` **theme?**: `DaisyThemeOptions`

Daisy UI theme configuration.

***

### thirdPartyResources?

> `optional` **thirdPartyResources?**: [`ThirdPartyResourceOptions`](ThirdPartyResourceOptions.md)

Global authorization and URL configuration for Ion assets, ArcGIS, OpenStreetMap, and other third-party resources.

***

### timeFormat?

> `optional` **timeFormat?**: [`TimeFormatOptions`](TimeFormatOptions.md)

Global default format for widget time display.

If a widget sets its own `timeFormat` / `timeLabel`, the local setting takes precedence.
Otherwise, this setting is used; the default is UTC.

***

### timeline?

> `optional` **timeline?**: `boolean`

Whether to show the underlying timeline component.

Note:
- The underlying timeline component is created to keep simulation-time behavior consistent.
- Starting with vNext, timeline is always enabled; this field is retained for compatibility and can no longer explicitly disable it.

#### Default

```ts
true
```

***

### ~~timelineLabel?~~

> `optional` **timelineLabel?**: [`TimelineLabelOptions`](TimelineLabelOptions.md)

Legacy formatting configuration for the timeline and time widgets.

#### Deprecated

Prefer `timeFormat`; this field is retained for compatibility only.

#### Example

```ts
Daisy.GlobalConfig.configure({
 timelineLabel: { preset: "iso-ms", utcOffsetHours: 0 },
});
```

***

### timelineStyle?

> `optional` **timelineStyle?**: `"none"` \| `"daisy"` \| `"native"`

Timeline style; `none` hides the timeline view without disabling the time system. Defaults to `daisy`.

***

### uiMode?

> `optional` **uiMode?**: `"lite"` \| `"standard"` \| `"customize"`

UI mode: lite, standard, or customize. Defaults to `standard`.

***

### watermark?

> `optional` **watermark?**: [`WatermarkWidgetOptions`](WatermarkWidgetOptions.md)

Global watermark configuration.
