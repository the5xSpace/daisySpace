[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / toCesiumMaterial

# Function: toCesiumMaterial()

> **toCesiumMaterial**(`material`): `Material` \| `undefined`

将 Daisy 材质输入转换为内部渲染材质实例。

- 字符串：作为图片 URL 创建图片材质
- 材质实例：复制为独立实例，避免共享对象被销毁
- Daisy 颜色对象：创建纯色材质

## Parameters

### material

[`DMaterial`](../types/DMaterial.md) \| `undefined`

材质描述

## Returns

`Material` \| `undefined`
