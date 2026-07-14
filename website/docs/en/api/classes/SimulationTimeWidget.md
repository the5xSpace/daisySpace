[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SimulationTimeWidget

# Class: SimulationTimeWidget

独立的仿真时间显示控件，仅显示当前仿真时间。

- 支持 preset 位置预设（与控制面板一致）
- 支持任意 position 覆盖（left/top/right/bottom/transform）
- 支持亮/暗主题、圆角、边框与背景透明度、额外 className

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

创建并挂载仿真时间控件，同时开始监听仿真时钟。

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

控件根节点。

## Methods

### destroy()

> **destroy**(): `void`

解除时钟监听、拖拽和层级管理，并移除控件节点。

#### Returns

`void`

***

### refresh()

> **refresh**(): `void`

立即按当前仿真时刻刷新显示文本。

#### Returns

`void`

***

### setTitle()

> **setTitle**(`title`): `this`

更新标题；传入空字符串会隐藏标题节点。

#### Parameters

##### title

`string`

#### Returns

`this`
