[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / toCesiumColor

# Function: toCesiumColor()

将 Daisy 颜色输入转换为内部颜色值。

## Param

**color**

Daisy 颜色对象或 CSS 颜色字符串，例如 `#ff0`、`#ffff00`、`rgba(...)`。

## Param

**defaultColor**

当 `color` 为空时返回的默认值。

## Call Signature

> **toCesiumColor**(`color`): `Color`

### Parameters

#### color

[`DColor`](../types/DColor.md)

### Returns

`Color`

## Call Signature

> **toCesiumColor**(`color`): `Color` \| `undefined`

### Parameters

#### color

[`DColor`](../types/DColor.md) \| `undefined`

### Returns

`Color` \| `undefined`

## Call Signature

> **toCesiumColor**(`color`, `defaultColor`): `Color`

### Parameters

#### color

[`DColor`](../types/DColor.md) \| `undefined`

#### defaultColor

`Color`

### Returns

`Color`
