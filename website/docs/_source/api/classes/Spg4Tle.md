[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Spg4Tle

# Class: Spg4Tle

## Constructors

### Constructor

> **new Spg4Tle**(`tleText`): `Spg4Tle`

#### Parameters

##### tleText

`string` \| `string`[]

#### Returns

`Spg4Tle`

## Properties

### \_argPerigeeDeg

> `readonly` **\_argPerigeeDeg**: `number`

***

### \_bstar?

> `readonly` `optional` **\_bstar?**: `number`

***

### \_classification

> `readonly` **\_classification**: `string`

***

### \_eccentricity

> `readonly` **\_eccentricity**: `number`

***

### \_elementSetNumber?

> `readonly` `optional` **\_elementSetNumber?**: `number`

***

### \_ephemerisType?

> `readonly` `optional` **\_ephemerisType?**: `number`

***

### \_epochDay

> `readonly` **\_epochDay**: `number`

***

### \_epochUtc

> `readonly` **\_epochUtc**: `Date`

***

### \_epochYear

> `readonly` **\_epochYear**: `number`

***

### \_inclinationDeg

> `readonly` **\_inclinationDeg**: `number`

***

### \_internationalDesignator

> `readonly` **\_internationalDesignator**: `string`

***

### \_meanAnomalyDeg

> `readonly` **\_meanAnomalyDeg**: `number`

***

### \_meanMotionDdot?

> `readonly` `optional` **\_meanMotionDdot?**: `number`

***

### \_meanMotionDot?

> `readonly` `optional` **\_meanMotionDot?**: `number`

***

### \_meanMotionRevPerDay

> `readonly` **\_meanMotionRevPerDay**: `number`

***

### \_periodSeconds

> `readonly` **\_periodSeconds**: `number`

***

### \_raanDeg

> `readonly` **\_raanDeg**: `number`

***

### \_revolutionNumberAtEpoch?

> `readonly` `optional` **\_revolutionNumberAtEpoch?**: `number`

***

### \_satelliteNumber

> `readonly` **\_satelliteNumber**: `number`

***

### \_semimajorAxisMeters

> `readonly` **\_semimajorAxisMeters**: `number`

***

### canonical

> `readonly` **canonical**: `string`

***

### line1

> `readonly` **line1**: `string`

***

### line2

> `readonly` **line2**: `string`

***

### name?

> `readonly` `optional` **name?**: `string`

***

### rawText

> `readonly` **rawText**: `string`

## Accessors

### argPerigeeDeg

#### Get Signature

> **get** **argPerigeeDeg**(): `number`

##### Returns

`number`

***

### bstar

#### Get Signature

> **get** **bstar**(): `number` \| `undefined`

##### Returns

`number` \| `undefined`

***

### classification

#### Get Signature

> **get** **classification**(): `string`

##### Returns

`string`

***

### eccentricity

#### Get Signature

> **get** **eccentricity**(): `number`

##### Returns

`number`

***

### elementSetNumber

#### Get Signature

> **get** **elementSetNumber**(): `number` \| `undefined`

##### Returns

`number` \| `undefined`

***

### ephemerisType

#### Get Signature

> **get** **ephemerisType**(): `number` \| `undefined`

##### Returns

`number` \| `undefined`

***

### epochDay

#### Get Signature

> **get** **epochDay**(): `number`

##### Returns

`number`

***

### epochUtc

#### Get Signature

> **get** **epochUtc**(): `Date`

##### Returns

`Date`

***

### epochYear

#### Get Signature

> **get** **epochYear**(): `number`

##### Returns

`number`

***

### inclinationDeg

#### Get Signature

> **get** **inclinationDeg**(): `number`

##### Returns

`number`

***

### internationalDesignator

#### Get Signature

> **get** **internationalDesignator**(): `string`

##### Returns

`string`

***

### meanAnomalyDeg

#### Get Signature

> **get** **meanAnomalyDeg**(): `number`

##### Returns

`number`

***

### meanMotionDdot

#### Get Signature

> **get** **meanMotionDdot**(): `number` \| `undefined`

##### Returns

`number` \| `undefined`

***

### meanMotionDot

#### Get Signature

> **get** **meanMotionDot**(): `number` \| `undefined`

##### Returns

`number` \| `undefined`

***

### meanMotionRevPerDay

#### Get Signature

> **get** **meanMotionRevPerDay**(): `number`

##### Returns

`number`

***

### periodSeconds

#### Get Signature

> **get** **periodSeconds**(): `number`

##### Returns

`number`

***

### raanDeg

#### Get Signature

> **get** **raanDeg**(): `number`

##### Returns

`number`

***

### revolutionNumberAtEpoch

#### Get Signature

> **get** **revolutionNumberAtEpoch**(): `number` \| `undefined`

##### Returns

`number` \| `undefined`

***

### satelliteNumber

#### Get Signature

> **get** **satelliteNumber**(): `number`

##### Returns

`number`

***

### semimajorAxisMeters

#### Get Signature

> **get** **semimajorAxisMeters**(): `number`

##### Returns

`number`

## Methods

### \_toJspredictTleText()

> **\_toJspredictTleText**(): `string`

#### Returns

`string`

***

### compareTo()

> **compareTo**(`other`): [`Spg4TleComparison`](../types/Spg4TleComparison.md)

#### Parameters

##### other

`Spg4Tle`

#### Returns

[`Spg4TleComparison`](../types/Spg4TleComparison.md)

***

### ephemeris()

> **ephemeris**(`start`, `end`, `intervalMs?`, `observerLocation?`): `any`[]

#### Parameters

##### start

`Date`

##### end

`Date`

##### intervalMs?

`number` = `60000`

##### observerLocation?

`any` = `null`

#### Returns

`any`[]

***

### ephemerisJ2000()

> **ephemerisJ2000**(`start`, `end`, `intervalMs?`, `observerLocation?`): `any`[]

#### Parameters

##### start

`Date`

##### end

`Date`

##### intervalMs?

`number` = `60000`

##### observerLocation?

`any` = `null`

#### Returns

`any`[]

***

### estimateConjunctionWith()

> **estimateConjunctionWith**(`other`): [`Spg4TleConjunctionEstimate`](../types/Spg4TleConjunctionEstimate.md)

#### Parameters

##### other

`Spg4Tle`

#### Returns

[`Spg4TleConjunctionEstimate`](../types/Spg4TleConjunctionEstimate.md)

***

### findTransits()

> **findTransits**(`start`, `end`, `observerLocation`, `minElevation?`, `maxTransits?`): `any`[]

#### Parameters

##### start

`Date`

##### end

`Date`

##### observerLocation

`any`

##### minElevation?

`number`

##### maxTransits?

`number`

#### Returns

`any`[]

***

### getElements()

> **getElements**(): [`Spg4TleElements`](../types/Spg4TleElements.md)

#### Returns

[`Spg4TleElements`](../types/Spg4TleElements.md)

***

### getPlaneAngleDeg()

> **getPlaneAngleDeg**(`other`): `number`

#### Parameters

##### other

`Spg4Tle`

#### Returns

`number`

***

### isPotentialCollisionWith()

> **isPotentialCollisionWith**(`other`, `thresholdMeters?`): `boolean`

#### Parameters

##### other

`Spg4Tle`

##### thresholdMeters?

`number` = `1000`

#### Returns

`boolean`

***

### observeAt()

> **observeAt**(`date?`, `observerLocation?`): `any`

#### Parameters

##### date?

`Date` = `...`

##### observerLocation?

`any`

#### Returns

`any`

***

### observeAtJ2000()

> **observeAtJ2000**(`date?`, `observerLocation?`): `any`

#### Parameters

##### date?

`Date` = `...`

##### observerLocation?

`any`

#### Returns

`any`

***

### \_checksumMod10()

> `static` **\_checksumMod10**(`line69`): `number`

#### Parameters

##### line69

`string`

#### Returns

`number`

***

### \_degToRad()

> `static` **\_degToRad**(`deg`): `number`

#### Parameters

##### deg

`number`

#### Returns

`number`

***

### \_epochToUtc()

> `static` **\_epochToUtc**(`epochYear2`, `epochDay`): `object`

#### Parameters

##### epochYear2

`number`

##### epochDay

`number`

#### Returns

`object`

##### epochUtc

> **epochUtc**: `Date`

##### epochYear

> **epochYear**: `number`

***

### \_getField()

> `static` **\_getField**(`line69`, `startCol1`, `endCol1`): `string`

#### Parameters

##### line69

`string`

##### startCol1

`number`

##### endCol1

`number`

#### Returns

`string`

***

### \_normalizeLine69()

> `static` **\_normalizeLine69**(`line`): `string`

#### Parameters

##### line

`string`

#### Returns

`string`

***

### \_parseAllFields()

> `static` **\_parseAllFields**(`name`, `line1Input`, `line2Input`): `object`

#### Parameters

##### name

`string` \| `undefined`

##### line1Input

`string`

##### line2Input

`string`

#### Returns

`object`

##### canonical

> **canonical**: `string`

##### elements

> **elements**: [`Spg4TleElements`](../types/Spg4TleElements.md)

##### line1

> **line1**: `string`

##### line2

> **line2**: `string`

##### rawText

> **rawText**: `string`

***

### \_parseFloatField()

> `static` **\_parseFloatField**(`value`, `name`): `number`

#### Parameters

##### value

`string`

##### name

`string`

#### Returns

`number`

***

### \_parseIntField()

> `static` **\_parseIntField**(`value`, `name`): `number`

#### Parameters

##### value

`string`

##### name

`string`

#### Returns

`number`

***

### \_parseTleExponent()

> `static` **\_parseTleExponent**(`value`): `number` \| `undefined`

#### Parameters

##### value

`string`

#### Returns

`number` \| `undefined`

***

### \_semiMajorAxisMetersFromPeriodSeconds()

> `static` **\_semiMajorAxisMetersFromPeriodSeconds**(`periodSeconds`): `number`

#### Parameters

##### periodSeconds

`number`

#### Returns

`number`

***

### \_splitAndExtract()

> `static` **\_splitAndExtract**(`text`): `ParsedTleLines`

#### Parameters

##### text

`string`

#### Returns

`ParsedTleLines`

***

### \_splitNonEmptyLines()

> `static` **\_splitNonEmptyLines**(`text`): `string`[]

#### Parameters

##### text

`string`

#### Returns

`string`[]

***

### \_validateLine()

> `static` **\_validateLine**(`line`, `expectedLineNumber`): `string`

#### Parameters

##### line

`string`

##### expectedLineNumber

`1` \| `2`

#### Returns

`string`

***

### \_validateTleLines()

> `static` **\_validateTleLines**(`line1`, `line2`): `void`

#### Parameters

##### line1

`string`

##### line2

`string`

#### Returns

`void`

***

### \_wrapDeg180()

> `static` **\_wrapDeg180**(`deg`): `number`

#### Parameters

##### deg

`number`

#### Returns

`number`

***

### extractAllFromText()

> `static` **extractAllFromText**(`text`): `Spg4Tle`[]

#### Parameters

##### text

`string`

#### Returns

`Spg4Tle`[]

***

### fetchTleFromCatalog()

> `static` **fetchTleFromCatalog**(`celestrakId`): `Promise`\<`Spg4Tle`\>

#### Parameters

##### celestrakId

`string`

#### Returns

`Promise`\<`Spg4Tle`\>
