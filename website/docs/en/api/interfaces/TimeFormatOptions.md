[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatOptions

# Interface: TimeFormatOptions

## Extended by

- [`TimelineLabelOptions`](TimelineLabelOptions.md)

## Properties

### format?

> `optional` **format?**: `string`

Custom token format, takes precedence over default preset format.

***

### formatter?

> `optional` **formatter?**: [`TimeFormatCallback`](../types/TimeFormatCallback.md)

Custom formatting function; takes precedence over `preset` and `format`.

***

### preset?

> `optional` **preset?**: [`TimeFormatPreset`](../types/TimeFormatPreset.md)

Uses built-in preset. Defaults to `utc`.

***

### t0?

> `optional` **t0?**: [`TimeFormatInput`](../types/TimeFormatInput.md)

Reference time for `t0` mode; relative seconds output as `0` when not set.

***

### t0Label?

> `optional` **t0Label?**: `string`

`t0` text prefix. Defaults to `T`.

***

### t0ShowMilliseconds?

> `optional` **t0ShowMilliseconds?**: `boolean`

Whether `t0` cumulative seconds retain three decimal places. Defaults to `false`.

***

### timezoneName?

> `optional` **timezoneName?**: `string`

Display name for the `TZ` token, e.g., `BJT`.

***

### utcOffsetHours?

> `optional` **utcOffsetHours?**: `number`

Timezone offset hours from UTC, e.g., Beijing time is `8`.
