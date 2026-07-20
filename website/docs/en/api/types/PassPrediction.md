[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PassPrediction

# Type Alias: PassPrediction

> **PassPrediction** = `{ aos: OrbitState; aosAzimuthDeg: number; durationSeconds: number; los: OrbitState; losAzimuthDeg: number; maxElevationDeg: number; minElevationDeg: number; observer: ObserverDefinition; satId: string; tca: OrbitState; timeBasis: "UTC" }`

Pass prediction (three-point report: AOS/TCA/LOS).

Explanation:
- `aos`: Acquisition of Signal, the moment when the satellite rises from below `minElevationDeg` to meet the threshold (acquisition)
- `tca`: Time of Closest Approach, used here for the moment of maximum elevation (culmination)
- `los`: Loss of Signal, the moment when the satellite falls from meeting the threshold to below it (loss)

Note:
- The current implementation uses uniform step sampling + bisection/trisection refinement, suitable for fast analysis and visibility window inference

## Properties

### aos

> **aos**: [`OrbitState`](OrbitState.md)

***

### aosAzimuthDeg

> **aosAzimuthDeg**: `number`

***

### durationSeconds

> **durationSeconds**: `number`

***

### los

> **los**: [`OrbitState`](OrbitState.md)

***

### losAzimuthDeg

> **losAzimuthDeg**: `number`

***

### maxElevationDeg

> **maxElevationDeg**: `number`

***

### minElevationDeg

> **minElevationDeg**: `number`

***

### observer

> **observer**: [`ObserverDefinition`](ObserverDefinition.md)

***

### satId

> **satId**: `string`

***

### tca

> **tca**: [`OrbitState`](OrbitState.md)

***

### timeBasis

> **timeBasis**: `"UTC"`
