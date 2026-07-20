[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Spg4

# Variable: Spg4

> `const` **Spg4**: `SPG4`

SGP4 utility singleton.

Provides:
- TLE retrieval (CelesTrak) and local cache
- Orbit source normalization (TLE / OMM XML / JSON GP)
- SGP4 propagation (position/ephemeris/pass) based on `jspredict-dc`

## Example

```ts
const tleText = await Spg4.loadTleData(25544, 6 * 3600);
const now = new Date();
const pos = Spg4.observeAt(tleText, undefined, now);
```
