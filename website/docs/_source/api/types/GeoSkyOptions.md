[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoSkyOptions

# Type Alias: GeoSkyOptions

> **GeoSkyOptions** = \{ `type`: [`Default`](../enums/GeoSkyType.md#default); \} \| \{ `type`: [``](../enums/GeoSkyType.md#cesium); \} \| \{ `type`: [`None`](../enums/GeoSkyType.md#none); \} \| \{ `sources`: \{ `negativeX`: `string`; `negativeY`: `string`; `negativeZ`: `string`; `positiveX`: `string`; `positiveY`: `string`; `positiveZ`: `string`; \}; `type`: [`SkyBox`](../enums/GeoSkyType.md#skybox); \}

天空效果配置

## Union Members

### Type Literal

\{ `type`: [`Default`](../enums/GeoSkyType.md#default); \}

#### type

> **type**: [`Default`](../enums/GeoSkyType.md#default)

天空类型：默认天空

***

### Type Literal

\{ `type`: [``](../enums/GeoSkyType.md#cesium); \}

#### type

> **type**: [``](../enums/GeoSkyType.md#cesium)

天空类型： 天空盒

***

### Type Literal

\{ `type`: [`None`](../enums/GeoSkyType.md#none); \}

#### type

> **type**: [`None`](../enums/GeoSkyType.md#none)

天空类型：关闭天空

***

### Type Literal

\{ `sources`: \{ `negativeX`: `string`; `negativeY`: `string`; `negativeZ`: `string`; `positiveX`: `string`; `positiveY`: `string`; `positiveZ`: `string`; \}; `type`: [`SkyBox`](../enums/GeoSkyType.md#skybox); \}

#### sources

> **sources**: `object`

SkyBox 六面贴图资源

##### sources.negativeX

> **negativeX**: `string`

左侧贴图

##### sources.negativeY

> **negativeY**: `string`

下侧贴图

##### sources.negativeZ

> **negativeZ**: `string`

后侧贴图

##### sources.positiveX

> **positiveX**: `string`

右侧贴图

##### sources.positiveY

> **positiveY**: `string`

上侧贴图

##### sources.positiveZ

> **positiveZ**: `string`

前侧贴图

#### type

> **type**: [`SkyBox`](../enums/GeoSkyType.md#skybox)

天空类型：自定义天空盒
