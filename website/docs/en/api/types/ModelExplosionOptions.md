[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelExplosionOptions

# Type Alias: ModelExplosionOptions

> **ModelExplosionOptions** = `object`

Model explosion diagram configuration.

The explosion diagram displaces each glTF node outward along the direction from the node center relative to the model coordinate center:
- `factor = 0` means no displacement
- `factor = 1` means using one unit of base explosion distance
- Nodes with higher index apply a larger progressive distance in the same direction by default, forming a layered curve in the explosion diagram

The SDK reads the mesh vertex bounding box to locate the part center by default, rather than only reading the node transform origin;
this covers the common modeling scenario where the node origin is at the model center but the geometry is actually offset.

## Properties

### center?

> `optional` **center?**: `Daisy.Cartesian3`

Explosion center, using model local coordinates. Defaults to the model coordinate origin.

***

### enabled?

> `optional` **enabled?**: `boolean`

Whether to enable the explosion diagram. Defaults to `true`.

***

### excludeNodeNames?

> `optional` **excludeNodeNames?**: `string`[]

Exclude specified nodes.

***

### factor?

> `optional` **factor?**: `number`

Explosion intensity multiplier. `0` is equivalent to disabled; default is `1`.

***

### indexCurvePower?

> `optional` **indexCurvePower?**: `number`

Node index progression curve power exponent. Defaults to `1.2`.

***

### indexDistanceFactor?

> `optional` **indexDistanceFactor?**: `number`

Node index progression distance factor.

Explosion distance is multiplied by `1 + indexDistanceFactor * index^indexCurvePower`;
pass `0` to disable index progression and keep only the base radial explosion.

***

### minimumDistance?

> `optional` **minimumDistance?**: `number`

Minimum explosion displacement, using model local coordinate units.

When not provided, uses `minimumDistanceRatio` to auto-calculate from the model bounding radius; pass `0` to disable minimum displacement.

***

### minimumDistanceRatio?

> `optional` **minimumDistanceRatio?**: `number`

Ratio of auto minimum displacement to the model local bounding radius. Defaults to `0.16`.

***

### nodeNames?

> `optional` **nodeNames?**: `string`[]

Enable explosion only for specified nodes; omit to include all localizable nodes.
