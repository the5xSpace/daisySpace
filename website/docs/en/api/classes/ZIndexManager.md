[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ZIndexManager

# Class: ZIndexManager

统一的 z-index 管理层级管理器。

所有 UI Widget 通过该单例注册面板元素，自动分配递增值；
点击或拖拽时调用 `elevate()` 将对应组件提升到最顶层。

## Methods

### elevate()

> **elevate**(`id`): `void`

将指定 widget 的 z-index 提升到当前最高层级。

适用于 mousedown / click / drag 等交互事件。

#### Parameters

##### id

`string`

#### Returns

`void`

***

### getCurrentZIndex()

> **getCurrentZIndex**(`id`): `number` \| `undefined`

获取 widget 当前的 z-index（用于调试或特殊场景）。

#### Parameters

##### id

`string`

#### Returns

`number` \| `undefined`

***

### register()

> **register**(`id`, `panel`, `miniIcon?`): `number`

注册一个 widget 的面板元素（及可选的最小化图标）。

#### Parameters

##### id

`string`

widget 唯一标识（推荐使用 `widget.key`）

##### panel

`HTMLElement`

面板 DOM 元素

##### miniIcon?

`HTMLElement`

最小化悬浮图标 DOM 元素（可选）

#### Returns

`number`

分配的 z-index 值

***

### unregister()

> **unregister**(`id`): `void`

注销 widget（销毁时调用）。

#### Parameters

##### id

`string`

#### Returns

`void`

***

### getInstance()

> `static` **getInstance**(): `ZIndexManager`

#### Returns

`ZIndexManager`
