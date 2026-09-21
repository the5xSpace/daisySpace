[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / ResolvedNearEarthOrbiterMotionConfiguration

# Interface: ResolvedNearEarthOrbiterMotionConfiguration

## Extends

- `Omit`\<[`NearEarthOrbiterMotionConfiguration`](PW.NearEarthOrbiterMotionConfiguration.md), `"attitudeMode"` \| `"ephemeris"`\>

## Properties

### attitudeMode

> **attitudeMode**: [`NearEarthOrbiterAttitudeMode`](../types/PW.NearEarthOrbiterAttitudeMode.md)

***

### ephemeris?

> `optional` **ephemeris?**: `Required`\<`Omit`\<[`NearEarthOrbiterEphemerisPlan`](PW.NearEarthOrbiterEphemerisPlan.md), `"timeRange"`\>\> & `object`

#### Type Declaration

##### timeRange?

> `optional` **timeRange?**: [`NearEarthOrbiterMotionTimeRange`](PW.NearEarthOrbiterMotionTimeRange.md)

***

### positionMode

> **positionMode**: [`NearEarthOrbiterPositionMode`](../types/PW.NearEarthOrbiterPositionMode.md)

#### Inherited from

[`NearEarthOrbiterMotionConfiguration`](PW.NearEarthOrbiterMotionConfiguration.md).[`positionMode`](PW.NearEarthOrbiterMotionConfiguration.md#positionmode)

***

### source

> **source**: [`NearEarthOrbiterMotionSource`](../types/PW.NearEarthOrbiterMotionSource.md)

#### Inherited from

[`NearEarthOrbiterMotionConfiguration`](PW.NearEarthOrbiterMotionConfiguration.md).[`source`](PW.NearEarthOrbiterMotionConfiguration.md#source)
