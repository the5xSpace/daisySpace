[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimelineWidget

# Class: TimelineWidget

Displays the simulation time range and supports dragging the current time, panning, and zooming the visible interval.

Usually created automatically by the engine UI configuration; add it manually when an independent configuration is required.

## Example

```ts
const timeline = new Daisy.TimelineWidget({
 timeFormat: { preset: "date-time-ms", utcOffsetHours: 8 },
});
engine.addWidget(timeline);
timeline.zoomTo(engine.getStartTime(), engine.getStopTime());
```

## Extends

- [`Widget`](Widget.md)

## Constructors

### Constructor

> **new TimelineWidget**(`options?`): `TimelineWidget`

Creates the timeline widget; it is mounted only after calling `engine.addWidget()`.

#### Parameters

##### options?

[`TimelineWidgetOptions`](../interfaces/TimelineWidgetOptions.md) = `{}`

#### Returns

`TimelineWidget`

#### Overrides

[`Widget`](Widget.md).[`constructor`](Widget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Inherited from

[`Widget`](Widget.md).[`engine`](Widget.md#engine)

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`Widget`](Widget.md).[`id`](Widget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
The collection manager uses this to avoid destroyed singleton instances.

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.timeline"`

Widget identifier key, used for singleton deduplication.

#### Overrides

[`Widget`](Widget.md).[`key`](Widget.md#key)

***

### name?

> `optional` **name?**: `string`

#### Inherited from

[`Widget`](Widget.md).[`name`](Widget.md#name)

***

### rebuildOnMorph

> **rebuildOnMorph**: `boolean` = `false`

Whether to rebuild with destroy -> register when the scene morphs (2D/3D).
The default is true; UI widgets should usually set this to false.

#### Overrides

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

Whether this is a singleton widget.
- If true, only one instance with the same key can exist in the Engine.

#### Overrides

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

Whether to ignore this widget during camera aggregate observation.
UI controller widgets should set this to true.

#### Overrides

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Methods

### addHighlightRange()

> **addHighlightRange**(`color`, `heightInPx`, `base?`): [`TimelineHighlightRange`](TimelineHighlightRange.md)

Adds a description of a highlighted interval over the time bar.

After the object is returned, its start and stop times can be configured.

#### Parameters

##### color

`string`

##### heightInPx

`number`

##### base?

`number`

#### Returns

[`TimelineHighlightRange`](TimelineHighlightRange.md)

***

### addTrack()

> **addTrack**(`interval`, `heightInPx`, `color?`, `backgroundColor?`): [`TimelineTrack`](TimelineTrack.md)

Adds a time interval track.

#### Parameters

##### interval

The start and stop times covered by the track.

###### start

`JulianDate`

###### stop

`JulianDate`

##### heightInPx

`number`

Track height in pixels.

##### color?

`Color`

Interval color.

##### backgroundColor?

`Color`

Track background color.

#### Returns

[`TimelineTrack`](TimelineTrack.md)

***

### configureLabel()

> **configureLabel**(`timeFormat?`): `this`

Updates the local time label format and immediately redraws the ticks.

#### Parameters

##### timeFormat?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

#### Returns

`this`

***

### createIn2d()

> **createIn2d**(`_`): `void`

Creates Widget resources in 2D mode.
Subclasses should override this method to implement 2D-specific initialization logic, such as adding a Billboard or Label.

#### Parameters

##### \_

[`Engine`](Engine.md)

The engine instance.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Unregisters clock and interaction events, and removes the timeline node and track data.

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

Determines whether the current scene is in 3D mode.

#### Returns

`boolean`

Returns true for 3D mode and false otherwise.

#### Inherited from

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

***

### makeLabel()

> **makeLabel**(`time`): `string`

Formats the specified simulation time as a timeline label.

#### Parameters

##### time

`JulianDate`

#### Returns

`string`

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

Handles scene mode changes.
Triggered by an engine callback when the scene switches between 2D and 3D; subclasses can override it to implement adaptive behavior.

#### Parameters

##### \_

`SceneMode`

The scene mode after switching.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Removes the scene mode change listener.

#### Parameters

##### callback

(`mode`) => `void`

The callback to remove.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Registers a scene mode change listener.

#### Parameters

##### callback

(`mode`) => `void`

The callback invoked when the scene changes.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

Refreshes the time ticks and current-time indicator.

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

***

### refreshLabels()

> **refreshLabels**(): `void`

Regenerates the time tick labels using the current format.

#### Returns

`void`

***

### register()

> **register**(`engine`): `this`

Mounts the timeline in the engine view and synchronizes the engine clock.

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`this`

#### Overrides

[`Widget`](Widget.md).[`register`](Widget.md#register)

***

### resize()

> **resize**(): `void`

Relayouts the timeline based on the container size and total track height.

#### Returns

`void`

***

### update()

> **update**(`_`): `void`

Per-frame update callback.
Subclasses should override this method to implement frame-driven logic, such as position interpolation or state synchronization.

#### Parameters

##### \_

`JulianDate`

The current simulation time (JulianDate).

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`update`](Widget.md#update)

***

### updateFromClock()

> **updateFromClock**(): `void`

Synchronizes the current-time indicator and drag state from the engine clock.

#### Returns

`void`

***

### zoomFrom()

> **zoomFrom**(`amount`): `void`

Zooms the visible interval around the current cursor position; values greater than 1 expand the time span, while values less than 1 shrink it.

#### Parameters

##### amount

`number`

#### Returns

`void`

***

### zoomTo()

> **zoomTo**(`startTime`, `stopTime`): `void`

Adjusts the visible time range to the specified start and stop times.

#### Parameters

##### startTime

`JulianDate`

##### stopTime

`JulianDate`

#### Returns

`void`
