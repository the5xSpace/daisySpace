[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateDaisyEntityLike

# Type Alias: ArcRotateDaisyEntityLike

> **ArcRotateDaisyEntityLike** = `object`

可作为环绕目标的 DaisyEntity 兼容结构。

说明：
- worldMatrix/getWorldMatrix/getCurrentMatrix/getMatrix/matrix 任意提供一种即可
- 当 worldMatrix 不可用时，可通过 getState(time) 的 position 字段回退生成平移矩阵

## Properties

### bodyAxisVectors?

> `optional` **bodyAxisVectors?**: `object`

#### x

> **x**: `Daisy.Cartesian3`

#### y

> **y**: `Daisy.Cartesian3`

#### z

> **z**: `Daisy.Cartesian3`

***

### boundingSphereRadius?

> `optional` **boundingSphereRadius?**: `number`

***

### checkTimeValid?

> `optional` **checkTimeValid?**: (`time`) => `boolean`

#### Parameters

##### time

`Daisy.JulianDate`

#### Returns

`boolean`

***

### getBoundingSphereRadius?

> `optional` **getBoundingSphereRadius?**: () => `number` \| `undefined`

#### Returns

`number` \| `undefined`

***

### getCurrentMatrix?

> `optional` **getCurrentMatrix?**: (`time?`) => `Daisy.Matrix4` \| `undefined`

#### Parameters

##### time?

`Daisy.JulianDate`

#### Returns

`Daisy.Matrix4` \| `undefined`

***

### getMatrix?

> `optional` **getMatrix?**: (`time?`) => `Daisy.Matrix4` \| `undefined`

#### Parameters

##### time?

`Daisy.JulianDate`

#### Returns

`Daisy.Matrix4` \| `undefined`

***

### getState?

> `optional` **getState?**: (`time`) => `any`

#### Parameters

##### time

`Daisy.JulianDate`

#### Returns

`any`

***

### getWorldMatrix?

> `optional` **getWorldMatrix?**: (`time?`) => `Daisy.Matrix4` \| `undefined`

#### Parameters

##### time?

`Daisy.JulianDate`

#### Returns

`Daisy.Matrix4` \| `undefined`

***

### matrix?

> `optional` **matrix?**: `Daisy.Matrix4`

***

### tryGetWorldMatrix?

> `optional` **tryGetWorldMatrix?**: (`time?`) => `Daisy.Matrix4` \| `undefined`

#### Parameters

##### time?

`Daisy.JulianDate`

#### Returns

`Daisy.Matrix4` \| `undefined`

***

### worldMatrix?

> `optional` **worldMatrix?**: `Daisy.Matrix4`
