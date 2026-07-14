[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CzmlImporter

# Class: CzmlImporter

CZML 导入器。

同类 Feature 仅保留首条（符合标准 CZML 约束）。

## Example

```ts
const importer = new CzmlImporter(viewer);
const entities = importer.load(czmlPackets);
```

## Extends

- [`CzmlPlusImporter`](CzmlPlusImporter.md)

## Constructors

### Constructor

> **new CzmlImporter**(`viewer`): `CzmlImporter`

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`CzmlImporter`

#### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`constructor`](CzmlPlusImporter.md#constructor)

## Methods

### import()

#### Call Signature

> **import**(`czml`): [`Entity`](Entity.md)[]

##### Parameters

###### czml

`any`[]

##### Returns

[`Entity`](Entity.md)[]

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`import`](CzmlPlusImporter.md#import)

#### Call Signature

> **import**(`czml`, `mode`): [`Entity`](Entity.md)[]

##### Parameters

###### czml

`any`[]

###### mode

`"daisy"`

##### Returns

[`Entity`](Entity.md)[]

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`import`](CzmlPlusImporter.md#import)

#### Call Signature

> **import**(`czml`, `mode`): `Promise`\<`any`\>

##### Parameters

###### czml

`any`[]

###### mode

`"cesium"`

##### Returns

`Promise`\<`any`\>

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`import`](CzmlPlusImporter.md#import)

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

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`load`](CzmlPlusImporter.md#load)

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

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`load`](CzmlPlusImporter.md#load)

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

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`load`](CzmlPlusImporter.md#load)
