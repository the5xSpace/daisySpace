[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SunConeDimensionInput

# Interface: SunConeDimensionInput

日锥物理尺寸计算参数。

## Properties

### bodyRadius

> **bodyRadius**: `number`

遮挡天体半径；单位必须与 `sunRadius` 和 `centerDistance` 一致。

***

### centerDistance

> **centerDistance**: `number`

两天体中心距离，必须大于两者半径之和。

***

### sunRadius

> **sunRadius**: `number`

光源天体半径，必须大于 `bodyRadius`。
