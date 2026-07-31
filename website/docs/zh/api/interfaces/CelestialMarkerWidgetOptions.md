[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialMarkerWidgetOptions

# Interface: CelestialMarkerWidgetOptions

## Properties

### custom?

> `optional` **custom?**: [`MarkerTarget`](MarkerTarget.md)[]

***

### ~~earth?~~

> `optional` **earth?**: `boolean`

#### Deprecated

请使用 `enabledBodies`。传入任意旧布尔字段时保留旧版“只启用显式 true 项”的语义。

***

### enabledBodies?

> `optional` **enabledBodies?**: readonly [`CelestialMarkerBody`](../enums/CelestialMarkerBody.md)[]

要启用的内置天体列表。传入后表示完整列表，不会再叠加默认天体。
未传入时默认启用太阳、月球、火星。

***

### font?

> `optional` **font?**: `string`

***

### ~~mars?~~

> `optional` **mars?**: `boolean`

#### Deprecated

请使用 `enabledBodies`。

***

### ~~moon?~~

> `optional` **moon?**: `boolean`

#### Deprecated

请使用 `enabledBodies`。

***

### pointSize?

> `optional` **pointSize?**: `number`

***

### showDistance?

> `optional` **showDistance?**: `number`

***

### ~~sun?~~

> `optional` **sun?**: `boolean`

#### Deprecated

请使用 `enabledBodies`。
