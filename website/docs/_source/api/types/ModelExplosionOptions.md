[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelExplosionOptions

# Type Alias: ModelExplosionOptions

> **ModelExplosionOptions** = `object`

模型爆炸图配置。

爆炸图会把每个 glTF 节点沿“节点中心相对模型坐标中心”的方向外移：
- `factor = 0` 表示无位移
- `factor = 1` 表示使用一倍基础爆炸距离
- 节点 index 越大，默认会沿同一方向套用更大的递进距离，形成爆炸图的分层曲线

SDK 默认会读取 mesh 顶点包围盒来定位部件中心，而不是只读取节点 transform 原点；
这样能覆盖“节点原点在模型中心，但几何体实际偏离中心”的常见建模方式。

## Properties

### center?

> `optional` **center?**: `Daisy.Cartesian3`

爆炸中心，使用模型本地坐标。默认模型坐标原点。

***

### enabled?

> `optional` **enabled?**: `boolean`

是否启用爆炸图。默认 `true`。

***

### excludeNodeNames?

> `optional` **excludeNodeNames?**: `string`[]

排除指定节点。

***

### factor?

> `optional` **factor?**: `number`

爆炸强度倍率。`0` 等价于关闭，默认 `1`。

***

### indexCurvePower?

> `optional` **indexCurvePower?**: `number`

节点 index 递进曲线幂指数。默认 `1.2`。

***

### indexDistanceFactor?

> `optional` **indexDistanceFactor?**: `number`

节点 index 递进距离系数。

爆炸距离会乘以 `1 + indexDistanceFactor * index^indexCurvePower`；
传 `0` 可关闭 index 递进，只保留基础径向爆炸。

***

### minimumDistance?

> `optional` **minimumDistance?**: `number`

最小爆炸位移，使用模型本地坐标单位。

不传时使用 `minimumDistanceRatio` 自动按模型包围半径计算；传 `0` 可关闭最小位移。

***

### minimumDistanceRatio?

> `optional` **minimumDistanceRatio?**: `number`

自动最小位移占模型本地包围半径的比例。默认 `0.16`。

***

### nodeNames?

> `optional` **nodeNames?**: `string`[]

仅对指定节点启用爆炸；不传表示所有可定位节点。
