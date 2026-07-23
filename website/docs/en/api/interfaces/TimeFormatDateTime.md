[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatDateTime

# Interface: TimeFormatDateTime

Complete date-time context provided to a custom formatter.

## Extends

- [`TimeFormatParts`](TimeFormatParts.md)

## Properties

### date

> **date**: `Date`

A copy shifted to the target time zone. Use the UTC getter methods when reading it.

***

### day

> **day**: `number`

Day of the month, from 1 to 31.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`day`](TimeFormatParts.md#day)

***

### format

> **format**: (`pattern?`) => `string`

Formats text from the current context using the token pattern.

#### Parameters

##### pattern?

`string`

#### Returns

`string`

***

### hour

> **hour**: `number`

Hour, from 0 to 23.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`hour`](TimeFormatParts.md#hour)

***

### millisecond

> **millisecond**: `number`

Milliseconds, from 0 to 999.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`millisecond`](TimeFormatParts.md#millisecond)

***

### minute

> **minute**: `number`

Minute, from 0 to 59.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`minute`](TimeFormatParts.md#minute)

***

### month

> **month**: `number`

Month, from 1 to 12.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`month`](TimeFormatParts.md#month)

***

### parts

> **parts**: [`TimeFormatParts`](TimeFormatParts.md)

Structured field copy corresponding to the top-level year, month, day, and other fields.

***

### referenceDate?

> `optional` **referenceDate?**: `Date`

Reference time parsed from the `t0` configuration; `undefined` when not configured.

***

### relativeSeconds?

> `optional` **relativeSeconds?**: `number`

Seconds from the current time to `referenceDate`; `undefined` when no reference time is configured.

***

### second

> **second**: `number`

Second, from 0 to 59.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`second`](TimeFormatParts.md#second)

***

### timestampMs

> **timestampMs**: `number`

Unix timestamp in milliseconds for the original time.

***

### timezoneName

> **timezoneName**: `string`

Display name of the time zone used by the `TZ` token.

***

### timezoneOffsetHours

> **timezoneOffsetHours**: `number`

Time-zone offset from UTC in hours, limited to -24 through 24.

***

### toDate

> **toDate**: () => `Date`

Returns a new copy of `date`.

#### Returns

`Date`

***

### toISOString

> **toISOString**: () => `string`

Returns the ISO string for the original UTC time.

#### Returns

`string`

***

### utcDate

> **utcDate**: `Date`

Original UTC Date.

***

### year

> **year**: `number`

Four-digit year.

#### Inherited from

[`TimeFormatParts`](TimeFormatParts.md).[`year`](TimeFormatParts.md#year)
