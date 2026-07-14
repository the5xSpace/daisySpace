[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyBuiltinMaterialOptions

# Type Alias: DaisyBuiltinMaterialOptions

> **DaisyBuiltinMaterialOptions** = [`SolidMaterialOptions`](SolidMaterialOptions.md) \| \{ `channel?`: `string`; `channels?`: `string`; `color?`: [`DColor`](DColor.md); `image?`: `string` \| `HTMLImageElement` \| `HTMLCanvasElement`; `maximumHeight?`: `number`; `minimumHeight?`: `number`; `repeat?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `strength?`: `number`; \} \| [`GridMaterialOptions`](GridMaterialOptions.md) \| [`CheckerboardMaterialOptions`](CheckerboardMaterialOptions.md) \| [`StripeMaterialOptions`](StripeMaterialOptions.md) \| [`DotMaterialOptions`](DotMaterialOptions.md) \| \{ `amplitude?`: `number`; `animationSpeed?`: `number`; `baseWaterColor?`: [`DColor`](DColor.md); `blendColor?`: [`DColor`](DColor.md); `frequency?`: `number`; `normalMap?`: `string`; `specularIntensity?`: `number`; `specularMap?`: `string`; \} \| \{ `color?`: [`DColor`](DColor.md); `rimColor?`: [`DColor`](DColor.md); `width?`: `number`; \} \| \{ `fadeDirection?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `fadeInColor?`: [`DColor`](DColor.md); `fadeOutColor?`: [`DColor`](DColor.md); `maximumDistance?`: `number`; `repeat?`: `boolean`; `time?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; \} \| \{ `color?`: [`DColor`](DColor.md); `dashLength?`: `number`; `dashPattern?`: `number`; `gapColor?`: [`DColor`](DColor.md); `glowPower?`: `number`; `outlineColor?`: [`DColor`](DColor.md); `outlineWidth?`: `number`; `taperPower?`: `number`; \} \| \{ `alpha?`: `number`; `color?`: [`DColor`](DColor.md); `contourColor?`: [`DColor`](DColor.md); `contourWidth?`: `number`; `spacing?`: `number`; `width?`: `number`; \} \| \{ `colors?`: `string` \| `HTMLCanvasElement`; `heights?`: `string` \| `HTMLCanvasElement`; `landColor?`: [`DColor`](DColor.md); `waterColor?`: [`DColor`](DColor.md); \}

`MaterialFactory.Builtin()` 接受的内置材质参数联合类型。

## Union Members

[`SolidMaterialOptions`](SolidMaterialOptions.md)

***

### Type Literal

\{ `channel?`: `string`; `channels?`: `string`; `color?`: [`DColor`](DColor.md); `image?`: `string` \| `HTMLImageElement` \| `HTMLCanvasElement`; `maximumHeight?`: `number`; `minimumHeight?`: `number`; `repeat?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `strength?`: `number`; \}

#### channel?

> `optional` **channel?**: `string`

参与标量采样的单个通道，例如 `a` 或 `r`。

#### channels?

> `optional` **channels?**: `string`

参与颜色采样的通道组合，例如 `rgb`。

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

纹理混合颜色。

#### image?

> `optional` **image?**: `string` \| `HTMLImageElement` \| `HTMLCanvasElement`

图片 URL、图片元素或画布。

#### maximumHeight?

> `optional` **maximumHeight?**: `number`

高程映射的最大高度。

#### minimumHeight?

> `optional` **minimumHeight?**: `number`

高程映射的最小高度。

#### repeat?

> `optional` **repeat?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

纹理横纵重复次数。

#### strength?

> `optional` **strength?**: `number`

凹凸或法线效果强度。

***

[`GridMaterialOptions`](GridMaterialOptions.md)

***

[`CheckerboardMaterialOptions`](CheckerboardMaterialOptions.md)

***

[`StripeMaterialOptions`](StripeMaterialOptions.md)

***

[`DotMaterialOptions`](DotMaterialOptions.md)

***

### Type Literal

\{ `amplitude?`: `number`; `animationSpeed?`: `number`; `baseWaterColor?`: [`DColor`](DColor.md); `blendColor?`: [`DColor`](DColor.md); `frequency?`: `number`; `normalMap?`: `string`; `specularIntensity?`: `number`; `specularMap?`: `string`; \}

#### amplitude?

> `optional` **amplitude?**: `number`

波纹振幅。

#### animationSpeed?

> `optional` **animationSpeed?**: `number`

波纹动画速度。

#### baseWaterColor?

> `optional` **baseWaterColor?**: [`DColor`](DColor.md)

水体基础颜色。

#### blendColor?

> `optional` **blendColor?**: [`DColor`](DColor.md)

水面混合颜色。

#### frequency?

> `optional` **frequency?**: `number`

波纹频率。

#### normalMap?

> `optional` **normalMap?**: `string`

法线贴图 URL。

#### specularIntensity?

> `optional` **specularIntensity?**: `number`

高光强度。

#### specularMap?

> `optional` **specularMap?**: `string`

高光贴图 URL。

***

### Type Literal

\{ `color?`: [`DColor`](DColor.md); `rimColor?`: [`DColor`](DColor.md); `width?`: `number`; \}

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

表面基础颜色。

#### rimColor?

> `optional` **rimColor?**: [`DColor`](DColor.md)

边缘光颜色。

#### width?

> `optional` **width?**: `number`

边缘光宽度。

***

### Type Literal

\{ `fadeDirection?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `fadeInColor?`: [`DColor`](DColor.md); `fadeOutColor?`: [`DColor`](DColor.md); `maximumDistance?`: `number`; `repeat?`: `boolean`; `time?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; \}

#### fadeDirection?

> `optional` **fadeDirection?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

淡变方向；数字表示两个分量使用相同值。

#### fadeInColor?

> `optional` **fadeInColor?**: [`DColor`](DColor.md)

淡入端颜色。

#### fadeOutColor?

> `optional` **fadeOutColor?**: [`DColor`](DColor.md)

淡出端颜色。

#### maximumDistance?

> `optional` **maximumDistance?**: `number`

淡变计算的最大距离。

#### repeat?

> `optional` **repeat?**: `boolean`

是否循环淡变。

#### time?

> `optional` **time?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

当前淡变进度；数字表示两个分量使用相同值。

***

### Type Literal

\{ `color?`: [`DColor`](DColor.md); `dashLength?`: `number`; `dashPattern?`: `number`; `gapColor?`: [`DColor`](DColor.md); `glowPower?`: `number`; `outlineColor?`: [`DColor`](DColor.md); `outlineWidth?`: `number`; `taperPower?`: `number`; \}

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

线主体颜色。

#### dashLength?

> `optional` **dashLength?**: `number`

单个虚线周期长度。

#### dashPattern?

> `optional` **dashPattern?**: `number`

虚线位模式。

#### gapColor?

> `optional` **gapColor?**: [`DColor`](DColor.md)

虚线间隔颜色。

#### glowPower?

> `optional` **glowPower?**: `number`

发光强度。

#### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

轮廓颜色。

#### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓宽度，单位为像素。

#### taperPower?

> `optional` **taperPower?**: `number`

线端渐细强度。

***

### Type Literal

\{ `alpha?`: `number`; `color?`: [`DColor`](DColor.md); `contourColor?`: [`DColor`](DColor.md); `contourWidth?`: `number`; `spacing?`: `number`; `width?`: `number`; \}

#### alpha?

> `optional` **alpha?**: `number`

整体透明度，范围为 0 至 1。

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

基础颜色。

#### contourColor?

> `optional` **contourColor?**: [`DColor`](DColor.md)

等高线颜色。

#### contourWidth?

> `optional` **contourWidth?**: `number`

等高线宽度。

#### spacing?

> `optional` **spacing?**: `number`

等高线高程间隔。

#### width?

> `optional` **width?**: `number`

等高线宽度的兼容字段。

***

### Type Literal

\{ `colors?`: `string` \| `HTMLCanvasElement`; `heights?`: `string` \| `HTMLCanvasElement`; `landColor?`: [`DColor`](DColor.md); `waterColor?`: [`DColor`](DColor.md); \}

#### colors?

> `optional` **colors?**: `string` \| `HTMLCanvasElement`

分段颜色纹理。

#### heights?

> `optional` **heights?**: `string` \| `HTMLCanvasElement`

高程分段纹理。

#### landColor?

> `optional` **landColor?**: [`DColor`](DColor.md)

陆地区域颜色。

#### waterColor?

> `optional` **waterColor?**: [`DColor`](DColor.md)

水域颜色。
