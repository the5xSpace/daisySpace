[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BuildModuleUrl

# Class: BuildModuleUrl

构建以 SDK 发布目录为基准的资源 URL。

用于在不同加载方式下自动推导 SDK 的 baseUrl，
并将相对路径拼接成可用的资源地址。

## Example

```ts
BuildModuleUrl.setBaseUrl("/sdk/dist/");
const wasmUrl = BuildModuleUrl.getUrl("wasm/release.wasm");
```

## Constructors

### Constructor

> **new BuildModuleUrl**(): `BuildModuleUrl`

#### Returns

`BuildModuleUrl`

## Accessors

### baseUrl

#### Get Signature

> **get** `static` **baseUrl**(): `string`

获取当前 baseUrl。

首次访问时会自动探测：
- 浏览器环境优先使用当前 script 标签的 `src`
- 找不到 script 时回退到 `document.baseURI`

##### Returns

`string`

## Methods

### getUrl()

> `static` **getUrl**(`path`): `string`

将资源相对路径转换为完整可用的 URL。

#### Parameters

##### path

`string`

资源路径；若为完整 URL（http/https/data/blob）会原样返回

#### Returns

`string`

***

### setBaseUrl()

> `static` **setBaseUrl**(`baseUrl`): `void`

手动指定 baseUrl。

#### Parameters

##### baseUrl

`string`

资源根路径，建议以 `/` 结尾，例如 `/sdk/dist/`

#### Returns

`void`
