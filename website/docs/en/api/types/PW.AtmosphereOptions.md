[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / AtmosphereOptions

# Type Alias: AtmosphereOptions

> **AtmosphereOptions** = `{ atmosphereRadius: number; mieAnisotropy: number; mieScaleHeight: number; mieScattering: Daisy.Cartesian3; planetRadius: number; rayleighScaleHeight: number; rayleighScattering: Daisy.Cartesian3 }`

Collection of atmospheric physical parameters

- All length units are in meters
- Scattering and absorption coefficients are per-channel coefficient vectors
- mieAnisotropy range is [-1, 1]; commonly 0.7–0.9

## Properties

### absorption?

> `optional` **absorption?**: `Daisy.Cartesian3`

Absorption coefficient (RGB channel coefficients). Optional; defaults to all zeros.

***

### atmosphereRadius

> **atmosphereRadius**: `number`

Outer radius of the atmosphere layer (meters). Determines the mask extent.

***

### intensity?

> `optional` **intensity?**: `number`

Intensity offset. Negative values weaken, positive values strengthen; commonly in the range [-1, 1].

***

### mieAnisotropy

> **mieAnisotropy**: `number`

Mie phase function anisotropy coefficient g. Range [-1, 1]; values closer to 1 indicate strong forward scattering.

***

### mieScaleHeight

> **mieScaleHeight**: `number`

Mie scattering scale height Hm (meters). Affects the rate at which forward scattering decays with altitude.

***

### mieScattering

> **mieScattering**: `Daisy.Cartesian3`

Mie scattering coefficient (RGB channel coefficients).

***

### planetRadius

> **planetRadius**: `number`

Planet radius (meters). Used to determine the surface position.

***

### rayleighScaleHeight

> **rayleighScaleHeight**: `number`

Rayleigh scattering scale height Hr (meters). Affects the rate at which blue scattering intensity decays with altitude.

***

### rayleighScattering

> **rayleighScattering**: `Daisy.Cartesian3`

Rayleigh scattering coefficient (RGB channel coefficients).

***

### steps?

> `optional` **steps?**: `number`

Sampling step count (integer, ≥ 1). Affects visual quality and performance. Defaults to 12.
