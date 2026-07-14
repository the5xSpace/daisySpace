[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CzmlPlusImporter

# Class: CzmlPlusImporter

CZML+ 导入器。

支持同一实体绑定多个同类 Feature（如多条 polyline）。

## Example

```ts
const importer = new CzmlPlusImporter(viewer);
const entities = importer.load(czmlPackets);
```

## Extended by

- [`CzmlImporter`](CzmlImporter.md)

## Constructors

### Constructor

> **new CzmlPlusImporter**(`viewer`): `CzmlPlusImporter`

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`CzmlPlusImporter`

## Methods

### import()

#### Call Signature

> **import**(`czml`): [`Entity`](Entity.md)[]

##### Parameters

###### czml

`any`[]

##### Returns

[`Entity`](Entity.md)[]

#### Call Signature

> **import**(`czml`, `mode`): [`Entity`](Entity.md)[]

##### Parameters

###### czml

`any`[]

###### mode

`"daisy"`

##### Returns

[`Entity`](Entity.md)[]

#### Call Signature

> **import**(`czml`, `mode`): `Promise`\<`any`\>

##### Parameters

###### czml

`any`[]

###### mode

`"cesium"`

##### Returns

`Promise`\<`any`\>

***

### load()

#### Call Signature

> **load**(`czml`): [`Entity`](Entity.md)[]

导入 CZML/CZML+ 数据并创建/更新实体。

##### Parameters

###### czml

`any`[]

CZML 包数组（含 document 与实体包）

##### Returns

[`Entity`](Entity.md)[]

创建或更新的实体列表

##### Example

```ts
const entities = importer.load(czmlPackets);
const satellite = entities.find((e) => e.name === "sat");
```

#### Call Signature

> **load**(`czml`, `mode`): [`Entity`](Entity.md)[]

导入 CZML/CZML+ 数据并创建/更新实体。

##### Parameters

###### czml

`any`[]

CZML 包数组（含 document 与实体包）

###### mode

`"daisy"`

##### Returns

[`Entity`](Entity.md)[]

创建或更新的实体列表

##### Example

```ts
const entities = importer.load(czmlPackets);
const satellite = entities.find((e) => e.name === "sat");
```

#### Call Signature

> **load**(`czml`, `mode`): `Promise`\<`any`\>

导入 CZML/CZML+ 数据并创建/更新实体。

##### Parameters

###### czml

`any`[]

CZML 包数组（含 document 与实体包）

###### mode

`"cesium"`

##### Returns

`Promise`\<`any`\>

创建或更新的实体列表

##### Example

```ts
const entities = importer.load(czmlPackets);
const satellite = entities.find((e) => e.name === "sat");
```
