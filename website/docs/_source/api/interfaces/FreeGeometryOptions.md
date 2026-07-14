[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FreeGeometryOptions

# Interface: FreeGeometryOptions

FreeGeometryFeature 选项。

## Extends

- [`EntityComOptions`](EntityComOptions.md)

## Properties

### asynchronous?

> `optional` **asynchronous?**: `boolean`

异步创建几何，默认 false

***

### autoNormals?

> `optional` **autoNormals?**: [`AutoNormalsMode`](../types/AutoNormalsMode.md)

法线自动计算模式，默认 "flat"

***

### closed?

> `optional` **closed?**: `boolean`

几何体是否封闭实体（影响光照），默认 true

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`distanceDisplayCondition`](EntityComOptions.md#distancedisplaycondition)

***

### doubleSided?

> `optional` **doubleSided?**: `boolean`

双面渲染（禁用背面剔除），默认 false

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

组件涉及贴地/射线求交等“天体椭球”相关计算时使用的椭球配置。

注意：一旦该组件通过 Entity.addFeature() 添加到实体上，会被实体的 celestialEllipsoid 覆盖，
组件将始终遵循实体的天体椭球配置。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`ellipsoid`](EntityComOptions.md#ellipsoid)

***

### flat?

> `optional` **flat?**: `boolean`

平面着色（非平滑着色），默认 false

***

### geometry

> **geometry**: [`DaisyGeometryDescriptor`](DaisyGeometryDescriptor.md)

几何描述（必填）

***

### id?

> `optional` **id?**: `string`

自定义标识（用于底层渲染对象标识/检索）。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`id`](EntityComOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`includeInBoundingSphere`](EntityComOptions.md#includeinboundingsphere)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

材质，走 DMaterial 体系

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`name`](EntityComOptions.md#name)

***

### outline?

> `optional` **outline?**: `boolean`

显示轮廓，默认 false

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

轮廓颜色

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`overlayPass`](EntityComOptions.md#overlaypass)

***

### position?

> `optional` **position?**: `Cartesian3`

相对实体坐标系下的位置。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`position`](EntityComOptions.md#position)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`renderOrder`](EntityComOptions.md#renderorder)

***

### show

> **show**: `boolean`

是否显示。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`show`](EntityComOptions.md#show)

***

### translucent?

> `optional` **translucent?**: `boolean`

半透明，默认由材质推断

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`visibility`](EntityComOptions.md#visibility)

***

### wireframe?

> `optional` **wireframe?**: `boolean`

线框模式，默认 false
