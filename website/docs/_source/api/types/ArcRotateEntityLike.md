[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateEntityLike

# Type Alias: ArcRotateEntityLike

> **ArcRotateEntityLike** = `{ bodyAxis: object; boundingSphere: object; worldMatrix: Daisy.Matrix4 }`

可作为环绕目标的“兼容对象”（偏底层风格）。

最少需要：
- worldMatrix：目标在世界坐标系下的变换

## Properties

### bodyAxis

> **bodyAxis**: `object`

#### x

> **x**: `Daisy.Cartesian3`

#### y

> **y**: `Daisy.Cartesian3`

#### z

> **z**: `Daisy.Cartesian3`

***

### boundingSphere

> **boundingSphere**: `object`

#### radius

> **radius**: `number`

***

### worldMatrix

> **worldMatrix**: `Daisy.Matrix4`
