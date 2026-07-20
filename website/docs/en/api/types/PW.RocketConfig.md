[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RocketConfig

# Type Alias: RocketConfig

> **RocketConfig** = `Omit`\<[`VehicleConfig`](PW.VehicleConfig.md), `"position"` \| `"path"` \| `"point"` \| `"label"` \| `"model"` \| `"orientation"`\> & [`RocketDefaultVisualsOptions`](PW.RocketDefaultVisualsOptions.md) & `object`

## Type Declaration

### ascent?

> `optional` **ascent?**: [`RocketAscentInput`](PW.RocketAscentInput.md)

Boost phase trajectory input. When provided, the Rocket generates a trajectory after construction or binding.

### autoAlignVerticalModelToFlight?

> `optional` **autoAlignVerticalModelToFlight?**: `boolean`

Whether to automatically mount the vertical launch model's body +Z axis to the Rocket's forward +X axis.

Many rocket/missile models use +Z as the nose cone direction in glTF, while Daisy Vehicle
convention uses +X as the forward direction. When enabled, a -90° pitch around the body Y axis is applied to the model.

#### Default

```ts
true
```

### autoOrientationByVelocity?

> `optional` **autoOrientationByVelocity?**: `boolean`

Whether to automatically write attitude based on trajectory velocity.

#### Default

```ts
true
```

### bodyAxis?

> `optional` **bodyAxis?**: `boolean` \| `BodyAxisOptions`

Body axis debug display. Pass true for Rocket default axis parameters; pass an object to forward to Entity.setBodyAxis.

### epoch?

> `optional` **epoch?**: `Daisy.JulianDate`

Trajectory start time. When omitted, prefers the scene's current time; uses the current system time when not bound to an Engine.
