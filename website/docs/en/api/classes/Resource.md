[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Resource

# Class: Resource

Resource registry.

Used to centrally manage tokens, keys, and default URLs required by third-party geographic services,
so imagery Options do not need to carry authentication information repeatedly.

## Constructors

### Constructor

> **new Resource**(): `Resource`

#### Returns

`Resource`

## Methods

### clear()

> `static` **clear**(): `void`

Clears all third-party resource configuration, mainly for tests and application shutdown.

#### Returns

`void`

***

### configure()

> `static` **configure**(`options`): `void`

Configures third-party map resources in bulk. Empty strings clear existing values.

#### Parameters

##### options

[`ThirdPartyResourceOptions`](../interfaces/ThirdPartyResourceOptions.md)

#### Returns

`void`

***

### get()

> `static` **get**(`key`): `string` \| `undefined`

Gets a resource credential.

#### Parameters

##### key

[`ResourceKey`](../types/ResourceKey.md)

#### Returns

`string` \| `undefined`

#### Example

```ts
const token = Daisy.Resource.get("cesium-ion");
```

***

### getConfiguredResources()

> `static` **getConfiguredResources**(): [`ThirdPartyResourceOptions`](../interfaces/ThirdPartyResourceOptions.md)

Gets a snapshot of the current third-party resource configuration; callers should treat the result as sensitive credentials.

#### Returns

[`ThirdPartyResourceOptions`](../interfaces/ThirdPartyResourceOptions.md)

***

### setArcGisKey()

> `static` **setArcGisKey**(`key?`): `void`

Sets the ArcGIS Key.

#### Parameters

##### key?

`string`

#### Returns

`void`

#### Example

```ts
Daisy.Resource.setArcGisKey("your-key");
```

***

### setArcGISKey()

> `static` **setArcGISKey**(`key?`): `void`

Case alias for the ArcGIS method name.

#### Parameters

##### key?

`string`

#### Returns

`void`

***

### setArcGisUrl()

> `static` **setArcGisUrl**(`url?`): `void`

Sets the default ArcGIS MapServer URL.

#### Parameters

##### url?

`string`

#### Returns

`void`

***

### setCesiumIonToken()

> `static` **setCesiumIonToken**(`token?`): `void`

Sets the Ion asset Token.

#### Parameters

##### token?

`string`

#### Returns

`void`

#### Example

```ts
Daisy.Resource.setCesiumIonToken("your-token");
```

***

### setOpenStreetMapKey()

> `static` **setOpenStreetMapKey**(`key?`): `void`

Sets the key for OpenStreetMap or a compatible service.

#### Parameters

##### key?

`string`

#### Returns

`void`

***

### setOpenStreetMapUrl()

> `static` **setOpenStreetMapUrl**(`url?`): `void`

Sets the URL for OpenStreetMap or a compatible service.

#### Parameters

##### url?

`string`

#### Returns

`void`
