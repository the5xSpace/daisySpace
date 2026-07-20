[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatters

# Variable: TimeFormatters

> `const` **TimeFormatters**: `object`

Common time format configuration constructor.

## Type Declaration

### beijingTime

> **beijingTime**: (`options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

Beijing time (UTC+8). Short alias: bjt.

#### Parameters

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"utcOffsetHours"` \| `"timezoneName"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### bjt

> **bjt**: (`options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md) = `beijingTime`

#### Parameters

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"utcOffsetHours"` \| `"timezoneName"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### coordinatedUniversalTime

> **coordinatedUniversalTime**: (`options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

Coordinated Universal Time. Short alias: utc.

#### Parameters

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"utcOffsetHours"` \| `"timezoneName"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### elapsedSeconds

> **elapsedSeconds**: (`t0`, `options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

Cumulative seconds relative to T0. Short alias: t0.

#### Parameters

##### t0

[`TimeFormatInput`](../types/TimeFormatInput.md)

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"t0"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### t0

> **t0**: (`t0`, `options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md) = `elapsedSeconds`

#### Parameters

##### t0

[`TimeFormatInput`](../types/TimeFormatInput.md)

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"t0"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### utc

> **utc**: (`options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md) = `coordinatedUniversalTime`

#### Parameters

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"utcOffsetHours"` \| `"timezoneName"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### custom()

> **custom**(`formatter`, `options?`): [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

Creates a format configuration using a custom callback.

#### Parameters

##### formatter

[`TimeFormatCallback`](../types/TimeFormatCallback.md)

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"formatter"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)
