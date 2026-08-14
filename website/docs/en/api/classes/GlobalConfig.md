[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GlobalConfig

# Class: GlobalConfig

Global configuration center for the Daisy SDK.

After `configure()` is called, it affects subsequently created Daisy Engine and UI instances.

## Constructors

### Constructor

> **new GlobalConfig**(): `GlobalConfig`

#### Returns

`GlobalConfig`

## Accessors

### options

#### Get Signature

> **get** `static` **options**(): `Required`\<`Omit`\<[`DaisyConfigOptions`](../interfaces/DaisyConfigOptions.md), `"theme"` \| `"creditContainer"` \| `"creditViewport"`\>\> & `object`

Gets the current global configuration (triggers one-time initialization and style application).

##### Returns

`Required`\<`Omit`\<[`DaisyConfigOptions`](../interfaces/DaisyConfigOptions.md), `"theme"` \| `"creditContainer"` \| `"creditViewport"`\>\> & `object`

## Methods

### configure()

> `static` **configure**(`options`): `void`

Configures global defaults for subsequent create calls.

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
