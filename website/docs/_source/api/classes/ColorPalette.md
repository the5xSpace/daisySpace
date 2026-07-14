[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ColorPalette

# Class: ColorPalette

## Constructors

### Constructor

> **new ColorPalette**(): `ColorPalette`

#### Returns

`ColorPalette`

## Methods

### generateWidgetPalette()

> `static` **generateWidgetPalette**(`input?`, `mode?`): [`WidgetPalette`](../interfaces/WidgetPalette.md)

#### Parameters

##### input?

`string` \| `Color`

##### mode?

`"dark"` \| `"light"`

#### Returns

[`WidgetPalette`](../interfaces/WidgetPalette.md)

***

### getWidgetTheme()

> `static` **getWidgetTheme**(): [`WidgetPalette`](../interfaces/WidgetPalette.md)

#### Returns

[`WidgetPalette`](../interfaces/WidgetPalette.md)

***

### resolveInput()

> `static` **resolveInput**(`input?`): `string`

#### Parameters

##### input?

`string` \| `Color`

#### Returns

`string`

***

### setWidgetTheme()

> `static` **setWidgetTheme**(`input?`, `modeOrEffects?`, `effects?`): [`WidgetPalette`](../interfaces/WidgetPalette.md)

#### Parameters

##### input?

`string` \| `Color`

##### modeOrEffects?

[`WidgetThemeModeOrEffects`](../types/WidgetThemeModeOrEffects.md)

##### effects?

[`WidgetThemeEffects`](../interfaces/WidgetThemeEffects.md)

#### Returns

[`WidgetPalette`](../interfaces/WidgetPalette.md)
