[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CzmlPlusImporter

# Class: CzmlPlusImporter

CZML+ importer.

Supports binding multiple identical Features (e.g., multiple polylines) to the same entity.

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

Imports CZML/CZML+ data and creates/updates entities.

##### Parameters

###### czml

`any`[]

Array of CZML packets (including document and entity packets)

##### Returns

[`Entity`](Entity.md)[]

List of created or updated entities

##### Example

```ts
const entities = importer.load(czmlPackets);
const satellite = entities.find((e) => e.name === "sat");
```

#### Call Signature

> **load**(`czml`, `mode`): [`Entity`](Entity.md)[]

Imports CZML/CZML+ data and creates/updates entities.

##### Parameters

###### czml

`any`[]

Array of CZML packets (including document and entity packets)

###### mode

`"daisy"`

##### Returns

[`Entity`](Entity.md)[]

List of created or updated entities

##### Example

```ts
const entities = importer.load(czmlPackets);
const satellite = entities.find((e) => e.name === "sat");
```

#### Call Signature

> **load**(`czml`, `mode`): `Promise`\<`any`\>

Imports CZML/CZML+ data and creates/updates entities.

##### Parameters

###### czml

`any`[]

Array of CZML packets (including document and entity packets)

###### mode

`"cesium"`

##### Returns

`Promise`\<`any`\>

List of created or updated entities

##### Example

```ts
const entities = importer.load(czmlPackets);
const satellite = entities.find((e) => e.name === "sat");
```
