[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / MaterialFactory

# Class: MaterialFactory

统一材质工厂，提供稳定的内置材质、扩展特效材质和自定义 Shader 创建入口。

对普通几何优先使用返回 `DaisyMaterialDescriptor` 的 `Solid()`、`Builtin()` 或
`Registered()`；需要即时编译自定义源码时使用 `Custom()`。

## Constructors

### Constructor

> **new MaterialFactory**(): `MaterialFactory`

#### Returns

`MaterialFactory`

## Methods

### AlphaMap()

> `static` **AlphaMap**(`options`): `Material`

创建Alpha贴图材质

#### Parameters

##### options

配置选项

###### channel?

`string`

通道 (默认 "a")

###### image

`string`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.AlphaMap({
 image: 'alpha.jpg'
});
```

***

### AspectRamp()

> `static` **AspectRamp**(`image`): `Material`

创建坡向渐变材质

#### Parameters

##### image

`string` \| `HTMLCanvasElement`

渐变图片 (路径或Canvas)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.AspectRamp('ramp.png');
```

***

### Builtin()

> `static` **Builtin**(`type`, `options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Daisy 内置材质包装。

仅允许 Daisy 明确支持的材质类型，避免业务代码直接依赖底层材质类型字符串。

#### Parameters

##### type

[`DaisyBuiltinMaterialType`](../types/DaisyBuiltinMaterialType.md)

##### options?

[`DaisyBuiltinMaterialOptions`](../types/DaisyBuiltinMaterialOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

#### Example

```ts
const material = Daisy.MaterialFactory.Builtin("grid", {
 color: "#38bdf8",
 lineCount: { x: 12, y: 8 },
});
```

***

### BumpMap()

> `static` **BumpMap**(`options`): `Material`

创建凹凸贴图材质

#### Parameters

##### options

配置选项

###### channel?

`string`

通道 (默认 "r")

###### image

`string`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

###### strength?

`number`

强度 (默认 0.5)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.BumpMap({
 image: 'bump.jpg',
 strength: 0.8
});
```

***

### Checkerboard()

> `static` **Checkerboard**(`options`): `Material`

创建棋盘材质

#### Parameters

##### options

配置选项

###### darkColor?

[`DColor`](../types/DColor.md)

暗色

###### lightColor?

[`DColor`](../types/DColor.md)

亮色

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.Checkerboard({
 lightColor: 'white',
 darkColor: 'gray',
 repeat: 4
});
```

***

### Color()

> `static` **Color**(`color`): `Material`

创建纯色材质

#### Parameters

##### color

[`DColor`](../types/DColor.md)

Daisy 颜色对象或 CSS 颜色字符串。

#### Returns

`Material`

Daisy 材质描述

#### Example

```ts
const material = Daisy.MaterialFactory.Color(Daisy.Color.RED);
// 或者
const mat = Material.Color('#ff0000');
```

***

### Custom()

> `static` **Custom**(`type`, `uniforms`, `source`, `translucent?`): `Material`

从 Daisy GLSL 源码创建自定义材质。

直接传入包含 `daisy_*` 标识符的字符串即可自动转换，无需预先调用包装函数。

#### Parameters

##### type

`string`

当前材质实例的类型标识。

##### uniforms

`Uniforms`

Shader 使用的 uniform 参数，可包含 `ShaderParams` 动态参数。

##### source

[`MaterialShaderSource`](../types/MaterialShaderSource.md)

Daisy GLSL 材质源码。

##### translucent?

`boolean` = `true`

是否按半透明材质处理。默认 `true`。

#### Returns

`Material`

#### Example

```ts
const material = Daisy.MaterialFactory.Custom("MissionSurface", {
 color: Daisy.Color.RED,
}, `
 daisy_material daisy_getMaterial(daisy_materialInput input) {
 daisy_material material = daisy_getDefaultMaterial(input);
 material.diffuse = color.rgb;
 material.alpha = color.a;
 return material;
 }
`);
```

***

### DaisyAdvancedWater()

> `static` **DaisyAdvancedWater**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

创建高级水面材质

#### Parameters

##### options?

[`DaisyAdvancedWaterOptions`](../types/DaisyAdvancedWaterOptions.md) = `{}`

配置选项

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

DaisyMaterialDescriptor

#### Example

```ts
const mat = Material.DaisyAdvancedWater({
 baseColor: '#001428',
 surfaceColor: '#006496',
 waveSpeed: 0.8,
});
```

***

### DaisyAurora()

> `static` **DaisyAurora**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

极光帘幕材质。

#### Parameters

##### options?

[`DaisyAuroraOptions`](../types/DaisyAuroraOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyCellular()

> `static` **DaisyCellular**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

细胞/蜂窝边界材质。

#### Parameters

##### options?

[`DaisyCellularOptions`](../types/DaisyCellularOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyCircuit()

> `static` **DaisyCircuit**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

电路迹线材质。

#### Parameters

##### options?

[`DaisyCircuitOptions`](../types/DaisyCircuitOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyContourBands()

> `static` **DaisyContourBands**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

等值线分层材质。

#### Parameters

##### options?

[`DaisyContourBandsOptions`](../types/DaisyContourBandsOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyDitherFade()

> `static` **DaisyDitherFade**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Bayer 点阵渐隐材质。

#### Parameters

##### options?

[`DaisyDitherFadeOptions`](../types/DaisyDitherFadeOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyGridGlow()

> `static` **DaisyGridGlow**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

发光网格材质。

#### Parameters

##### options?

[`DaisyGridGlowOptions`](../types/DaisyGridGlowOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyHalftone()

> `static` **DaisyHalftone**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

半调网点材质。

#### Parameters

##### options?

[`DaisyHalftoneOptions`](../types/DaisyHalftoneOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyHeatmap()

> `static` **DaisyHeatmap**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

热力径向渐变材质。

#### Parameters

##### options?

[`DaisyHeatmapOptions`](../types/DaisyHeatmapOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyMarble()

> `static` **DaisyMarble**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

大理石/岩层纹理材质。

以噪声扰动正弦条带，适合抽象岩层、云纹或结构切片。

#### Parameters

##### options?

[`DaisyMarbleOptions`](../types/DaisyMarbleOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyMatrixRain()

> `static` **DaisyMatrixRain**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

矩阵雨/遥测码流材质。

#### Parameters

##### options?

[`DaisyMatrixRainOptions`](../types/DaisyMatrixRainOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyNoiseField()

> `static` **DaisyNoiseField**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

程序噪声场材质。

借鉴常见 value-noise/fbm 思路，用于云雾、能量面、信号扰动等非真实纹理表现。

#### Parameters

##### options?

[`DaisyNoiseFieldOptions`](../types/DaisyNoiseFieldOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyScanline()

> `static` **DaisyScanline**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

扫描线材质。

#### Parameters

##### options?

[`DaisyScanlineOptions`](../types/DaisyScanlineOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisySdfRings()

> `static` **DaisySdfRings**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

SDF 同心环材质。

#### Parameters

##### options?

[`DaisySdfRingsOptions`](../types/DaisySdfRingsOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyTopoRipple()

> `static` **DaisyTopoRipple**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

地形等值线与雷达涟漪混合材质。

#### Parameters

##### options?

[`DaisyTopoRippleOptions`](../types/DaisyTopoRippleOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyTurbulence()

> `static` **DaisyTurbulence**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

湍流噪声材质。

用多层绝对值噪声表现能量云、气团、非均匀信号面。

#### Parameters

##### options?

[`DaisyTurbulenceOptions`](../types/DaisyTurbulenceOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyWarpedStripes()

> `static` **DaisyWarpedStripes**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

扭曲条纹材质。

#### Parameters

##### options?

[`DaisyWarpedStripesOptions`](../types/DaisyWarpedStripesOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DiffuseMap()

> `static` **DiffuseMap**(`options`): `Material`

创建漫反射贴图材质

#### Parameters

##### options

配置选项

###### channels?

`string`

通道 (默认 "rgb")

###### image

`string`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.DiffuseMap({
 image: 'diffuse.jpg'
});
```

***

### Dot()

> `static` **Dot**(`options`): `Material`

创建点阵材质

#### Parameters

##### options

配置选项

###### darkColor?

[`DColor`](../types/DColor.md)

暗色

###### lightColor?

[`DColor`](../types/DColor.md)

亮色

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.Dot({
 lightColor: 'white',
 darkColor: 'black',
 repeat: 10
});
```

***

### DownEmitDiffuse()

> `static` **DownEmitDiffuse**(`options`): `Material`

创建向下发射漫射材质（原生材质）
静态创建，无时间轴驱动

#### Parameters

##### options

配置选项

###### bottomColor?

`string` \| `Color`

底部颜色

###### color?

`string` \| `Color`

基础颜色

###### diffusionRadius?

`number`

扩散半径

###### diffusionWidth?

`number`

扩散宽度

###### opacity?

`number`

透明度

###### speed?

`number`

速度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.DownEmitDiffuse({
 color: 'green',
 bottomColor: 'lime',
 speed: 1.5
});
```

***

### ElevationBand()

> `static` **ElevationBand**(`options`): `Material`

创建高程波段材质

#### Parameters

##### options

配置选项

###### colors

`string` \| `HTMLCanvasElement`

颜色分段 (图片或Canvas)

###### heights

`string` \| `HTMLCanvasElement`

高度分段 (图片或Canvas)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.ElevationBand({
 heights: 'heights.png',
 colors: 'colors.png'
});
```

***

### ElevationContour()

> `static` **ElevationContour**(`options`): `Material`

创建等高线材质

#### Parameters

##### options

配置选项

###### alpha?

`number`

透明度

###### color?

`string` \| `Color`

###### contourColor?

`string` \| `Color`

等高线颜色

###### contourWidth?

`number`

等高线宽度

###### spacing?

`number`

间距

###### width?

`number`

线宽

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.ElevationContour({
 contourColor: 'red',
 spacing: 50,
 width: 2
});
```

***

### ElevationRamp()

> `static` **ElevationRamp**(`image`, `options?`): `Material`

创建高程渐变材质

#### Parameters

##### image

`string` \| `HTMLCanvasElement`

渐变图片 (路径或Canvas)

##### options?

###### maximumHeight?

`number`

###### minimumHeight?

`number`

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.ElevationRamp('ramp.png');
```

***

### EmissionMap()

> `static` **EmissionMap**(`options`): `Material`

创建自发光贴图材质

#### Parameters

##### options

配置选项

###### channels?

`string`

通道 (默认 "rgb")

###### image

`string`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.EmissionMap({
 image: 'emission.jpg'
});
```

***

### Fade()

> `static` **Fade**(`options`): `Material`

创建渐变/消隐材质

#### Parameters

##### options

配置选项

###### fadeDirection?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

渐变方向

###### fadeInColor

[`DColor`](../types/DColor.md)

淡入颜色 (近处颜色)

###### fadeOutColor

[`DColor`](../types/DColor.md)

淡出颜色 (远处颜色)

###### maximumDistance

`number`

最大距离

###### repeat?

`boolean`

是否重复

###### time?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

时间控制 (用于动态效果，可选)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.Fade({
 fadeInColor: 'red',
 fadeOutColor: 'transparent',
 maximumDistance: 10000,
 repeat: true
});
```

***

### Grid()

> `static` **Grid**(`options`): `Material`

创建网格材质

#### Parameters

##### options

配置选项

###### cellAlpha?

`number`

单元格透明度 (默认 0.1)

###### color?

[`DColor`](../types/DColor.md)

颜色 (默认白色)

###### lineCount?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

线条数量 (默认 8x8)

###### lineOffset?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

线条偏移

###### lineThickness?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

线条粗细 (默认 1.0)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.Grid({
 color: 'yellow',
 cellAlpha: 0.2,
 lineCount: { x: 10, y: 10 }
});
```

***

### Image()

> `static` **Image**(`options`): `Material`

创建图片材质

#### Parameters

##### options

配置选项

###### color?

[`DColor`](../types/DColor.md)

混合颜色 (默认白色)

###### image

`string` \| `HTMLCanvasElement` \| `HTMLImageElement`

图片路径、Image对象或Canvas对象

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数 (默认 1.0, 1.0)

#### Returns

`Material`

Daisy 材质描述

#### Example

```ts
const mat = Material.Image({
 image: 'path/to/image.png',
 repeat: { x: 2, y: 2 }
});
```

***

### NeonScan()

> `static` **NeonScan**(`options`): `Material`

创建霓虹扫描材质

#### Parameters

##### options

配置选项

###### bandWidth?

`number`

波段宽度

###### baseColor?

`string` \| `Color`

基础颜色

###### glowSize?

`number`

光晕大小

###### neonColor?

`string` \| `Color`

霓虹颜色

###### opacity?

`number`

透明度

###### speed?

`number`

速度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.NeonScan({
 baseColor: 'purple',
 neonColor: 'cyan',
 speed: 1.5
});
```

***

### NormalMap()

> `static` **NormalMap**(`options`): `Material`

创建法线贴图材质

#### Parameters

##### options

配置选项

###### channels?

`string`

通道 (默认 "rgb")

###### image

`string`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

###### strength?

`number`

强度 (默认 0.5)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.NormalMap({
 image: 'normal.jpg',
 strength: 0.8
});
```

***

### PolylineArrow()

> `static` **PolylineArrow**(`options`): `Material`

创建箭头线材质

#### Parameters

##### options

[`DColor`](../types/DColor.md) \| \{ `arrowSize?`: `number`; `color?`: DColor \| undefined; `direction?`: `"forward"` \| `"backward"` \| `"both"`; `speed?`: `number`; \}

配置选项

[`DColor`](../types/DColor.md)

***

###### Type Literal

\{ `arrowSize?`: `number`; `color?`: DColor \| undefined; `direction?`: `"forward"` \| `"backward"` \| `"both"`; `speed?`: `number`; \}

配置选项

###### arrowSize?

`number`

箭头大小

###### color?

DColor \| undefined

颜色

###### direction?

`"forward"` \| `"backward"` \| `"both"`

箭头方向 ('forward' | 'backward' | 'both')

###### speed?

`number`

流动速度 (大于0时开启流光效果)

#### Returns

`Material`

材质实例。

#### Example

```ts
// 静态箭头
const mat = Material.PolylineArrow({
 color: 'yellow',
 arrowSize: 20
});

// 动态流光箭头
const mat2 = Material.PolylineArrow({
 color: 'cyan',
 speed: 2.0,
 direction: 'forward'
});
```

***

### PolylineArrowPath()

> `static` **PolylineArrowPath**(`options`): `Material`

创建箭头路径材质（重复的箭头沿线流动）
适合表示路径规划、行进路线等

#### Parameters

##### options

配置选项

###### arrowSize?

`number`

箭头大小 (相对于间距的比例 %)

###### color?

[`DColor`](../types/DColor.md)

箭头颜色

###### direction?

`"forward"` \| `"backward"`

流动方向

###### glowColor?

[`DColor`](../types/DColor.md)

箭头内部流光颜色 (可选)

###### spacing?

`number`

箭头间距

###### speed?

`number`

流动速度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.PolylineArrowPath({
 color: 'orange',
 speed: 3.0,
 spacing: 0.2
});
```

***

### PolylineDash()

> `static` **PolylineDash**(`options`): `Material`

创建虚线材质

#### Parameters

##### options

配置选项

###### color?

[`DColor`](../types/DColor.md)

虚线颜色

###### dashLength?

`number`

虚线长度

###### dashPattern?

`number`

虚线样式 (位掩码)

###### flowColor?

[`DColor`](../types/DColor.md)

流动颜色 (仅动态模式有效)

###### gapColor?

[`DColor`](../types/DColor.md)

间隔颜色

###### speed?

`number`

流动速度 (大于0时开启流动效果)

#### Returns

`Material`

材质实例。

#### Example

```ts
// 静态虚线
const mat = Material.PolylineDash({
 color: 'blue',
 gapColor: 'transparent',
 dashLength: 20
});

// 动态流动虚线
const mat2 = Material.PolylineDash({
 color: 'yellow',
 speed: 5.0,
 flowColor: 'red'
});
```

***

### PolylineFlow()

> `static` **PolylineFlow**(`options`): `Material`

创建贴图流动线材质（自定义）
适合管线、道路流光等，使用图片作为纹理进行流动

#### Parameters

##### options

配置选项

###### color?

`string` \| `Color`

混合颜色

###### image

`string` \| `HTMLCanvasElement` \| `HTMLImageElement`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数 (可选)

###### speed?

`number`

流动速度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.PolylineFlow({
 image: 'arrow.png',
 color: 'yellow',
 speed: 1.5
});
```

***

### PolylineGlow()

> `static` **PolylineGlow**(`options`): `Material`

创建光晕线材质

#### Parameters

##### options

配置选项

###### color?

[`DColor`](../types/DColor.md)

颜色

###### glowPower?

`number`

光晕强度

###### taperPower?

`number`

锥度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.PolylineGlow({
 color: 'gold',
 glowPower: 0.2,
 taperPower: 0.5
});
```

***

### PolylineOutline()

> `static` **PolylineOutline**(`options`): `Material`

创建轮廓线材质

#### Parameters

##### options

配置选项

###### color?

[`DColor`](../types/DColor.md)

内部颜色

###### outlineColor?

[`DColor`](../types/DColor.md)

轮廓颜色

###### outlineWidth?

`number`

轮廓宽度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.PolylineOutline({
 color: 'orange',
 outlineColor: 'white',
 outlineWidth: 2
});
```

***

### PolylineTrail()

> `static` **PolylineTrail**(`options`): `Material`

创建流光尾迹线材质（自定义）
模拟光效沿线流动的效果

#### Parameters

##### options

配置选项

###### color?

`string` \| `Color`

基础色（背景色）

###### speed?

`number`

流动速度

###### trailColor?

`string` \| `Color`

尾迹颜色（高亮色）

###### trailLength?

`number`

尾迹长度 (对应 glowSize 0-1)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.PolylineTrail({
 color: 'blue',
 trailColor: 'cyan',
 speed: 2.0,
 trailLength: 0.4
});
```

***

### RadialPulse()

> `static` **RadialPulse**(`options`): `Material`

创建径向脉冲材质

#### Parameters

##### options

配置选项

###### center?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

中心点 (0.0 - 1.0)

###### color?

`string` \| `Color`

基础颜色

###### opacity?

`number`

透明度

###### pulseColor?

`string` \| `Color`

脉冲颜色

###### ringWidth?

`number`

环宽度

###### speed?

`number`

速度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.RadialPulse({
 color: 'cyan',
 pulseColor: 'white',
 speed: 2.0
});
```

***

### Registered()

> `static` **Registered**(`type`, `uniforms?`, `translucent?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

创建已注册材质类型的 Daisy 材质描述。

适用于通过 `shaderManager.registerShader()` 注册过的自定义 Shader。

#### Parameters

##### type

`string`

已注册的全局材质类型标识。

##### uniforms?

`Uniforms` = `{}`

覆盖注册默认值的 uniform 参数。

##### translucent?

`boolean` = `true`

是否按半透明材质处理。默认 `true`。

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### RimLighting()

> `static` **RimLighting**(`options`): `Material`

创建边缘光照材质

#### Parameters

##### options

配置选项

###### color?

[`DColor`](../types/DColor.md)

基础颜色

###### rimColor?

[`DColor`](../types/DColor.md)

边缘颜色

###### width?

`number`

边缘宽度 (0.0 - 1.0)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.RimLighting({
 color: 'red',
 rimColor: 'yellow',
 width: 0.3
});
```

***

### RingSweep()

> `static` **RingSweep**(`options`): `Material`

创建环形扫描材质

#### Parameters

##### options

配置选项

###### color?

`string` \| `Color`

基础颜色

###### opacity?

`number`

透明度

###### speed?

`number`

速度

###### sweepColor?

`string` \| `Color`

扫描颜色

###### width?

`number`

扫描宽度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.RingSweep({
 color: 'blue',
 sweepColor: 'orange',
 speed: 1.0
});
```

***

### SlopeRamp()

> `static` **SlopeRamp**(`image`): `Material`

创建坡度渐变材质

#### Parameters

##### image

`string` \| `HTMLCanvasElement`

渐变图片 (路径或Canvas)

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.SlopeRamp('ramp.png');
```

***

### Solid()

> `static` **Solid**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

创建普通实体材质。

适合 Box/Cube/Cylinder/Ellipsoid 等立体几何，以及 Polygon/Ellipse/Rectangle 等面要素。
这是 Daisy 的稳定包装入口，调用侧无需接触内部渲染材质。

#### Parameters

##### options?

[`DColor`](../types/DColor.md) \| [`SolidMaterialOptions`](../types/SolidMaterialOptions.md)

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### SpecularMap()

> `static` **SpecularMap**(`options`): `Material`

创建高光贴图材质

#### Parameters

##### options

配置选项

###### channel?

`string`

通道 (默认 "a")

###### image

`string`

图片路径

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.SpecularMap({
 image: 'specular.jpg'
});
```

***

### SpiralFlow()

> `static` **SpiralFlow**(`options`): `Material`

创建螺旋流动材质（原生材质）
静态创建，无时间轴驱动

#### Parameters

##### options

配置选项

###### color?

`string` \| `Color`

基础颜色

###### count?

`number`

螺旋数量

###### direction?

`"forward"` \| `"backward"`

###### opacity?

`number`

透明度

###### speed?

`number`

速度

###### spiralColor?

`string` \| `Color`

螺旋颜色

###### thickness?

`number`

厚度

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.SpiralFlow({
 color: 'blue',
 spiralColor: 'yellow',
 speed: 2.0,
 count: 8
});
```

***

### Stripe()

> `static` **Stripe**(`options`): `Material`

创建条纹材质

#### Parameters

##### options

配置选项

###### evenColor?

[`DColor`](../types/DColor.md)

偶数条纹颜色

###### oddColor?

[`DColor`](../types/DColor.md)

奇数条纹颜色

###### offset?

`number`

偏移量

###### orientation?

`StripeOrientation`

方向 (水平/垂直)

###### repeat?

`number`

重复次数

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.Stripe({
 evenColor: 'white',
 oddColor: 'black',
 repeat: 10
});
```

***

### Water()

> `static` **Water**(`options?`): `Material`

创建水面材质

#### Parameters

##### options?

配置选项

###### amplitude?

`number`

波浪振幅

###### animationSpeed?

`number`

动画速度

###### baseWaterColor?

[`DColor`](../types/DColor.md)

基础水色

###### blendColor?

[`DColor`](../types/DColor.md)

混合颜色

###### frequency?

`number`

波浪频率

###### normalMap?

`string`

法线贴图

###### specularIntensity?

`number`

高光强度

###### specularMap?

`string`

高光贴图

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.Water({
 baseWaterColor: '#004080',
 blendColor: '#0080b0',
 frequency: 800,
 animationSpeed: 0.02
});
```

***

### WaterMask()

> `static` **WaterMask**(`options`): `Material`

创建水体掩膜材质

#### Parameters

##### options

配置选项

###### landColor?

`string` \| `Color`

陆地颜色

###### waterColor?

`string` \| `Color`

水体颜色

#### Returns

`Material`

材质实例。

#### Example

```ts
const mat = Material.WaterMask({
 waterColor: 'blue',
 landColor: 'green'
});
```
