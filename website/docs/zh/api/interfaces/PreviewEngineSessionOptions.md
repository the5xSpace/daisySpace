[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PreviewEngineSessionOptions

# Interface: PreviewEngineSessionOptions

## Properties

### autoOrbit?

> `readonly` `optional` **autoOrbit?**: `boolean`

相机是否自动围绕当前宿主旋转，默认 true。

***

### autoPlay?

> `readonly` `optional` **autoPlay?**: `boolean`

创建和挂载目标后自动推进仿真时间，默认 true。

***

### cameraRange?

> `readonly` `optional` **cameraRange?**: `number`

初始相机到预览原点的距离。

***

### host?

> `readonly` `optional` **host?**: [`PreviewHostSpec`](../types/PreviewHostSpec.md)

上游根据正在编辑的目标确定宿主；默认使用 Entity。

***

### orbitSpeedDegreesPerSecond?

> `readonly` `optional` **orbitSpeedDegreesPerSecond?**: `number`

自动环绕角速度，单位为度/秒，默认 12。

***

### showBodyAxis?

> `readonly` `optional` **showBodyAxis?**: `boolean`

是否显示当前宿主的本体坐标轴，默认 true。
