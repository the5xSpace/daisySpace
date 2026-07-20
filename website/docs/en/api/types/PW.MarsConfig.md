[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / MarsConfig

# Type Alias: MarsConfig

> **MarsConfig** = [`CelestialBodyConfig`](PW.CelestialBodyConfig.md) & `object`

Mars object configuration (with atmosphere extension)

## Type Declaration

### atmosphere?

> `optional` **atmosphere?**: `boolean` \| \{ `intensity?`: `number`; `show?`: `boolean`; \}

Atmosphere toggle or parameters

#### Union Members

`boolean`

***

##### Type Literal

\{ `intensity?`: `number`; `show?`: `boolean`; \}

##### intensity?

> `optional` **intensity?**: `number`

Intensity offset, negative weakens, positive strengthens

##### show?

> `optional` **show?**: `boolean`

Whether to show the atmosphere
