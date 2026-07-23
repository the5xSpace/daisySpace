[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / TimeInterval

# Class: TimeInterval

An interval defined by a start and a stop time; optionally including those times as part of the interval.
Arbitrary data can optionally be associated with each instance for used with [TimeIntervalCollection](Daisy.TimeIntervalCollection.md).

## Examples

```ts
// Create an instance that spans August 1st, 1980 and is associated
// with a Cartesian position.
const timeInterval = new Daisy.TimeInterval({
 start : Daisy.JulianDate.fromIso8601('1980-08-01T00:00:00Z'),
 stop : Daisy.JulianDate.fromIso8601('1980-08-02T00:00:00Z'),
 isStartIncluded : true,
 isStopIncluded : false,
 data : Daisy.Cartesian3.fromDegrees(39.921037, -75.170082)
});
```

```ts
// Create two instances from ISO 8601 intervals with associated numeric data
// then compute their intersection, summing the data they contain.
const left = Daisy.TimeInterval.fromIso8601({
 iso8601 : '2000/2010',
 data : 2
});

const right = Daisy.TimeInterval.fromIso8601({
 iso8601 : '1995/2005',
 data : 3
});

//The result of the below intersection will be an interval equivalent to
//const intersection = Daisy.TimeInterval.fromIso8601({
// iso8601 : '2000/2005',
// data : 5
//});
const intersection = new Daisy.TimeInterval();
Daisy.TimeInterval.intersect(left, right, intersection, function(leftData, rightData) {
 return leftData + rightData;
});
```

```ts
// Check if an interval contains a specific time.
const dateToCheck = Daisy.JulianDate.fromIso8601('1982-09-08T11:30:00Z');
const containsDate = Daisy.TimeInterval.contains(timeInterval, dateToCheck);
```

## Param

**options**

Object with the following properties:

## Param

**options.start**

The start time of the interval.

## Param

**options.stop**

The stop time of the interval.

## Param

**options.isStartIncluded**

`true` if `options.start` is included in the interval, `false` otherwise.

## Param

**options.isStopIncluded**

`true` if `options.stop` is included in the interval, `false` otherwise.

## Param

**options.data**

Arbitrary data associated with this interval.

## Constructors

### Constructor

> **new TimeInterval**(`options?`): `TimeInterval`

#### Parameters

##### options?

###### data?

`any`

###### isStartIncluded?

`boolean`

###### isStopIncluded?

`boolean`

###### start?

[`JulianDate`](Daisy.JulianDate.md)

###### stop?

[`JulianDate`](Daisy.JulianDate.md)

#### Returns

`TimeInterval`

## Properties

### data

> **data**: `any`

Gets or sets the data associated with this interval.

***

### isEmpty

> `readonly` **isEmpty**: `boolean`

Gets whether or not this interval is empty.

***

### isStartIncluded

> **isStartIncluded**: `boolean`

Gets or sets whether or not the start time is included in this interval.

***

### isStopIncluded

> **isStopIncluded**: `boolean`

Gets or sets whether or not the stop time is included in this interval.

***

### start

> **start**: [`JulianDate`](Daisy.JulianDate.md)

Gets or sets the start time of this interval.

***

### stop

> **stop**: [`JulianDate`](Daisy.JulianDate.md)

Gets or sets the stop time of this interval.

***

### EMPTY

> `readonly` `static` **EMPTY**: `TimeInterval`

An immutable empty interval.

## Methods

### clone()

> **clone**(`result?`): `TimeInterval`

Duplicates this instance.

#### Parameters

##### result?

`TimeInterval`

An existing instance to use for the result.

#### Returns

`TimeInterval`

The modified result parameter or a new instance if none was provided.

***

### equals()

> **equals**(`right?`, `dataComparer?`): `boolean`

Compares this instance against the provided instance componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`TimeInterval`

The right hand side interval.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### equalsEpsilon()

> **equalsEpsilon**(`right?`, `epsilon?`, `dataComparer?`): `boolean`

Compares this instance against the provided instance componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### right?

`TimeInterval`

The right hand side interval.

##### epsilon?

`number`

The epsilon to use for equality testing.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

#### Returns

`boolean`

`true` if they are within the provided epsilon, `false` otherwise.

***

### toString()

> **toString**(): `string`

Creates a string representing this TimeInterval in ISO8601 format.

#### Returns

`string`

A string representing this TimeInterval in ISO8601 format.

***

### clone()

> `static` **clone**(`timeInterval?`, `result?`): `TimeInterval`

Duplicates the provided instance.

#### Parameters

##### timeInterval?

`TimeInterval`

The instance to clone.

##### result?

`TimeInterval`

An existing instance to use for the result.

#### Returns

`TimeInterval`

The modified result parameter or a new instance if none was provided.

***

### contains()

> `static` **contains**(`timeInterval`, `julianDate`): `boolean`

Checks if the specified date is inside the provided interval.

#### Parameters

##### timeInterval

`TimeInterval`

The interval.

##### julianDate

[`JulianDate`](Daisy.JulianDate.md)

The date to check.

#### Returns

`boolean`

`true` if the interval contains the specified date, `false` otherwise.

***

### equals()

> `static` **equals**(`left?`, `right?`, `dataComparer?`): `boolean`

Compares two instances and returns `true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`TimeInterval`

The first instance.

##### right?

`TimeInterval`

The second instance.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

#### Returns

`boolean`

`true` if the dates are equal; otherwise, `false`.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `epsilon?`, `dataComparer?`): `boolean`

Compares two instances and returns `true` if they are within `epsilon` seconds of
each other. That is, in order for the dates to be considered equal (and for
this function to return `true`), the absolute value of the difference between them, in
seconds, must be less than `epsilon`.

#### Parameters

##### left?

`TimeInterval`

The first instance.

##### right?

`TimeInterval`

The second instance.

##### epsilon?

`number`

The maximum number of seconds that should separate the two instances.

##### dataComparer?

[`DataComparer`](../types/Daisy.TimeInterval.DataComparer.md)

A function which compares the data of the two intervals. If omitted, reference equality is used.

#### Returns

`boolean`

`true` if the two dates are within `epsilon` seconds of each other; otherwise `false`.

***

### fromIso8601()

> `static` **fromIso8601**(`options`, `result?`): `TimeInterval`

Creates a new instance from a [8601](http://en.wikipedia.org/wiki/ISO_8601|ISO) interval.

#### Parameters

##### options

Object with the following properties:

###### data?

`any`

Arbitrary data associated with this interval.

###### iso8601

`string`

An ISO 8601 interval.

###### isStartIncluded?

`boolean`

`true` if `options.start` is included in the interval, `false` otherwise.

###### isStopIncluded?

`boolean`

`true` if `options.stop` is included in the interval, `false` otherwise.

##### result?

`TimeInterval`

An existing instance to use for the result.

#### Returns

`TimeInterval`

The modified result parameter or a new instance if none was provided.

***

### intersect()

> `static` **intersect**(`left`, `right?`, `result?`, `mergeCallback?`): `TimeInterval`

Computes the intersection of two intervals, optionally merging their data.

#### Parameters

##### left

`TimeInterval`

The first interval.

##### right?

`TimeInterval`

The second interval.

##### result?

`TimeInterval`

An existing instance to use for the result.

##### mergeCallback?

[`MergeCallback`](../types/Daisy.TimeInterval.MergeCallback.md)

A function which merges the data of the two intervals. If omitted, the data from the left interval will be used.

#### Returns

`TimeInterval`

The modified result parameter.

***

### toIso8601()

> `static` **toIso8601**(`timeInterval`, `precision?`): `string`

Creates an ISO8601 representation of the provided interval.

#### Parameters

##### timeInterval

`TimeInterval`

The interval to be converted.

##### precision?

`number`

The number of fractional digits used to represent the seconds component. By default, the most precise representation is used.

#### Returns

`string`

The ISO8601 representation of the provided interval.
