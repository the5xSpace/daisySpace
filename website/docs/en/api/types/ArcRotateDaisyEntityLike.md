[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateDaisyEntityLike

# Type Alias: ArcRotateDaisyEntityLike

> **ArcRotateDaisyEntityLike** = `object`

DaisyEntity-compatible structure that can be used as an orbit target.

Description:
- Any one of worldMatrix/getWorldMatrix/getCurrentMatrix/getMatrix/matrix is sufficient
- When worldMatrix is unavailable, a translation matrix can be generated from the position field of getState(time)

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
