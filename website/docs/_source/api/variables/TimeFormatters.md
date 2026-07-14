[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatters

# Variable: TimeFormatters

> `const` **TimeFormatters**: `object`

常用时间格式配置构造器。

## Type Declaration

### beijingTime

> **beijingTime**: (`options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

北京时间（UTC+8）。短别名：bjt。

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

协调世界时。短别名：utc。

#### Parameters

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"preset"` \| `"utcOffsetHours"` \| `"timezoneName"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

### elapsedSeconds

> **elapsedSeconds**: (`t0`, `options`) => [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

相对 T0 的累计秒。短别名：t0。

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

创建使用自定义回调的格式配置。

#### Parameters

##### formatter

[`TimeFormatCallback`](../types/TimeFormatCallback.md)

##### options?

`Omit`\<[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md), `"formatter"`\> = `{}`

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)
