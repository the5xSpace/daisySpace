[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatOptions

# Interface: TimeFormatOptions

## Extended by

- [`TimelineLabelOptions`](TimelineLabelOptions.md)

## Properties

### format?

> `optional` **format?**: `string`

自定义 token 格式，优先级高于预设的默认格式。

***

### formatter?

> `optional` **formatter?**: [`TimeFormatCallback`](../types/TimeFormatCallback.md)

自定义格式化函数；设置后优先于 `preset` 和 `format`。

***

### preset?

> `optional` **preset?**: [`TimeFormatPreset`](../types/TimeFormatPreset.md)

使用内置预设。默认 `utc`。

***

### t0?

> `optional` **t0?**: [`TimeFormatInput`](../types/TimeFormatInput.md)

`t0` 模式的参考时刻；未设置时相对秒数按 `0` 输出。

***

### t0Label?

> `optional` **t0Label?**: `string`

`t0` 文本前缀。默认 `T`。

***

### t0ShowMilliseconds?

> `optional` **t0ShowMilliseconds?**: `boolean`

`t0` 累计秒是否保留三位小数。默认 `false`。

***

### timezoneName?

> `optional` **timezoneName?**: `string`

`TZ` token 的显示名，例如 `BJT`。

***

### utcOffsetHours?

> `optional` **utcOffsetHours?**: `number`

相对 UTC 的时区偏移小时数，例如北京时间为 `8`。
