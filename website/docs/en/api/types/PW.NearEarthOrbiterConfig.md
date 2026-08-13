[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterConfig

# Type Alias: NearEarthOrbiterConfig

> **NearEarthOrbiterConfig** = [`VehicleConfig`](PW.VehicleConfig.md) & `object`

Configuration for NearEarthOrbiter.

## Type Declaration

### autoOrientationByVelocity?

> `optional` **autoOrientationByVelocity?**: `boolean`

Whether to automatically orient the attitude in the direction of velocity.

Note: this capability requires position to use the trajectory-sample form.

### enableSpg4Propagation?

> `optional` **enableSpg4Propagation?**: `boolean`

Whether to enable real-time propagation.

- true: update the position every frame according to simulation time
- false: preserve the user-configured position (static or trajectory samples)

### groundTrack?

> `optional` **groundTrack?**: [`GroundTrackComponentOptions`](PW.GroundTrackComponentOptions.md) \| `false`

Configuration for the ground-track component.

- `false`: do not mount automatically
- Object: mount the component automatically during construction

### orbitDefinition?

> `optional` **orbitDefinition?**: `OrbitSourceInput`

Orbit definition (preferred entry point), supporting TLE / OMM XML / JSON GP.

When `orbitDefinition`, `orbitSource`, and `tle` are all provided, the priority is:
`orbitDefinition > orbitSource > tle`.

### orbitElementsView?

> `optional` **orbitElementsView?**: [`OrbitElementsViewComponentOptions`](PW.OrbitElementsViewComponentOptions.md) \| `false`

Configuration for the orbit-elements geometric-view component.

- `false`: do not mount automatically
- Object: mount the component automatically during construction

### orbitSource?

> `optional` **orbitSource?**: `OrbitSourceInput`

Generic orbit-source input, supporting TLE / OMM XML / JSON GP.

When both `orbitSource` and `tle` are provided, `orbitSource` takes precedence.

### tle?

> `optional` **tle?**: `string` \| `string`[]

Orbital elements (two-line or three-line string).

### trajectory?

> `optional` **trajectory?**: `false` \| [`NearEarthOrbiterTrajectoryRequest`](PW.NearEarthOrbiterTrajectoryRequest.md)

Whether to automatically write trajectory samples after construction.

- Omitted: enabled automatically; `applyTrajectory()` runs automatically after binding to an Engine
- `false`: disable automatic execution and call `applyTrajectory()` manually
- Object: execute automatically and use the object as the default argument to `applyTrajectory(...)`
