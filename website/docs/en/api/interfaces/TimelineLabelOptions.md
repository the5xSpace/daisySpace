[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimelineLabelOptions

# Interface: TimelineLabelOptions

时间轴刻度文本格式化配置。

## Extends

- [`TimeFormatOptions`](TimeFormatOptions.md)

## Properties

### format?

> `optional` **format?**: `string`

自定义 token 格式，优先级高于预设的默认格式。

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`format`](TimeFormatOptions.md#format)

***

### formatter?

> `optional` **formatter?**: [`TimeFormatCallback`](../types/TimeFormatCallback.md)

自定义格式化函数（优先级最高，参数为 DateTime 对象）

#### Overrides

[`TimeFormatOptions`](TimeFormatOptions.md).[`formatter`](TimeFormatOptions.md#formatter)

***

### preset?

> `optional` **preset?**: [`TimeFormatPreset`](../types/TimeFormatPreset.md)

使用内置格式预设

#### Overrides

[`TimeFormatOptions`](TimeFormatOptions.md).[`preset`](TimeFormatOptions.md#preset)

***

### t0?

> `optional` **t0?**: [`TimeFormatInput`](../types/TimeFormatInput.md)

`t0` 模式的参考时刻；未设置时相对秒数按 `0` 输出。

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`t0`](TimeFormatOptions.md#t0)

***

### t0Label?

> `optional` **t0Label?**: `string`

`t0` 文本前缀。默认 `T`。

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`t0Label`](TimeFormatOptions.md#t0label)

***

### t0ShowMilliseconds?

> `optional` **t0ShowMilliseconds?**: `boolean`

`t0` 累计秒是否保留三位小数。默认 `false`。

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`t0ShowMilliseconds`](TimeFormatOptions.md#t0showmilliseconds)

***

### timezoneName?

> `optional` **timezoneName?**: `string`

`TZ` token 的显示名，例如 `BJT`。

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`timezoneName`](TimeFormatOptions.md#timezonename)

***

### utcOffsetHours?

> `optional` **utcOffsetHours?**: `number`

相对 UTC 的时区偏移小时数，例如北京时间为 `8`。

#### Inherited from

[`TimeFormatOptions`](TimeFormatOptions.md).[`utcOffsetHours`](TimeFormatOptions.md#utcoffsethours)
