[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CentralBody

# Type Alias: CentralBody

> **CentralBody** = `"earth"` \| `"moon"`

A high-precision orbit analyzer based on the `wasm-sgp4` core (the JS/TS layer only performs "analysis + coordinate/ellipsoid alignment").

Design principles:
- Orbital dynamics (SGP4 propagation) are all performed in `wasm-sgp4`
- The JS/TS layer is responsible for: time unification (UTC), coordinate conversion (), ellipsoid geometry, and analysis logic (pass/rendezvous/mutual visibility, etc.)

Coordinate system conventions:
- ECI: `TEME` is used here (consistent with SGP4 output)
- ECEF: uses the `TEME -> PseudoFixed` transformation matrix (see `Daisy.Transforms.computeTemeToPseudoFixedMatrix`)
- LLA: uses `Daisy.Ellipsoid.cartesianToCartographic` to output longitude/latitude/height (in degrees)
- ENU: uses `Daisy.Transforms.eastNorthUpToFixedFrame` to build a local ENU based on the ellipsoid

Time system conventions:
- All input and output times are UTC (JS Date epoch milliseconds + `timeBasis: "UTC"` flag)

## Example

```ts
import { HighPrecisionSGP4Analyzer } from "./sdk/index";

const analyzer = new HighPrecisionSGP4Analyzer();
await analyzer.init();

const tle = [
 "1 25544U 98067A 20194.51782528 -.00002182 00000-0 -11606-4 0 2927",
 "2 25544 51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537"
];

const nowUtc = new Date();
const state = await analyzer.computeStateAtTime(tle, nowUtc, {
 includeENU: true,
 observer: { longitudeDeg: 120, latitudeDeg: 30, height: 0 }
});

console.log(state.timeBasis, state.eci.frame, state.lla.longitudeDeg);
```
