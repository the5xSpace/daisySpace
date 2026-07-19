[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelExplosionOptions

# Type Alias: ModelExplosionOptions

> **ModelExplosionOptions** = `object`

Exploded-view model configuration.

The exploded view moves each glTF node outward along the direction from the node center to the model-space center:
- `factor = 0` means no displacement
- `factor = 1` means using one unit of the base explosion distance
- The larger the node index, the larger the default progressive distance in the same direction, forming a layered exploded-view profile

By default, the SDK reads the mesh vertex bounding box to locate the part center instead of relying only on the node transform origin. This covers the common modeling pattern where the node origin is at the model center but the actual geometry is offset from it.

## Properties

### center?

> `optional` **center?**: `Daisy.Cartesian3`

Explosion center in model local coordinates. Defaults to the model origin.

***

### enabled?

> `optional` **enabled?**: `boolean`

Whether the exploded view is enabled. Defaults to `true`.

***

### excludeNodeNames?

> `optional` **excludeNodeNames?**: `string`[]

Excludes the specified nodes.

***

### factor?

> `optional` **factor?**: `number`

Explosion strength multiplier. `0` is equivalent to off. The default is `1`.

***

### indexCurvePower?

> `optional` **indexCurvePower?**: `number`

Exponent for the progressive curve applied to node indices. Defaults to `1.2`.

***

### indexDistanceFactor?

> `optional` **indexDistanceFactor?**: `number`

Coefficient for the progressive distance applied to node indices.

The explosion distance is multiplied by `1 + indexDistanceFactor * index^indexCurvePower`. Pass `0` to disable index-based progression and keep only the base radial explosion.

***

### minimumDistance?

> `optional` **minimumDistance?**: `number`

Minimum explosion displacement in model local units.

If omitted, `minimumDistanceRatio` is used to compute it automatically from the model's bounding radius. Pass `0` to disable the minimum displacement.

***

### minimumDistanceRatio?

> `optional` **minimumDistanceRatio?**: `number`

Ratio of the automatic minimum displacement to the model's local bounding radius. Defaults to `0.16`.

***

### nodeNames?

> `optional` **nodeNames?**: `string`[]

Enables the explosion effect only for the specified nodes. If omitted, all positionable nodes are included.
