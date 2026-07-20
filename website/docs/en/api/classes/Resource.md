[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Resource

# Class: Resource

Resource registry.

Used to centrally manage tokens/keys required by third-party geographic services,
avoiding direct exposure of authentication information in any Options.

## Example

```ts
Daisy.Resource.setCesiumIonToken("your-token");
Daisy.Resource.setArcGisKey("your-key");
```

## Constructors

### Constructor

> **new Resource**(): `Resource`

#### Returns

`Resource`

## Methods

### get()

> `static` **get**(`key`): `string` \| `undefined`

Get resource credentials.

#### Parameters

##### key

`"cesium-ion"` \| `"arcgis"`

#### Returns

`string` \| `undefined`

#### Example

```ts
const token = Daisy.Resource.get("cesium-ion");
```

***

### setArcGisKey()

> `static` **setArcGisKey**(`key`): `void`

Set ArcGIS Key.

#### Parameters

##### key

`string`

#### Returns

`void`

#### Example

```ts
Daisy.Resource.setArcGisKey("your-key");
```

***

### setCesiumIonToken()

> `static` **setCesiumIonToken**(`token`): `void`

Set Ion asset Token.

#### Parameters

##### token

`string`

#### Returns

`void`

#### Example

```ts
Daisy.Resource.setCesiumIonToken("your-token");
```
