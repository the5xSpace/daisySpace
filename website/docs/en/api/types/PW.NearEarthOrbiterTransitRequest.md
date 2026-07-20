[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterTransitRequest

# Type Alias: NearEarthOrbiterTransitRequest

> **NearEarthOrbiterTransitRequest** = `{ endTime: Daisy.JulianDate; observerLocation: \[number, number, number\]; startTime: Daisy.JulianDate }`

## Properties

### endTime

> **endTime**: `Daisy.JulianDate`

Search end time (simulation time)

***

### maxTransits?

> `optional` **maxTransits?**: `number`

Maximum number of passes to return (optional)

***

### minElevationDeg?

> `optional` **minElevationDeg?**: `number`

Minimum elevation angle (degrees), default 4

***

### observerLocation

> **observerLocation**: \[`number`, `number`, `number`\]

Observer position (lat/lng/altitude), units: deg/deg/m; internally auto-compatible with km notation.

***

### startTime

> **startTime**: `Daisy.JulianDate`

Search start time (simulation time)
