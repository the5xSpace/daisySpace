[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ViewDistanceStrategy

# Class: ViewDistanceStrategy

View-distance strategy manager.

Used to:
- manage `DistanceDisplayCondition` values at different scales by scene template
- calculate the distance from the camera to a target point (ECEF) and determine whether it satisfies the display range

## Example

```ts
const strategy = new ViewDistanceStrategy({ scene: ViewScene.SPACE });
strategy.setScene(ViewScene.GROUND);
```

## Constructors

### Constructor

> **new ViewDistanceStrategy**(`options?`): `ViewDistanceStrategy`

#### Parameters

##### options?

[`ViewDistanceStrategyOptions`](../interfaces/ViewDistanceStrategyOptions.md)

#### Returns

`ViewDistanceStrategy`

## Accessors

### PathResolutionScale

#### Get Signature

> **get** **PathResolutionScale**(): `number`

Path-resolution scale factor (default 1).

Larger values produce smoother paths at a higher cost.

##### Returns

`number`

#### Set Signature

> **set** **PathResolutionScale**(`scale`): `void`

Sets the path-resolution scale factor.

##### Parameters

###### scale

`number`

Must be positive.

##### Returns

`void`

## Methods

### anyCameraInDistanceDisplayCondition()

> **anyCameraInDistanceDisplayCondition**(`cameras`, `positionECEF`, `ddc?`, `options?`): `boolean`

Checks whether any camera satisfies the distance display condition (near/far).

#### Parameters

##### cameras

`Camera`[]

Camera array (primary and additional cameras).

##### positionECEF

`Cartesian3`

Target position (ECEF).

##### ddc?

`DistanceDisplayCondition`

Distance display condition; when omitted, the target is considered always visible.

##### options?

Optional calculation options.

###### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

###### time?

`JulianDate`

#### Returns

`boolean`

#### Example

```ts
const visible = strategy.anyCameraInDistanceDisplayCondition(cameras, targetPos, ddc);
```

***

### computeCameraToPositionDistance()

> **computeCameraToPositionDistance**(`cameraPositionECEF`, `positionECEF`, `options?`): `number`

Calculates the distance from the camera to the target point in meters.

#### Parameters

##### cameraPositionECEF

`Cartesian3`

Camera position (ECEF).

##### positionECEF

`Cartesian3`

Target position (ECEF).

##### options?

Optional calculation options.

###### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

###### time?

`JulianDate`

#### Returns

`number`

#### Example

```ts
const d = strategy.computeCameraToPositionDistance(cameraPos, targetPos);
```

***

### getDistanceDisplayCondition()

> **getDistanceDisplayCondition**(`level`): `DistanceDisplayCondition`

Gets the distance display condition for the specified view-distance level.

#### Parameters

##### level

[`ViewDistanceLevel`](../enums/ViewDistanceLevel.md)

View-distance level.

#### Returns

`DistanceDisplayCondition`

***

### getScene()

> **getScene**(): `string`

Gets the name of the current scene template.

#### Returns

`string`

***

### getViewDistance()

> **getViewDistance**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

Gets the view-distance template for the current scene.

#### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

***

### hasTemplate()

> **hasTemplate**(`name`): `boolean`

Checks whether a template with the specified name exists.

#### Parameters

##### name

`string`

Template name.

#### Returns

`boolean`

***

### registerTemplate()

> **registerTemplate**(`name`, `template`): `void`

Registers or replaces a view-distance template.

#### Parameters

##### name

`string`

Template name.

##### template

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

Template object.

#### Returns

`void`

#### Example

```ts
strategy.registerTemplate("custom", template);
```

***

### setScene()

> **setScene**(`scene`): `void`

Switches the current scene template.

#### Parameters

##### scene

`string`

Template name, such as `ViewScene.SPACE`.

#### Returns

`void`

#### Example

```ts
strategy.setScene(ViewScene.AVIATION);
```
