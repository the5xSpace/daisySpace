[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / VehicleConfig

# Type Alias: VehicleConfig

> **VehicleConfig** = [`FreeObjectConfig`](PW.FreeObjectConfig.md) & `object`

## Type Declaration

### orientation?

> `optional` **orientation?**: `Property` \| `Daisy.Quaternion`

初始姿态（可选）。会写入宿主 Entity.orientation。

### propulsions?

> `optional` **propulsions?**: [`PropulsionComponent`](../classes/PW.PropulsionComponent.md) \| [`PropulsionComponent`](../classes/PW.PropulsionComponent.md)[]

动力组件集合（可选）。

组件实例由业务侧显式创建，例如 `vehicle.addPropulsion(new JetEngine(...))`。

### sensors?

> `optional` **sensors?**: [`SensorOptions`](PW.SensorOptions.md) \| [`SensorOptions`](PW.SensorOptions.md)[]

传感器集合（可选）。
