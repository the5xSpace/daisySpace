[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Utils

# Variable: Utils

> `const` **Utils**: `object`

General utility collection.

This object is exported in a "namespace" pattern for convenient selective access.

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

Creates a temporary material used when removing a component.

When a line object is removed from a collection, it destroys its own material. Feature destruction should only release the component's reference to the business material,
must not destroy externally passed or shared materials.

#### Returns

`Material`

### generateDistinctColors

> **generateDistinctColors**: (`count`) => `string`[]

Generates N visually distinct HSL colors using golden angle offset.

The golden angle (~137.508°) ensures adjacent colors are evenly distributed on the hue wheel, avoiding color clustering.
Saturation and lightness are fixed (70%/55%), only the hue rotates, suitable for use on dark backgrounds.

#### Parameters

##### count

`number`

Number of colors to generate

#### Returns

`string`[]

HSL color string array, e.g. `["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", ...]`

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

Generates a Guid

#### Returns

`string`

### getAntiZfightingRenderState

> **getAntiZfightingRenderState**: () => `any`

#### Returns

`any`

### getComplementaryColor

> **getComplementaryColor**: (`color`) => `Color`

Calculates the complementary color (h + 180°) and slightly increases brightness.

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

HSL to RGB.

- h: angle in degrees 0~360
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

Calculates the maximum distance from the start point to all points

#### Parameters

##### startPosition

`Cartesian3`

##### positions

`Cartesian3`[]

#### Returns

`object`

position The point with the maximum distance distance The maximum distance

##### distance

> **distance**: `number`

##### position

> **position**: `Cartesian3` \| `undefined`

### removePolyline

> **removePolyline**: (`collection`, `polyline`) => `void`

Before removing a polyline from PolylineCollection, detach the original material reference to prevent remove from destroying shared materials.

#### Parameters

##### collection

`PolylineCollection` \| `undefined`

##### polyline

`Polyline` \| `undefined`

#### Returns

`void`

### removePrimitive

> **removePrimitive**: (`collection`, `primitive`) => `void`

Before removing an object from a spatial rendering collection, detach its appearance material reference.

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

RGB to HSL.

- Input and output components are all 0~1, with h in degrees 0~360

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

Converts Daisy material input into an internal rendering material instance.

- String: creates an image material from a URL
- Material instance: duplicates it as an independent instance to prevent shared objects from being destroyed
- Daisy color object: creates a solid color material

#### Parameters

##### material

[`DMaterial`](../types/DMaterial.md) \| `undefined`

Material description

#### Returns

`Material` \| `undefined`

### worldToDrawingBufferCoordinates

> **worldToDrawingBufferCoordinates**: `any`

Converts world coordinates to drawingBuffer coordinates (pixels).

Converts world coordinates to drawing buffer coordinates, compatible with different implementation method names across runtime versions.

### worldToWindowCoordinate

> **worldToWindowCoordinate**: `any`

Converts world coordinates to window coordinates (pixels).

Converts world coordinates to window coordinates, compatible with different implementation method names across runtime versions.
