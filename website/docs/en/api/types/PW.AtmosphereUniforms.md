[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / AtmosphereUniforms

# Type Alias: AtmosphereUniforms

> **AtmosphereUniforms** = `{ u\_absorption: Daisy.Cartesian3; u\_atmosphereRadius: number; u\_intensity: number; u\_mieG: number; u\_mieScaleHeight: number; u\_mieScattering: Daisy.Cartesian3; u\_planetRadius: number; u\_rayleighScaleHeight: number; u\_rayleighScattering: Daisy.Cartesian3; u\_steps: number }`

Shader uniforms mapping

- Runtime values that correspond one-to-one with AtmosphereOptions
- Used directly by material fabric.uniforms

## Properties

### u\_absorption

> **u\_absorption**: `Daisy.Cartesian3`

Absorption coefficient (RGB channel coefficients)

***

### u\_atmosphereRadius

> **u\_atmosphereRadius**: `number`

Atmospheric layer radius (meters)

***

### u\_intensity

> **u\_intensity**: `number`

Intensity offset: negative values reduce, positive values enhance

***

### u\_mieG

> **u\_mieG**: `number`

Mie phase function anisotropy coefficient g, [-1, 1]

***

### u\_mieScaleHeight

> **u\_mieScaleHeight**: `number`

Mie scattering scale height Hm (meters)

***

### u\_mieScattering

> **u\_mieScattering**: `Daisy.Cartesian3`

Mie scattering coefficient (RGB channel coefficients)

***

### u\_planetRadius

> **u\_planetRadius**: `number`

Planetary radius (meters)

***

### u\_rayleighScaleHeight

> **u\_rayleighScaleHeight**: `number`

Rayleigh scattering scale height Hr (meters)

***

### u\_rayleighScattering

> **u\_rayleighScattering**: `Daisy.Cartesian3`

Rayleigh scattering coefficient (RGB channel coefficients)

***

### u\_steps

> **u\_steps**: `number`

Sample steps (integer, >=1)
