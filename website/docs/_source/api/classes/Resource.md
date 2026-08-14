[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Resource

# Class: Resource

资源注册中心。

用于统一管理第三方地理服务所需的 token、key 与默认地址，
避免在任何影像 Options 中重复携带认证信息。

## Constructors

### Constructor

> **new Resource**(): `Resource`

#### Returns

`Resource`

## Methods

### clear()

> `static` **clear**(): `void`

清除所有第三方资源配置，主要用于测试和应用退出。

#### Returns

`void`

***

### configure()

> `static` **configure**(`options`): `void`

批量配置第三方地图资源。空字符串会清除已有配置。

#### Parameters

##### options

[`ThirdPartyResourceOptions`](../interfaces/ThirdPartyResourceOptions.md)

#### Returns

`void`

***

### get()

> `static` **get**(`key`): `string` \| `undefined`

获取资源凭据。

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

获取当前第三方资源配置快照；调用方应按敏感凭据处理返回值。

#### Returns

[`ThirdPartyResourceOptions`](../interfaces/ThirdPartyResourceOptions.md)

***

### setArcGisKey()

> `static` **setArcGisKey**(`key?`): `void`

设置 ArcGIS Key。

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

ArcGIS 方法名的大小写别名。

#### Parameters

##### key?

`string`

#### Returns

`void`

***

### setArcGisUrl()

> `static` **setArcGisUrl**(`url?`): `void`

设置 ArcGIS 默认 MapServer 地址。

#### Parameters

##### url?

`string`

#### Returns

`void`

***

### setCesiumIonToken()

> `static` **setCesiumIonToken**(`token?`): `void`

设置 Ion 资产 Token。

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

设置 OpenStreetMap 或兼容服务的 key。

#### Parameters

##### key?

`string`

#### Returns

`void`

***

### setOpenStreetMapUrl()

> `static` **setOpenStreetMapUrl**(`url?`): `void`

设置 OpenStreetMap 或兼容服务地址。

#### Parameters

##### url?

`string`

#### Returns

`void`
