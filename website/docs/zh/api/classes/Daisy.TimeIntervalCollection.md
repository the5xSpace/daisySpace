[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / TimeIntervalCollection

# Class: TimeIntervalCollection

A non-overlapping collection of [TimeInterval](Daisy.TimeInterval.md) instances sorted by start time.

## Param

**intervals**

An array of intervals to add to the collection.

## Constructors

### Constructor

> **new TimeIntervalCollection**(`intervals?`): `TimeIntervalCollection`

#### Parameters

##### intervals?

[`TimeInterval`](Daisy.TimeInterval.md)[]

#### Returns

`TimeIntervalCollection`

## Properties

### changedEvent

> `readonly` **changedEvent**: `Event`

Gets an event that is raised whenever the collection of intervals change.

***

### isEmpty

> `readonly` **isEmpty**: `boolean`

Gets whether or not the collection is empty.

***

### isStartIncluded

> `readonly` **isStartIncluded**: `boolean`

Gets whether or not the start time is included in the collection.

***

### isStopIncluded

> `readonly` **isStopIncluded**: `boolean`

Gets whether or not the stop time is included in the collection.

***

### length

> `readonly` **length**: `number`

Gets the number of intervals in the collection.

***

### start

> `readonly` **start**: [`JulianDate`](Daisy.JulianDate.md)

Gets the start time of the collection.

***

### stop

> `readonly` **stop**: [`JulianDate`](Daisy.JulianDate.md)

Gets the stop time of the collection.

## Methods

### addInterval()

> **addInterval**(`interval`, `dataComparer?`): `void`

Adds an interval to the collection, merging intervals that contain the same data and
splitting intervals of different data as needed in order to maintain a non-overlapping collection.
The data in the new interval takes precedence over any existing intervals in the collection.

#### Parameters

##### interval

[`TimeInterval`](Daisy.TimeInterval.md)

The interval to add.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

#### Returns

`void`

***

### contains()

> **contains**(`julianDate`): `boolean`

Checks if the specified date is inside this collection.

#### Parameters

##### julianDate

[`JulianDate`](Daisy.JulianDate.md)

The date to check.

#### Returns

`boolean`

`true` if the collection contains the specified date, `false` otherwise.

***

### equals()

> **equals**(`right?`, `dataComparer?`): `boolean`

Compares this instance against the provided instance componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`TimeIntervalCollection`

The right hand side collection.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### findDataForIntervalContainingDate()

> **findDataForIntervalContainingDate**(`date`): `any`

Finds and returns the data for the interval that contains the specified date.

#### Parameters

##### date

[`JulianDate`](Daisy.JulianDate.md)

The date to search for.

#### Returns

`any`

The data for the interval containing the specified date, or `undefined` if no such interval exists.

***

### findInterval()

> **findInterval**(`options?`): [`TimeInterval`](Daisy.TimeInterval.md) \| `undefined`

Returns the first interval in the collection that matches the specified parameters.
All parameters are optional and `undefined` parameters are treated as a don't care condition.

#### Parameters

##### options?

Object with the following properties:

###### isStartIncluded?

`boolean`

`true` if `options.start` is included in the interval, `false` otherwise.

###### isStopIncluded?

`boolean`

`true` if `options.stop` is included in the interval, `false` otherwise.

###### start?

[`JulianDate`](Daisy.JulianDate.md)

The start time of the interval.

###### stop?

[`JulianDate`](Daisy.JulianDate.md)

The stop time of the interval.

#### Returns

[`TimeInterval`](Daisy.TimeInterval.md) \| `undefined`

The first interval in the collection that matches the specified parameters.

***

### findIntervalContainingDate()

> **findIntervalContainingDate**(`date`): [`TimeInterval`](Daisy.TimeInterval.md) \| `undefined`

Finds and returns the interval that contains the specified date.

#### Parameters

##### date

[`JulianDate`](Daisy.JulianDate.md)

The date to search for.

#### Returns

[`TimeInterval`](Daisy.TimeInterval.md) \| `undefined`

The interval containing the specified date, `undefined` if no such interval exists.

***

### get()

> **get**(`index`): [`TimeInterval`](Daisy.TimeInterval.md) \| `undefined`

Gets the interval at the specified index.

#### Parameters

##### index

`number`

The index of the interval to retrieve.

#### Returns

[`TimeInterval`](Daisy.TimeInterval.md) \| `undefined`

The interval at the specified index, or `undefined` if no interval exists as that index.

***

### indexOf()

> **indexOf**(`date`): `number`

Finds and returns the index of the interval in the collection that contains the specified date.

#### Parameters

##### date

[`JulianDate`](Daisy.JulianDate.md)

The date to search for.

#### Returns

`number`

The index of the interval that contains the specified date, if no such interval exists,
it returns a negative number which is the bitwise complement of the index of the next interval that
starts after the date, or if no interval starts after the specified date, the bitwise complement of
the length of the collection.

***

### intersect()

> **intersect**(`other`, `dataComparer?`, `mergeCallback?`): `TimeIntervalCollection`

Creates a new instance that is the intersection of this collection and the provided collection.

#### Parameters

##### other

`TimeIntervalCollection`

The collection to intersect with.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

##### mergeCallback?

[`MergeCallback`](../types/Daisy.TimeInterval.MergeCallback.md)

A function which merges the data of the two intervals. If omitted, the data from the left interval will be used.

#### Returns

`TimeIntervalCollection`

A new TimeIntervalCollection which is the intersection of this collection and the provided collection.

***

### removeAll()

> **removeAll**(): `void`

Removes all intervals from the collection.

#### Returns

`void`

***

### removeInterval()

> **removeInterval**(`interval`): `boolean`

Removes the specified interval from this interval collection, creating a hole over the specified interval.
The data property of the input interval is ignored.

#### Parameters

##### interval

[`TimeInterval`](Daisy.TimeInterval.md)

The interval to remove.

#### Returns

`boolean`

`true` if the interval was removed, `false` if no part of the interval was in the collection.

***

### fromIso8601()

> `static` **fromIso8601**(`options`, `result?`): `TimeIntervalCollection`

Creates a new instance from an [8601](http://en.wikipedia.org/wiki/ISO_8601|ISO) time interval (start/end/duration).

#### Parameters

##### options

Object with the following properties:

###### dataCallback?

(...`params`) => `any`

A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.

###### iso8601

`string`

An ISO 8601 interval.

###### isStartIncluded?

`boolean`

`true` if start time is included in the interval, `false` otherwise.

###### isStopIncluded?

`boolean`

`true` if stop time is included in the interval, `false` otherwise.

###### leadingInterval?

`boolean`

`true` if you want to add a interval from Iso8601.MINIMUM_VALUE to start time, `false` otherwise.

###### trailingInterval?

`boolean`

`true` if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE, `false` otherwise.

##### result?

`TimeIntervalCollection`

An existing instance to use for the result.

#### Returns

`TimeIntervalCollection`

The modified result parameter or a new instance if none was provided.

***

### fromIso8601DateArray()

> `static` **fromIso8601DateArray**(`options`, `result?`): `TimeIntervalCollection`

Creates a new instance from a [8601](http://en.wikipedia.org/wiki/ISO_8601|ISO) date array.

#### Parameters

##### options

Object with the following properties:

###### dataCallback?

(...`params`) => `any`

A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.

###### iso8601Dates

`string`[]

An array of ISO 8601 dates.

###### isStartIncluded?

`boolean`

`true` if start time is included in the interval, `false` otherwise.

###### isStopIncluded?

`boolean`

`true` if stop time is included in the interval, `false` otherwise.

###### leadingInterval?

`boolean`

`true` if you want to add a interval from Iso8601.MINIMUM_VALUE to start time, `false` otherwise.

###### trailingInterval?

`boolean`

`true` if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE, `false` otherwise.

##### result?

`TimeIntervalCollection`

An existing instance to use for the result.

#### Returns

`TimeIntervalCollection`

The modified result parameter or a new instance if none was provided.

***

### fromIso8601DurationArray()

> `static` **fromIso8601DurationArray**(`options`, `result?`): `TimeIntervalCollection`

Creates a new instance from a [8601](http://en.wikipedia.org/wiki/ISO_8601|ISO) duration array.

#### Parameters

##### options

Object with the following properties:

###### dataCallback?

(...`params`) => `any`

A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.

###### epoch

[`JulianDate`](Daisy.JulianDate.md)

An date that the durations are relative to.

###### iso8601Durations

`string`

An array of ISO 8601 durations.

###### isStartIncluded?

`boolean`

`true` if start time is included in the interval, `false` otherwise.

###### isStopIncluded?

`boolean`

`true` if stop time is included in the interval, `false` otherwise.

###### leadingInterval?

`boolean`

`true` if you want to add a interval from Iso8601.MINIMUM_VALUE to start time, `false` otherwise.

###### relativeToPrevious?

`boolean`

`true` if durations are relative to previous date, `false` if always relative to the epoch.

###### trailingInterval?

`boolean`

`true` if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE, `false` otherwise.

##### result?

`TimeIntervalCollection`

An existing instance to use for the result.

#### Returns

`TimeIntervalCollection`

The modified result parameter or a new instance if none was provided.

***

### fromJulianDateArray()

> `static` **fromJulianDateArray**(`options`, `result?`): `TimeIntervalCollection`

Creates a new instance from a JulianDate array.

#### Parameters

##### options

Object with the following properties:

###### dataCallback?

(...`params`) => `any`

A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.

###### isStartIncluded?

`boolean`

`true` if start time is included in the interval, `false` otherwise.

###### isStopIncluded?

`boolean`

`true` if stop time is included in the interval, `false` otherwise.

###### julianDates

[`JulianDate`](Daisy.JulianDate.md)[]

An array of ISO 8601 dates.

###### leadingInterval?

`boolean`

`true` if you want to add a interval from Iso8601.MINIMUM_VALUE to start time, `false` otherwise.

###### trailingInterval?

`boolean`

`true` if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE, `false` otherwise.

##### result?

`TimeIntervalCollection`

An existing instance to use for the result.

#### Returns

`TimeIntervalCollection`

The modified result parameter or a new instance if none was provided.
