[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / JulianDate

# Class: JulianDate

Represents an astronomical Julian date, which is the number of days since noon on January 1, -4712 (4713 BC).
For increased precision, this class stores the whole number part of the date and the seconds
part of the date in separate components. In order to be safe for arithmetic and represent
leap seconds, the date is always stored in the International Atomic Time standard
TimeStandard.TAI.

## Param

**julianDayNumber**

The Julian Day Number representing the number of whole days. Fractional days will also be handled correctly.

## Param

**secondsOfDay**

The number of seconds into the current Julian Day Number. Fractional seconds, negative seconds and seconds greater than a day will be handled correctly.

## Param

**timeStandard**

The time standard in which the first two parameters are defined.

## Constructors

### Constructor

> **new JulianDate**(`julianDayNumber?`, `secondsOfDay?`, `timeStandard?`): `JulianDate`

#### Parameters

##### julianDayNumber?

`number`

##### secondsOfDay?

`number`

##### timeStandard?

`TimeStandard`

#### Returns

`JulianDate`

## Properties

### dayNumber

> **dayNumber**: `number`

Gets or sets the number of whole days.

***

### secondsOfDay

> **secondsOfDay**: `number`

Gets or sets the number of seconds into the current day.

***

### leapSeconds

> `static` **leapSeconds**: `LeapSecond`[]

Gets or sets the list of leap seconds used throughout Daisy.

## Methods

### clone()

> **clone**(`result?`): `JulianDate`

Duplicates this instance.

#### Parameters

##### result?

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter or a new instance if none was provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this and the provided instance and returns `true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`JulianDate`

The second instance.

#### Returns

`boolean`

`true` if the dates are equal; otherwise, `false`.

***

### equalsEpsilon()

> **equalsEpsilon**(`right?`, `epsilon?`): `boolean`

Compares this and the provided instance and returns `true` if they are within `epsilon` seconds of
each other. That is, in order for the dates to be considered equal (and for
this function to return `true`), the absolute value of the difference between them, in
seconds, must be less than `epsilon`.

#### Parameters

##### right?

`JulianDate`

The second instance.

##### epsilon?

`number`

The maximum number of seconds that should separate the two instances.

#### Returns

`boolean`

`true` if the two dates are within `epsilon` seconds of each other; otherwise `false`.

***

### toString()

> **toString**(): `string`

Creates a string representing this date in ISO8601 format.

#### Returns

`string`

A string representing this date in ISO8601 format.

***

### addDays()

> `static` **addDays**(`julianDate`, `days`, `result`): `JulianDate`

Adds the provided number of days to the provided date instance.

#### Parameters

##### julianDate

`JulianDate`

The date.

##### days

`number`

The number of days to add or subtract.

##### result

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter.

***

### addHours()

> `static` **addHours**(`julianDate`, `hours`, `result`): `JulianDate`

Adds the provided number of hours to the provided date instance.

#### Parameters

##### julianDate

`JulianDate`

The date.

##### hours

`number`

The number of hours to add or subtract.

##### result

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter.

***

### addMinutes()

> `static` **addMinutes**(`julianDate`, `minutes`, `result`): `JulianDate`

Adds the provided number of minutes to the provided date instance.

#### Parameters

##### julianDate

`JulianDate`

The date.

##### minutes

`number`

The number of minutes to add or subtract.

##### result

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter.

***

### addSeconds()

> `static` **addSeconds**(`julianDate`, `seconds`, `result`): `JulianDate`

Adds the provided number of seconds to the provided date instance.

#### Parameters

##### julianDate

`JulianDate`

The date.

##### seconds

`number`

The number of seconds to add or subtract.

##### result

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter.

***

### clone()

> `static` **clone**(`julianDate`, `result?`): `JulianDate`

Duplicates a JulianDate instance.

#### Parameters

##### julianDate

`JulianDate`

The date to duplicate.

##### result?

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter or a new instance if none was provided. Returns undefined if julianDate is undefined.

***

### compare()

> `static` **compare**(`left`, `right`): `number`

Compares two instances.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`number`

A negative value if left is less than right, a positive value if left is greater than right, or zero if left and right are equal.

***

### computeTaiMinusUtc()

> `static` **computeTaiMinusUtc**(`julianDate`): `number`

Computes the number of seconds the provided instance is ahead of UTC.

#### Parameters

##### julianDate

`JulianDate`

The date.

#### Returns

`number`

The number of seconds the provided instance is ahead of UTC

***

### daysDifference()

> `static` **daysDifference**(`left`, `right`): `number`

Computes the difference in days between the provided instance.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`number`

The difference, in days, when subtracting `right` from `left`.

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares two instances and returns `true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`JulianDate`

The first instance.

##### right?

`JulianDate`

The second instance.

#### Returns

`boolean`

`true` if the dates are equal; otherwise, `false`.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `epsilon?`): `boolean`

Compares two instances and returns `true` if they are within `epsilon` seconds of
each other. That is, in order for the dates to be considered equal (and for
this function to return `true`), the absolute value of the difference between them, in
seconds, must be less than `epsilon`.

#### Parameters

##### left?

`JulianDate`

The first instance.

##### right?

`JulianDate`

The second instance.

##### epsilon?

`number`

The maximum number of seconds that should separate the two instances.

#### Returns

`boolean`

`true` if the two dates are within `epsilon` seconds of each other; otherwise `false`.

***

### fromDate()

> `static` **fromDate**(`date`, `result?`): `JulianDate`

Creates a new instance from a JavaScript Date.

#### Parameters

##### date

`Date`

A JavaScript Date.

##### result?

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter or a new instance if none was provided.

***

### fromGregorianDate()

> `static` **fromGregorianDate**(`date`, `result?`): `JulianDate`

Creates a new instance from a GregorianDate.

#### Parameters

##### date

`GregorianDate`

A GregorianDate.

##### result?

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter or a new instance if none was provided.

***

### fromIso8601()

> `static` **fromIso8601**(`iso8601String`, `result?`): `JulianDate`

Creates a new instance from a from an [8601](http://en.wikipedia.org/wiki/ISO_8601|ISO) date.
This method is superior to `Date.parse` because it will handle all valid formats defined by the ISO 8601
specification, including leap seconds and sub-millisecond times, which discarded by most JavaScript implementations.

#### Parameters

##### iso8601String

`string`

An ISO 8601 date.

##### result?

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter or a new instance if none was provided.

***

### greaterThan()

> `static` **greaterThan**(`left`, `right`): `boolean`

Compares the provided instances and returns `true` if `left` is later than `right`, `false` otherwise.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`boolean`

`true` if `left` is later than `right`, `false` otherwise.

***

### greaterThanOrEquals()

> `static` **greaterThanOrEquals**(`left`, `right`): `boolean`

Compares the provided instances and returns `true` if `left` is later than or equal to `right`, `false` otherwise.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`boolean`

`true` if `left` is later than or equal to `right`, `false` otherwise.

***

### lessThan()

> `static` **lessThan**(`left`, `right`): `boolean`

Compares the provided instances and returns `true` if `left` is earlier than `right`, `false` otherwise.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`boolean`

`true` if `left` is earlier than `right`, `false` otherwise.

***

### lessThanOrEquals()

> `static` **lessThanOrEquals**(`left`, `right`): `boolean`

Compares the provided instances and returns `true` if `left` is earlier than or equal to `right`, `false` otherwise.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`boolean`

`true` if `left` is earlier than or equal to `right`, `false` otherwise.

***

### now()

> `static` **now**(`result?`): `JulianDate`

Creates a new instance that represents the current system time.
This is equivalent to calling `JulianDate.fromDate(new Date());`.

#### Parameters

##### result?

`JulianDate`

An existing instance to use for the result.

#### Returns

`JulianDate`

The modified result parameter or a new instance if none was provided.

***

### secondsDifference()

> `static` **secondsDifference**(`left`, `right`): `number`

Computes the difference in seconds between the provided instance.

#### Parameters

##### left

`JulianDate`

The first instance.

##### right

`JulianDate`

The second instance.

#### Returns

`number`

The difference, in seconds, when subtracting `right` from `left`.

***

### toDate()

> `static` **toDate**(`julianDate`): `Date`

Creates a JavaScript Date from the provided instance.
Since JavaScript dates are only accurate to the nearest millisecond and
cannot represent a leap second, consider using [JulianDate.toGregorianDate](#togregoriandate) instead.
If the provided JulianDate is during a leap second, the previous second is used.

#### Parameters

##### julianDate

`JulianDate`

The date to be converted.

#### Returns

`Date`

A new instance representing the provided date.

***

### toGregorianDate()

> `static` **toGregorianDate**(`julianDate`, `result?`): `GregorianDate`

Creates a GregorianDate from the provided instance.

#### Parameters

##### julianDate

`JulianDate`

The date to be converted.

##### result?

`GregorianDate`

An existing instance to use for the result.

#### Returns

`GregorianDate`

The modified result parameter or a new instance if none was provided.

***

### toIso8601()

> `static` **toIso8601**(`julianDate`, `precision?`): `string`

Creates an ISO8601 representation of the provided date.

#### Parameters

##### julianDate

`JulianDate`

The date to be converted.

##### precision?

`number`

The number of fractional digits used to represent the seconds component. By default, the most precise representation is used.

#### Returns

`string`

The ISO8601 representation of the provided date.

***

### totalDays()

> `static` **totalDays**(`julianDate`): `number`

Computes the total number of whole and fractional days represented by the provided instance.

#### Parameters

##### julianDate

`JulianDate`

The date.

#### Returns

`number`

The Julian date as single floating point number.
