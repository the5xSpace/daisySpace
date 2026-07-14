[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelOptions

# Interface: ModelOptions

3D模型实体组件的配置选项
 ModelOptions

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### allowPicking?

> `optional` **allowPicking?**: `boolean`

是否允许使用Scene#pick拾取模型

#### Default

```ts
true
```

***

### asynchronous?

> `optional` **asynchronous?**: `boolean`

是否异步创建模型的WebGL资源

#### Default

```ts
true
```

***

### backFaceCulling?

> `optional` **backFaceCulling?**: `boolean`

是否剔除背面几何体

#### Default

```ts
true
```

***

### basePath?

> `optional` **basePath?**: `string` \| `Resource`

glTF JSON中路径的相对基础路径

#### Default

```ts
''
```

***

### clampAnimations?

> `optional` **clampAnimations?**: `boolean`

是否在没有关键帧的帧上保持模型的动画姿势

#### Default

```ts
true
```

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

与模型渲染颜色混合的颜色

***

### colorBlendAmount?

> `optional` **colorBlendAmount?**: `number`

当colorBlendMode为MIX时，用于确定颜色强度的值

#### Default

```ts
0.5
```

***

### colorBlendMode?

> `optional` **colorBlendMode?**: `ColorBlendMode`

定义颜色如何与模型混合

#### Default

```ts
ColorBlendMode.HIGHLIGHT
```

***

### cull?

> `optional` **cull?**: `boolean`

是否使用视锥体/地平线剔除模型,如果模型是3D平铺集的一部分，则此属性将始终为false，因为使用了3D平铺剔除系统。

#### Default

```ts
true
```

***

### customShader?

> `optional` **customShader?**: `CustomShader`

自定义着色器，用于向顶点和片段着色器添加用户定义的GLSL代码

***

### debugShowBoundingVolume?

> `optional` **debugShowBoundingVolume?**: `boolean`

是否显示模型中每个绘制命令的边界球（仅用于调试）

#### Default

```ts
false
```

***

### debugWireframe?

> `optional` **debugWireframe?**: `boolean`

是否以线框模式绘制模型（仅用于调试）

#### Default

```ts
false
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

指定模型在距离相机多远时显示的条件

***

### ~~distanceFallbackPoint?~~

> `optional` **distanceFallbackPoint?**: `boolean` \| [`ModelDistanceFallbackPointOptions`](../types/ModelDistanceFallbackPointOptions.md)

远距离替代点。

已废弃：远距替代点职责已下沉到 BaseObject 层的 `modelDistanceFallbackPoint`。
ModelFeature 本身不再负责“超出视距后自动切点”。

#### Deprecated

***

### enableDebugWireframe?

> `optional` **enableDebugWireframe?**: `boolean`

是否启用线框模式（仅用于调试，WebGL1需要设置为true）

#### Default

```ts
false
```

***

### enablePick?

> `optional` **enablePick?**: `boolean`

是否允许在不使用WebGL 2或更高版本时使用CPU拾取

#### Default

```ts
false
```

***

### enableShowOutline?

> `optional` **enableShowOutline?**: `boolean`

是否启用使用CESIUM_primitive_outline扩展的模型的轮廓

#### Default

```ts
true
```

***

### enableVerticalExaggeration?

> `optional` **enableVerticalExaggeration?**: `boolean`

当Scene.verticalExaggeration设置为非1.0值时，是否沿椭球体法线方向夸张模型

#### Default

```ts
true
```

***

### featureIdLabel?

> `optional` **featureIdLabel?**: `string`

用于拾取和样式化的特征ID集的标签

#### Default

```ts
"featureId_0"
```

***

### forwardAxis?

> `optional` **forwardAxis?**: `Axis`

glTF模型的前轴

#### Default

```ts
Axis.Z
```

***

### gltfCallback?

> `optional` **gltfCallback?**: `GltfCallback`

加载完成后使用加载的gltf对象调用的函数

***

### id?

> `optional` **id?**: `string`

用户定义的对象，用于Scene#pick时返回

#### Overrides

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### incrementallyLoadTextures?

> `optional` **incrementallyLoadTextures?**: `boolean`

是否在模型加载后继续流式加载纹理

#### Default

```ts
true
```

***

### instanceFeatureIdLabel?

> `optional` **instanceFeatureIdLabel?**: `string`

用于拾取和样式化的实例特征ID集的标签

#### Default

```ts
"instanceFeatureId_0"
```

***

### lightColor?

> `optional` **lightColor?**: `Cartesian3`

模型着色时的光照颜色，未定义时使用场景的光照颜色

***

### maximumScale?

> `optional` **maximumScale?**: `number`

模型的最大缩放比例，minimumPixelSize的上限

***

### minimumPixelSize?

> `optional` **minimumPixelSize?**: `number`

模型的最小像素大小，确保模型在远处仍然可见

#### Default

```ts
0.0
```

***

### modelMatrix?

> `optional` **modelMatrix?**: `Matrix4`

4x4变换矩阵，用于将模型从模型坐标转换到世界坐标

#### Default

```ts
Matrix4.IDENTITY
```

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### opaquePass?

> `optional` **opaquePass?**: `boolean`

模型不透明部分的绘制通道

#### Default

```ts
Pass.OPAQUE
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

渲染轮廓时使用的颜色

#### Default

```ts
AutoColor.BLACK
```

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### pointCloudShading?

> `optional` **pointCloudShading?**: `any`

用于控制点衰减和光照的PointCloudShading对象选项

***

### projectTo2D?

> `optional` **projectTo2D?**: `boolean`

是否准确地将模型位置投影到2D

#### Default

```ts
false
```

***

### releaseGltfJson?

> `optional` **releaseGltfJson?**: `boolean`

是否在glTF加载后释放glTF JSON

#### Default

```ts
false
```

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

模型的统一缩放比例

#### Default

```ts
1.0
```

***

### shadows?

> `optional` **shadows?**: `ShadowMode`

模型是否投射或接收光源的阴影

#### Default

```ts
ShadowMode.ENABLED
```

***

### show?

> `optional` **show?**: `boolean`

是否渲染模型

#### Default

```ts
true
```

***

### showOutline?

> `optional` **showOutline?**: `boolean`

是否显示使用CESIUM_primitive_outline扩展的模型的轮廓

#### Default

```ts
true
```

***

### silhouetteColor?

> `optional` **silhouetteColor?**: [`DColor`](../types/DColor.md)

轮廓颜色

#### Default

```ts
AutoColor.RED
```

***

### silhouetteSize?

> `optional` **silhouetteSize?**: `number`

轮廓大小（像素）

#### Default

```ts
0.0
```

***

### splitDirection?

> `optional` **splitDirection?**: `SplitDirection`

应用于模型的分割方向

#### Default

```ts
SplitDirection.NONE
```

***

### upAxis?

> `optional` **upAxis?**: `Axis`

glTF模型的上轴

#### Default

```ts
Axis.Y
```

***

### url

> **url**: `string` \| `Resource`

模型的URL地址，支持.gltf或.glb格式

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
