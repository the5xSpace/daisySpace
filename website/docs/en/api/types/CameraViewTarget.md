[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CameraViewTarget

# Type Alias: CameraViewTarget

> **CameraViewTarget** = [`Entity`](../classes/Entity.md) \| [`Entity`](../classes/Entity.md)[] \| `Daisy.Cartesian3` \| `Daisy.Cartesian3`[] \| `Daisy.Cartographic` \| `Daisy.Cartographic`[]

Camera view/fly-to target description.

Supports multiple input forms, internally converted to 3D coordinates when possible:
- `Entity` or `Entity[]`: uses the entity's current position
- `Cartesian3`/`Cartographic` or their arrays: used directly
- `{x,y,z}`: in world coordinates (meters)
- `{lon,lat,height}` / `{lng,lat,alt}` / `{longitude,latitude,height}`: in longitude/latitude (degrees) and height (meters)
- `[lon,lat]` / `[lon,lat,height]`: in longitude/latitude (degrees) and height (meters)
- `Promise`: resolves asynchronously before execution
