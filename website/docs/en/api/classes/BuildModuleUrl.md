[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BuildModuleUrl

# Class: BuildModuleUrl

Builds resource URLs relative to the SDK distribution directory.

Automatically derives the SDK's baseUrl under different loading methods,
and concatenates relative paths into usable resource addresses.

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

Gets the current baseUrl.

On first access, it automatically detects:
- In browser environments, it prefers the current script tag's `src`
- Falls back to `document.baseURI` when no script is found

##### Returns

`string`

## Methods

### getUrl()

> `static` **getUrl**(`path`): `string`

Converts a relative resource path to a fully usable URL.

#### Parameters

##### path

`string`

Resource path; returns as-is if it is a complete URL (http/https/data/blob)

#### Returns

`string`

***

### setBaseUrl()

> `static` **setBaseUrl**(`baseUrl`): `void`

Manually sets the baseUrl.

#### Parameters

##### baseUrl

`string`

Resource root path; it is recommended to end with `/`, e.g., `/sdk/dist/`

#### Returns

`void`
