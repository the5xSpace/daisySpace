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

Use `enabledBodies`. When any legacy boolean field is provided, the legacy behavior of enabling only fields explicitly set to true is preserved.

***

### enabledBodies?

> `optional` **enabledBodies?**: readonly [`CelestialMarkerBody`](../enums/CelestialMarkerBody.md)[]

The complete list of built-in celestial bodies to enable. When provided, it replaces the defaults rather than adding to them.
When omitted, Sun, Moon, and Mars are enabled by default.

***

### font?

> `optional` **font?**: `string`

***

### ~~mars?~~

> `optional` **mars?**: `boolean`

#### Deprecated

Use `enabledBodies`.

***

### ~~moon?~~

> `optional` **moon?**: `boolean`

#### Deprecated

Use `enabledBodies`.

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

Use `enabledBodies`.
