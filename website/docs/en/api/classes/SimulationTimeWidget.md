[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SimulationTimeWidget

# Class: SimulationTimeWidget

A standalone simulation time display widget that shows only the current simulation time.

- Supports preset position presets (consistent with the control panel)
- Supports arbitrary position overrides (left/top/right/bottom/transform)
- Supports light/dark themes, rounded corners, borders, background opacity, and extra className

## Example

```ts
const ui = engine.ui;
if (ui) {
 const widget = new Daisy.SimulationTimeWidget(ui, ui.overlay, {
 preset: "centerTop",
 title: "SIM TIME",
 timeLabel: { format: "YYYY-MM-DD HH:mm:ss.SSS TZ", utcOffsetHours: 0 },
 });
}
```

## Constructors

### Constructor

> **new SimulationTimeWidget**(`daisy`, `mount`, `opts?`): `SimulationTimeWidget`

Creates and mounts the simulation time widget, and starts listening to the simulation clock.

#### Parameters

##### daisy

`DaisyUIManager`

##### mount

`HTMLElement`

##### opts?

[`SimulationTimeWidgetOptions`](../types/SimulationTimeWidgetOptions.md) = `{}`

#### Returns

`SimulationTimeWidget`

## Properties

### element

> **element**: `HTMLDivElement`

Root node of the widget.

## Methods

### destroy()

> **destroy**(): `void`

Removes clock listening, dragging, and z-order management, and removes the widget node.

#### Returns

`void`

***

### refresh()

> **refresh**(): `void`

Immediately refreshes the displayed text to the current simulation time.

#### Returns

`void`

***

### setTitle()

> **setTitle**(`title`): `this`

Updates the title; passing an empty string hides the title node.

#### Parameters

##### title

`string`

#### Returns

`this`
