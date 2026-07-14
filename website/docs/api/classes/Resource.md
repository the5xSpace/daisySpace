[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Resource

# Class: Resource

资源注册中心。

用于统一管理第三方地理服务所需的 token / key，
避免在任何 Options 中直接暴露认证信息。

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

获取资源凭据。

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

设置 ArcGIS Key。

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

设置 Ion 资产 Token。

#### Parameters

##### token

`string`

#### Returns

`void`

#### Example

```ts
Daisy.Resource.setCesiumIonToken("your-token");
```
