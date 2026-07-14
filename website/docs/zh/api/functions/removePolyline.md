[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / removePolyline

# Function: removePolyline()

> **removePolyline**(`collection`, `polyline`): `void`

从 PolylineCollection 移除折线前，先摘掉原 material 引用，避免 remove 销毁共享材质。

## Parameters

### collection

`PolylineCollection` \| `undefined`

### polyline

`Polyline` \| `undefined`

## Returns

`void`
