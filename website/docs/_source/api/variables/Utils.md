[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Utils

# Variable: Utils

> `const` **Utils**: `object`

通用工具集合。

该对象以“命名空间”形式导出，便于使用方按需调用。

## Type Declaration

### clampLineWidth

> **clampLineWidth**: (`lineWidth`, `viewer?`) => `number`

#### Parameters

##### lineWidth

`number` \| `undefined`

##### viewer?

`any`

#### Returns

`number`

### createDisposableDetachMaterial

> **createDisposableDetachMaterial**: () => `Material`

创建一个组件移除时使用的临时材质。

线对象从集合移除时会销毁自身挂载的材质。Feature 销毁只应解除组件对业务材质的引用，
不能销毁外部传入或多处共享的材质。

#### Returns

`Material`

### generateDistinctColors

> **generateDistinctColors**: (`count`) => `string`[]

使用黄金角偏移生成 N 个视觉区分度高的 HSL 颜色。

黄金角（~137.508°）确保相邻颜色在色环上均匀分布，避免颜色聚集。
饱和度和亮度固定（70%/55%），仅旋转色相，适合在深色背景上使用。

#### Parameters

##### count

`number`

生成颜色数量

#### Returns

`string`[]

HSL 颜色字符串数组，如 `["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", ...]`

#### Example

```ts
const colors = Utils.generateDistinctColors(5);
// ["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", "hsl(275, 70%, 55%)", ...]

// 用于为列表项分配唯一颜色
items.forEach((item, i) => {
 item.color = colors[i % colors.length];
});
```

### GenGuid

> **GenGuid**: () => `string`

生成一个Guid

#### Returns

`string`

### getAntiZfightingRenderState

> **getAntiZfightingRenderState**: () => `any`

#### Returns

`any`

### getComplementaryColor

> **getComplementaryColor**: (`color`) => `Color`

计算补色（h + 180°），并轻微提亮亮度。

#### Parameters

##### color

`Color`

#### Returns

`Color`

### getMarsPositionECEF

> **getMarsPositionECEF**: (`time?`, `result?`) => `Cartesian3`

#### Parameters

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3`

### getMarsPositionICRF

> **getMarsPositionICRF**: (`time?`, `result?`) => `Cartesian3`

#### Parameters

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3`

### getMoonPositionECEF

> **getMoonPositionECEF**: (`time?`, `result?`) => `Cartesian3`

#### Parameters

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3`

### getMoonRotationMatrix

> **getMoonRotationMatrix**: (`time?`, `result?`) => `Matrix3`

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix3`

#### Returns

`Matrix3`

### getSunPositionECEF

> **getSunPositionECEF**: (`time?`, `result?`) => `Cartesian3`

#### Parameters

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3`

### hslToRgb

> **hslToRgb**: (`hsl`) => `Color`

HSL 转 RGB。

- h: 角度制 0~360
- s/l/a: 0~1

#### Parameters

##### hsl

[`HslColor`](../types/HslColor.md)

#### Returns

`Color`

### icrfToEcef

> **icrfToEcef**: (`cartesianInertial`, `time?`, `result?`) => `Cartesian3`

#### Parameters

##### cartesianInertial

`Cartesian3`

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3`

### isDaisyMaterialDescriptor

> **isDaisyMaterialDescriptor**: (`material`) => `material is DaisyMaterialDescriptor`

#### Parameters

##### material

`unknown`

#### Returns

`material is DaisyMaterialDescriptor`

### isFiniteCartesian3

> **isFiniteCartesian3**: (`v`) => `v is Cartesian3`

#### Parameters

##### v

`any`

#### Returns

`v is Cartesian3`

### maxDistancePosition

> **maxDistancePosition**: (`startPosition`, `positions`) => `object`

计算距离起始点到所有点之间的最大距离

#### Parameters

##### startPosition

`Cartesian3`

##### positions

`Cartesian3`[]

#### Returns

`object`

position 最大距离的点 distance 最大距离

##### distance

> **distance**: `number`

##### position

> **position**: `Cartesian3` \| `undefined`

### removePolyline

> **removePolyline**: (`collection`, `polyline`) => `void`

从 PolylineCollection 移除折线前，先摘掉原 material 引用，避免 remove 销毁共享材质。

#### Parameters

##### collection

`PolylineCollection` \| `undefined`

##### polyline

`Polyline` \| `undefined`

#### Returns

`void`

### removePrimitive

> **removePrimitive**: (`collection`, `primitive`) => `void`

从空间渲染集合移除对象前，摘掉其外观材质引用。

#### Parameters

##### collection

`PrimitiveCollection` \| `undefined`

##### primitive

\{ `appearance?`: \{ `material?`: `Material`; \}; \} \| `undefined`

#### Returns

`void`

### resolveThenable

> **resolveThenable**: \<`T`\>(`value`) => `Promise`\<`T`\>

#### Type Parameters

##### T

`T`

#### Parameters

##### value

`T`

#### Returns

`Promise`\<`T`\>

### rgbToHsl

> **rgbToHsl**: (`color`) => [`HslColor`](../types/HslColor.md)

RGB 转 HSL。

- 输入与输出分量均为 0~1，h 为角度制 0~360

#### Parameters

##### color

`Color`

#### Returns

[`HslColor`](../types/HslColor.md)

### toCartesian3

> **toCartesian3**: (`input`, `ellipsoid?`) => `Cartesian3` \| `undefined`

#### Parameters

##### input

`any`

##### ellipsoid?

`Ellipsoid`

#### Returns

`Cartesian3` \| `undefined`

### toCartesian3Array

> **toCartesian3Array**: (`input`, `ellipsoid?`) => `Cartesian3`[] \| `undefined`

#### Parameters

##### input

`any`

##### ellipsoid?

`Ellipsoid`

#### Returns

`Cartesian3`[] \| `undefined`

### toCesiumColor

> **toCesiumColor**: \{(`color`): `Color`; (`color`): `Color` \| `undefined`; (`color`, `defaultColor`): `Color`; \}

#### Call Signature

> (`color`): `Color`

##### Parameters

###### color

[`DColor`](../types/DColor.md)

##### Returns

`Color`

#### Call Signature

> (`color`): `Color` \| `undefined`

##### Parameters

###### color

[`DColor`](../types/DColor.md) \| `undefined`

##### Returns

`Color` \| `undefined`

#### Call Signature

> (`color`, `defaultColor`): `Color`

##### Parameters

###### color

[`DColor`](../types/DColor.md) \| `undefined`

###### defaultColor

`Color`

##### Returns

`Color`

### toCesiumMaterial

> **toCesiumMaterial**: (`material`) => `Material` \| `undefined`

将 Daisy 材质输入转换为内部渲染材质实例。

- 字符串：作为图片 URL 创建图片材质
- 材质实例：复制为独立实例，避免共享对象被销毁
- Daisy 颜色对象：创建纯色材质

#### Parameters

##### material

[`DMaterial`](../types/DMaterial.md) \| `undefined`

材质描述

#### Returns

`Material` \| `undefined`

### worldToDrawingBufferCoordinates

> **worldToDrawingBufferCoordinates**: `any`

将世界坐标转换为 drawingBuffer 坐标（像素）。

将世界坐标转换为绘制缓冲区坐标，并兼容运行时不同版本的实现方法名。

### worldToWindowCoordinate

> **worldToWindowCoordinate**: `any`

将世界坐标转换为窗口坐标（像素）。

将世界坐标转换为窗口坐标，并兼容运行时不同版本的实现方法名。
