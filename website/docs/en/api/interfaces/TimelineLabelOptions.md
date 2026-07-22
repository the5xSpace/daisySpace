[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimelineLabelOptions

# Interface: TimelineLabelOptions

Timeline tick label formatting configuration.

## Extends

- [`TimeFormatOptions`](TimeFormatOptions.md)

## Properties

### format?

> `optional` **format?**: `string`

Custom token format, with higher priority than the default preset format.

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`format`](TimeFormatOptions.md#format)

***

### formatter?

> `optional` **formatter?**: [`TimeFormatCallback`](../types/TimeFormatCallback.md)

Custom formatting function (highest priority, parameter is a DateTime object)

#### Overrides

[`TimeFormatOptions`](TimeFormatOptions.md).[`formatter`](TimeFormatOptions.md#formatter)

***

### preset?

> `optional` **preset?**: [`TimeFormatPreset`](../types/TimeFormatPreset.md)

Use a built-in format preset

#### Overrides

[`TimeFormatOptions`](TimeFormatOptions.md).[`preset`](TimeFormatOptions.md#preset)

***

### t0?

> `optional` **t0?**: [`TimeFormatInput`](../types/TimeFormatInput.md)

Reference time for `t0` mode; when not set, relative seconds output as `0`.

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`t0`](TimeFormatOptions.md#t0)

***

### t0Label?

> `optional` **t0Label?**: `string`

`t0` text prefix. Default `T`.

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`t0Label`](TimeFormatOptions.md#t0label)

***

### t0ShowMilliseconds?

> `optional` **t0ShowMilliseconds?**: `boolean`

Whether to keep three decimal places for `t0` cumulative seconds. Default `false`.

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`t0ShowMilliseconds`](TimeFormatOptions.md#t0showmilliseconds)

***

### timezoneName?

> `optional` **timezoneName?**: `string`

Display name for the `TZ` token, e.g., `BJT`.

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`timezoneName`](TimeFormatOptions.md#timezonename)

***

### utcOffsetHours?

> `optional` **utcOffsetHours?**: `number`

Time zone offset hours relative to UTC, e.g., Beijing time is `8`.

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`utcOffsetHours`](TimeFormatOptions.md#utcoffsethours)
