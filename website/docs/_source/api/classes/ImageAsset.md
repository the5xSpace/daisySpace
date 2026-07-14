[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ImageAsset

# Class: ImageAsset

## Constructors

### Constructor

> **new ImageAsset**(): `ImageAsset`

#### Returns

`ImageAsset`

## Methods

### clearCache()

> `static` **clearCache**(): `void`

#### Returns

`void`

***

### createFrameRegions()

> `static` **createFrameRegions**(`options`): [`ImageAssetRegion`](../interfaces/ImageAssetRegion.md)[]

#### Parameters

##### options

[`ImageAssetFrameSequenceOptions`](../interfaces/ImageAssetFrameSequenceOptions.md)

#### Returns

[`ImageAssetRegion`](../interfaces/ImageAssetRegion.md)[]

***

### crop()

> `static` **crop**(`region`): `Promise`\<`HTMLCanvasElement`\>

#### Parameters

##### region

[`ImageAssetRegion`](../interfaces/ImageAssetRegion.md)

#### Returns

`Promise`\<`HTMLCanvasElement`\>

***

### getCached()

> `static` **getCached**(`source`): `HTMLCanvasElement` \| `HTMLImageElement` \| `undefined`

#### Parameters

##### source

[`ImageAssetSource`](../types/ImageAssetSource.md)

#### Returns

`HTMLCanvasElement` \| `HTMLImageElement` \| `undefined`

***

### getCachedFrames()

> `static` **getCachedFrames**(`options`): `HTMLCanvasElement`[] \| `undefined`

#### Parameters

##### options

[`ImageAssetFrameSequenceOptions`](../interfaces/ImageAssetFrameSequenceOptions.md)

#### Returns

`HTMLCanvasElement`[] \| `undefined`

***

### isFrameSequenceSource()

> `static` **isFrameSequenceSource**(`source`): `source is ImageAssetFrameSequenceOptions`

#### Parameters

##### source

`unknown`

#### Returns

`source is ImageAssetFrameSequenceOptions`

***

### isRegionSource()

> `static` **isRegionSource**(`source`): `source is ImageAssetRegion`

#### Parameters

##### source

`unknown`

#### Returns

`source is ImageAssetRegion`

***

### isRenderable()

> `static` **isRenderable**(`source`): source is HTMLCanvasElement \| HTMLImageElement

#### Parameters

##### source

`unknown`

#### Returns

source is HTMLCanvasElement \| HTMLImageElement

***

### load()

> `static` **load**(`source`): `Promise`\<`HTMLCanvasElement` \| `HTMLImageElement`\>

#### Parameters

##### source

[`ImageAssetSource`](../types/ImageAssetSource.md)

#### Returns

`Promise`\<`HTMLCanvasElement` \| `HTMLImageElement`\>

***

### loadFrames()

> `static` **loadFrames**(`options`): `Promise`\<`HTMLCanvasElement`[]\>

#### Parameters

##### options

[`ImageAssetFrameSequenceOptions`](../interfaces/ImageAssetFrameSequenceOptions.md)

#### Returns

`Promise`\<`HTMLCanvasElement`[]\>

***

### loadImage()

> `static` **loadImage**(`source`): `Promise`\<`HTMLCanvasElement` \| `HTMLImageElement`\>

#### Parameters

##### source

`string` \| `HTMLCanvasElement` \| `HTMLImageElement`

#### Returns

`Promise`\<`HTMLCanvasElement` \| `HTMLImageElement`\>
