[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatDateTime

# Interface: TimeFormatDateTime

提供给自定义格式化函数的完整日期时间上下文。

## Extends

- [`TimeFormatParts`](TimeFormatParts.md)

## Properties

### date

> **date**: `Date`

按目标时区偏移后的副本，读取时应使用 UTC 系列取值方法。

***

### day

> **day**: `number`

月内日期，范围为 1 至 31。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`day`](TimeFormatParts.md#day)

***

### format

> **format**: (`pattern?`) => `string`

使用当前上下文按 token 模式输出文本。

#### Parameters

##### pattern?

`string`

#### Returns

`string`

***

### hour

> **hour**: `number`

小时，范围为 0 至 23。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`hour`](TimeFormatParts.md#hour)

***

### millisecond

> **millisecond**: `number`

毫秒，范围为 0 至 999。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`millisecond`](TimeFormatParts.md#millisecond)

***

### minute

> **minute**: `number`

分钟，范围为 0 至 59。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`minute`](TimeFormatParts.md#minute)

***

### month

> **month**: `number`

月份，范围为 1 至 12。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`month`](TimeFormatParts.md#month)

***

### parts

> **parts**: [`TimeFormatParts`](TimeFormatParts.md)

与顶层年月日等字段一致的结构化字段副本。

***

### referenceDate?

> `optional` **referenceDate?**: `Date`

`t0` 配置解析得到的参考时刻；未配置时为 `undefined`。

***

### relativeSeconds?

> `optional` **relativeSeconds?**: `number`

当前时刻相对 `referenceDate` 的秒数；未配置参考时刻时为 `undefined`。

***

### second

> **second**: `number`

秒，范围为 0 至 59。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`second`](TimeFormatParts.md#second)

***

### timestampMs

> **timestampMs**: `number`

原始时刻对应的 Unix 毫秒时间戳。

***

### timezoneName

> **timezoneName**: `string`

`TZ` token 使用的时区显示名。

***

### timezoneOffsetHours

> **timezoneOffsetHours**: `number`

相对 UTC 的时区偏移小时数，范围限制为 -24 至 24。

***

### toDate

> **toDate**: () => `Date`

返回 `date` 的新副本。

#### Returns

`Date`

***

### toISOString

> **toISOString**: () => `string`

返回原始 UTC 时刻的 ISO 字符串。

#### Returns

`string`

***

### utcDate

> **utcDate**: `Date`

原始 UTC Date。

***

### year

> **year**: `number`

四位年份。

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`year`](TimeFormatParts.md#year)
