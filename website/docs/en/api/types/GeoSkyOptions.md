[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoSkyOptions

# Type Alias: GeoSkyOptions

> **GeoSkyOptions** = \{ `type`: [`Default`](../enums/GeoSkyType.md#default); \} \| \{ `type`: [``](../enums/GeoSkyType.md#cesium); \} \| \{ `type`: [`None`](../enums/GeoSkyType.md#none); \} \| \{ `sources`: \{ `negativeX`: `string`; `negativeY`: `string`; `negativeZ`: `string`; `positiveX`: `string`; `positiveY`: `string`; `positiveZ`: `string`; \}; `type`: [`SkyBox`](../enums/GeoSkyType.md#skybox); \}

Sky effect configuration

## Union Members

### Type Literal

\{ `type`: [`Default`](../enums/GeoSkyType.md#default); \}

#### type

> **type**: [`Default`](../enums/GeoSkyType.md#default)

Sky type: default sky

***

### Type Literal

\{ `type`: [``](../enums/GeoSkyType.md#cesium); \}

#### type

> **type**: [``](../enums/GeoSkyType.md#cesium)

Sky type: skybox

***

### Type Literal

\{ `type`: [`None`](../enums/GeoSkyType.md#none); \}

#### type

> **type**: [`None`](../enums/GeoSkyType.md#none)

Sky type: no sky

***

### Type Literal

\{ `sources`: \{ `negativeX`: `string`; `negativeY`: `string`; `negativeZ`: `string`; `positiveX`: `string`; `positiveY`: `string`; `positiveZ`: `string`; \}; `type`: [`SkyBox`](../enums/GeoSkyType.md#skybox); \}

#### sources

> **sources**: `object`

SkyBox six-face texture resources

##### sources.negativeX

> **negativeX**: `string`

Left face texture

##### sources.negativeY

> **negativeY**: `string`

Bottom face texture

##### sources.negativeZ

> **negativeZ**: `string`

Back face texture

##### sources.positiveX

> **positiveX**: `string`

Right face texture

##### sources.positiveY

> **positiveY**: `string`

Top face texture

##### sources.positiveZ

> **positiveZ**: `string`

Front face texture

#### type

> **type**: [`SkyBox`](../enums/GeoSkyType.md#skybox)

Sky type: custom skybox