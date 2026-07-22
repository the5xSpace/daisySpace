[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ZIndexManager

# Class: ZIndexManager

A unified z-index management hierarchy manager.

All UI Widgets register panel elements through this singleton, which automatically assigns incremental values;
when clicking or dragging, call `elevate()` to bring the corresponding component to the topmost layer.

## Methods

### elevate()

> **elevate**(`id`): `void`

Elevates the specified widget's z-index to the current highest level.

Suitable for interaction events like mousedown / click / drag.

#### Parameters

##### id

`string`

#### Returns

`void`

***

### getCurrentZIndex()

> **getCurrentZIndex**(`id`): `number` \| `undefined`

Gets the widget's current z-index (for debugging or special scenarios).

#### Parameters

##### id

`string`

#### Returns

`number` \| `undefined`

***

### register()

> **register**(`id`, `panel`, `miniIcon?`): `number`

Registers a widget's panel element (and an optional minimized icon).

#### Parameters

##### id

`string`

Unique widget identifier (recommended to use `widget.key`)

##### panel

`HTMLElement`

Panel DOM element

##### miniIcon?

`HTMLElement`

Minimized floating icon DOM element (optional)

#### Returns

`number`

The assigned z-index value

***

### unregister()

> **unregister**(`id`): `void`

Unregisters a widget (call on destroy).

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
