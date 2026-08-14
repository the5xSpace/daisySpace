[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GlobalConfig

# Class: GlobalConfig

Daisy SDK 全局配置中心。

通过 `configure()` 设置后，会影响后续创建的 Daisy Engine 与 UI。

## Constructors

### Constructor

> **new GlobalConfig**(): `GlobalConfig`

#### Returns

`GlobalConfig`

## Accessors

### options

#### Get Signature

> **get** `static` **options**(): `Required`\<`Omit`\<[`DaisyConfigOptions`](../interfaces/DaisyConfigOptions.md), `"theme"` \| `"creditContainer"` \| `"creditViewport"`\>\> & `object`

获取当前全局配置（会触发一次性初始化与样式应用）。

##### Returns

`Required`\<`Omit`\<[`DaisyConfigOptions`](../interfaces/DaisyConfigOptions.md), `"theme"` \| `"creditContainer"` \| `"creditViewport"`\>\> & `object`

## Methods

### configure()

> `static` **configure**(`options`): `void`

配置全局默认参数（对后续 create 生效）。

#### Parameters

##### options

[`DaisyConfigOptions`](../interfaces/DaisyConfigOptions.md)

#### Returns

`void`

#### Example

```ts
Daisy.GlobalConfig.configure({
 timeFormat: { format: "YYYY-MM-DD HH:mm:ss TZ", utcOffsetHours: 8 },
});
```
