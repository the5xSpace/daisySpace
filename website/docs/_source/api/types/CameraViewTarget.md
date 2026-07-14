[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CameraViewTarget

# Type Alias: CameraViewTarget

> **CameraViewTarget** = [`Entity`](../classes/Entity.md) \| [`Entity`](../classes/Entity.md)[] \| `Daisy.Cartesian3` \| `Daisy.Cartesian3`[] \| `Daisy.Cartographic` \| `Daisy.Cartographic`[]

相机视图/飞行的目标描述。

支持多种输入形式，内部会尽可能转换为三维坐标：
- `Entity` 或 `Entity[]`：取实体当前位置
- `Cartesian3`/`Cartographic` 或其数组：直接使用
- `{x,y,z}`：按世界坐标（米）
- `{lon,lat,height}` / `{lng,lat,alt}` / `{longitude,latitude,height}`：按经纬度（度）与高度（米）
- `[lon,lat]` / `[lon,lat,height]`：按经纬度（度）与高度（米）
- `Promise`：异步解析后再执行
