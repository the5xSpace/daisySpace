[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CzmlImporter

# Class: CzmlImporter

CZML importer.

Only the first instance of identical Features is kept (per standard CZML constraints).

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

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`load`](CzmlPlusImporter.md#load)

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

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`load`](CzmlPlusImporter.md#load)

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

##### Inherited from

[`CzmlPlusImporter`](CzmlPlusImporter.md).[`load`](CzmlPlusImporter.md#load)
