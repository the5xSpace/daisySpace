[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereRenderable

# Class: AttitudeSphereRenderable

AttitudeSphereRenderable: A 3D sphere component for displaying attitude reference.

The component includes:
- Semi-transparent sphere (optional)
- Sphere wireframe (optional)
- XYZ axis arrows (optional)
- Yaw/pitch/roll reference circles (optional)
- XYZ labels (optional)

## Remarks

- Attitude updates are done via `updateOrientation`; internally it updates the position and rotation of each Primitive/Polyline/Label.
- This class does not automatically subscribe to frame callbacks; the business side should call updates on demand when camera/attitude changes.

## Extended by

- [`AttitudeSphereMatrix4Renderable`](AttitudeSphereMatrix4Renderable.md)

## Constructors

### Constructor

> **new AttitudeSphereRenderable**(`viewer`, `options?`): `AttitudeSphereRenderable`

Creates an attitude sphere and immediately adds it to the viewer's collections.

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`AttitudeSphereOptions`](../types/AttitudeSphereOptions.md)

Creation options.

#### Returns

`AttitudeSphereRenderable`

## Methods

### destroy()

> **destroy**(): `void`

Removes all created objects from the viewer's collections and releases references.

#### Returns

`void`

***

### setCenter()

> **setCenter**(`center`): `void`

Sets the sphere center (world coordinates) and immediately applies the transform.

#### Parameters

##### center

`Cartesian3`

The new sphere center coordinates.

#### Returns

`void`

***

### setDistanceDisplayCondition()

> **setDistanceDisplayCondition**(`value`): `void`

#### Parameters

##### value

`DistanceDisplayCondition` \| `undefined`

#### Returns

`void`

***

### setRadius()

> **setRadius**(`radius`): `void`

Sets the sphere radius and immediately applies the transform (via matrix scaling, no geometry rebuild).

#### Parameters

##### radius

`number`

The new radius (world units).

#### Returns

`void`

***

### setShow()

> **setShow**(`value`): `void`

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### updateOrientation()

> **updateOrientation**(`matrix`): `void`

Updates the attitude rotation matrix and immediately applies the transform.

#### Parameters

##### matrix

`Matrix4` \| `Matrix3`

The attitude matrix (rotation).

#### Returns

`void`

#### Remarks

- When a `Matrix4` is passed, only its rotation part (Matrix3) is used.
