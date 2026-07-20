[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterEphemerisRequest

# Type Alias: NearEarthOrbiterEphemerisRequest

> **NearEarthOrbiterEphemerisRequest** = `{ endTime: Daisy.JulianDate; startTime: Daisy.JulianDate }`

Ephemeris computation request parameters (based on generic orbit source + SGP4).

## Example

```ts
const ephemeris = sat.calculateEphemeris({
 startTime: viewer.startTime,
 endTime: viewer.stopTime,
 intervalSeconds: 30,
});
```

## Properties

### endTime

> **endTime**: `Daisy.JulianDate`

Sampling end time (simulation time)

***

### intervalSeconds?

> `optional` **intervalSeconds?**: `number`

Sampling interval (seconds); default 60

***

### observerLocation?

> `optional` **observerLocation?**: \[`number`, `number`, `number`\]

Observer position (lng/lat/height), units: deg/deg/m; default [0,0,0]

***

### startTime

> **startTime**: `Daisy.JulianDate`

Sampling start time (simulation time)
