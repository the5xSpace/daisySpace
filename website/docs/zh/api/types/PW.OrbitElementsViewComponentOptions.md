[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / OrbitElementsViewComponentOptions

# Type Alias: OrbitElementsViewComponentOptions

> **OrbitElementsViewComponentOptions** = `object`

## Properties

### alwaysOnTop?

> `optional` **alwaysOnTop?**: `boolean`

***

### angleArcMaterial?

> `optional` **angleArcMaterial?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### apsidesLineMaterial?

> `optional` **apsidesLineMaterial?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### ~~earthTransparencyAlpha?~~

> `optional` **earthTransparencyAlpha?**: `number`

#### Deprecated

Use `referenceBodyTransparency`.

***

### equatorDiskMaterial?

> `optional` **equatorDiskMaterial?**: [`DColor`](DColor.md)

赤道面填充色，默认半透明黄色

***

### equatorMaterial?

> `optional` **equatorMaterial?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### material?

> `optional` **material?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### minEccentricityForApsides?

> `optional` **minEccentricityForApsides?**: `number`

***

### name?

> `optional` **name?**: `string`

***

### nodeLineMaterial?

> `optional` **nodeLineMaterial?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### orbitPeriodSeconds?

> `optional` **orbitPeriodSeconds?**: `number`

***

### orbitPlaneMaterial?

> `optional` **orbitPlaneMaterial?**: [`DColor`](DColor.md)

轨道面填充色，默认半透明青色

***

### radiusVectorMaterial?

> `optional` **radiusVectorMaterial?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### referenceAxisMaterial?

> `optional` **referenceAxisMaterial?**: [`PolylineOptions`](PolylineOptions.md)\[`"material"`\]

***

### referenceBodyTransparency?

> `optional` **referenceBodyTransparency?**: `number`

Reference body opacity used while the explanatory diagram is active.
`0` is fully transparent and `1` is fully opaque.

***

### resampleIntervalSeconds?

> `optional` **resampleIntervalSeconds?**: `number`

Preferred semantic name for the interval between geometry rebuilds.

***

### ~~resampleSeconds?~~

> `optional` **resampleSeconds?**: `number`

#### Deprecated

Use `resampleIntervalSeconds`.

***

### ~~sampleStepSeconds?~~

> `optional` **sampleStepSeconds?**: `number`

#### Deprecated

Use `samplingStepSeconds`.

***

### samplingStepSeconds?

> `optional` **samplingStepSeconds?**: `number`

Preferred semantic name for the orbit geometry sampling step.

***

### show?

> `optional` **show?**: `boolean`

***

### showAngleArcs?

> `optional` **showAngleArcs?**: `boolean`

***

### showApsidesLine?

> `optional` **showApsidesLine?**: `boolean`

***

### showDiagramLabels?

> `optional` **showDiagramLabels?**: `boolean`

***

### showEquatorCircle?

> `optional` **showEquatorCircle?**: `boolean`

***

### showEquatorOutline?

> `optional` **showEquatorOutline?**: `boolean`

***

### showNodeLine?

> `optional` **showNodeLine?**: `boolean`

***

### showOrbitPlane?

> `optional` **showOrbitPlane?**: `boolean`

***

### showRadiusVector?

> `optional` **showRadiusVector?**: `boolean`

***

### showReferenceAxes?

> `optional` **showReferenceAxes?**: `boolean`

***

### width?

> `optional` **width?**: `number`
