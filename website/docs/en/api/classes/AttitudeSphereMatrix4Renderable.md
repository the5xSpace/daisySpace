[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereMatrix4Renderable

# Class: AttitudeSphereMatrix4Renderable

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

## Extends

- [`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

## Constructors

### Constructor

> **new AttitudeSphereMatrix4Renderable**(`viewer`, `options?`): `AttitudeSphereMatrix4Renderable`

Creates an attitude sphere and immediately adds it to the viewer's collections.

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`AttitudeSphereOptions`](../types/AttitudeSphereOptions.md)

Creation options.

#### Returns

`AttitudeSphereMatrix4Renderable`

#### Inherited from

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`constructor`](AttitudeSphereRenderable.md#constructor)

## Methods

### destroy()

> **destroy**(): `void`

Removes all created objects from the viewer's collections and releases references.

#### Returns

`void`

#### Inherited from

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`destroy`](AttitudeSphereRenderable.md#destroy)

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

#### Overrides

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`setCenter`](AttitudeSphereRenderable.md#setcenter)

***

### setDistanceDisplayCondition()

> **setDistanceDisplayCondition**(`value`): `void`

#### Parameters

##### value

`DistanceDisplayCondition` \| `undefined`

#### Returns

`void`

#### Inherited from

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`setDistanceDisplayCondition`](AttitudeSphereRenderable.md#setdistancedisplaycondition)

***

### setModelMatrix()

> **setModelMatrix**(`matrix`): `void`

#### Parameters

##### matrix

`Matrix4`

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

#### Inherited from

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`setRadius`](AttitudeSphereRenderable.md#setradius)

***

### setShow()

> **setShow**(`value`): `void`

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`setShow`](AttitudeSphereRenderable.md#setshow)

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

#### Overrides

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md).[`updateOrientation`](AttitudeSphereRenderable.md#updateorientation)
