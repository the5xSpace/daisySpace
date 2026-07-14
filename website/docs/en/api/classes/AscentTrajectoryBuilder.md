[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AscentTrajectoryBuilder

# Class: AscentTrajectoryBuilder

## Constructors

### Constructor

> **new AscentTrajectoryBuilder**(): `AscentTrajectoryBuilder`

#### Returns

`AscentTrajectoryBuilder`

## Methods

### addStage()

> **addStage**(`thrust`, `isp`, `propellantMass`, `dryMass`): `this`

#### Parameters

##### thrust

`number`

##### isp

`number`

##### propellantMass

`number`

##### dryMass

`number`

#### Returns

`this`

***

### buildPositions()

> **buildPositions**(): `Cartesian3`[]

#### Returns

`Cartesian3`[]

***

### buildTrajectory()

> **buildTrajectory**(`epoch`): [`TrajectorySample`](TrajectorySample.md)

#### Parameters

##### epoch

`JulianDate`

#### Returns

[`TrajectorySample`](TrajectorySample.md)

***

### drag()

> **drag**(`params`): `this`

#### Parameters

##### params

`Partial`\<[`DragParams`](../interfaces/DragParams.md)\>

#### Returns

`this`

***

### getEvents()

> **getEvents**(): [`AscentEvent`](../interfaces/AscentEvent.md)[]

#### Returns

[`AscentEvent`](../interfaces/AscentEvent.md)[]

***

### getSummary()

> **getSummary**(): [`AscentSummary`](../interfaces/AscentSummary.md)

#### Returns

[`AscentSummary`](../interfaces/AscentSummary.md)

***

### launchSite()

> **launchSite**(`latitude`, `longitude`, `altitude`, `azimuth`): `this`

#### Parameters

##### latitude

`number`

##### longitude

`number`

##### altitude

`number`

##### azimuth

`number`

#### Returns

`this`

***

### payloadMass()

> **payloadMass**(`mass`): `this`

#### Parameters

##### mass

`number`

#### Returns

`this`

***

### pitchProgram()

> **pitchProgram**(`startTime`, `pitchRate`, `endAngle`): `this`

#### Parameters

##### startTime

`number`

##### pitchRate

`number`

##### endAngle

`number`

#### Returns

`this`

***

### timestep()

> **timestep**(`dt`): `this`

#### Parameters

##### dt

`number`

#### Returns

`this`
