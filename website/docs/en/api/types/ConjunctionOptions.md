[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ConjunctionOptions

# Type Alias: ConjunctionOptions

> **ConjunctionOptions** = `object`

Conjunction prediction options.

- `stepSeconds`: sampling step size (smaller = more precise but slower)
- `distanceThreshold`: distance threshold for triggering candidate intervals (only intervals within the threshold are refined)

## Properties

### centralBody?

> `optional` **centralBody?**: [`CentralBody`](CentralBody.md)

***

### distanceThreshold?

> `optional` **distanceThreshold?**: `number`

***

### ellipsoid?

> `optional` **ellipsoid?**: `Daisy.Ellipsoid`

***

### stepSeconds?

> `optional` **stepSeconds?**: `number`
