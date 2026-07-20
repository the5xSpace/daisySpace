[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / VehicleConfig

# Type Alias: VehicleConfig

> **VehicleConfig** = [`FreeObjectConfig`](PW.FreeObjectConfig.md) & `object`

## Type Declaration

### orientation?

> `optional` **orientation?**: `Property` \| `Daisy.Quaternion`

Initial orientation (optional). Written to the host Entity.orientation.

### propulsions?

> `optional` **propulsions?**: [`PropulsionComponent`](../classes/PW.PropulsionComponent.md) \| [`PropulsionComponent`](../classes/PW.PropulsionComponent.md)[]

Propulsion component collection (optional).

Component instances are explicitly created by the business side, e.g., `vehicle.addPropulsion(new JetEngine(...))`.

### sensors?

> `optional` **sensors?**: [`SensorOptions`](PW.SensorOptions.md) \| [`SensorOptions`](PW.SensorOptions.md)[]

Sensor collection (optional).
