[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelNodeTransform

# Class: ModelNodeTransform

Node transform controller (chainable).

Obtain an instance via ModelFeature.transformNode(name). Transforms are applied automatically as state side effects in each frame's update.

## Example

```ts
const model = entity.addFeature(new Daisy.ModelFeature({ url: "/models/ChandraXrayObservatory.glb" }));
model.onload(() => {
 model.transformNode("antenna").setShow(false);
 model.transformNode("body").setScale(1.2);
});
```

## Constructors

### Constructor

> **new ModelNodeTransform**(): `ModelNodeTransform`

#### Returns

`ModelNodeTransform`

## Accessors

### state

#### Get Signature

> **get** **state**(): [`ModelNodeTransformState`](../types/ModelNodeTransformState.md)

##### Returns

[`ModelNodeTransformState`](../types/ModelNodeTransformState.md)

## Methods

### clearColorOverlay()

> **clearColorOverlay**(): `this`

#### Returns

`this`

***

### getUnsafeState()

> **getUnsafeState**(): [`ModelNodeTransformState`](../types/ModelNodeTransformState.md)

#### Returns

[`ModelNodeTransformState`](../types/ModelNodeTransformState.md)

***

### reset()

> **reset**(): `this`

#### Returns

`this`

***

### setColorOverlay()

> **setColorOverlay**(`color?`, `blend?`): `this`

#### Parameters

##### color?

[`DColor`](../types/DColor.md)

##### blend?

`number` = `0.25`

#### Returns

`this`

***

### setColorOverlayBlend()

> **setColorOverlayBlend**(`blend?`): `this`

#### Parameters

##### blend?

`number`

#### Returns

`this`

***

### setMatrix()

> **setMatrix**(`matrix?`): `this`

#### Parameters

##### matrix?

`Matrix4` \| `null`

#### Returns

`this`

***

### setOpacity()

> **setOpacity**(`opacity?`): `this`

#### Parameters

##### opacity?

`number`

#### Returns

`this`

***

### setRotation()

> **setRotation**(`rotation?`): `this`

#### Parameters

##### rotation?

`Quaternion`

#### Returns

`this`

***

### setRotationAxisAngle()

> **setRotationAxisAngle**(`axis`, `angleRad`): `this`

#### Parameters

##### axis

`Cartesian3`

##### angleRad

`number`

#### Returns

`this`

***

### setRotationAxisAngleDeg()

> **setRotationAxisAngleDeg**(`axis`, `angleDeg`): `this`

#### Parameters

##### axis

`Cartesian3`

##### angleDeg

`number`

#### Returns

`this`

***

### setRotationHpr()

> **setRotationHpr**(`headingRad?`, `pitchRad?`, `rollRad?`): `this`

#### Parameters

##### headingRad?

`number` = `0`

##### pitchRad?

`number` = `0`

##### rollRad?

`number` = `0`

#### Returns

`this`

***

### setRotationHprDeg()

> **setRotationHprDeg**(`headingDeg?`, `pitchDeg?`, `rollDeg?`): `this`

#### Parameters

##### headingDeg?

`number` = `0`

##### pitchDeg?

`number` = `0`

##### rollDeg?

`number` = `0`

#### Returns

`this`

***

### setScale()

> **setScale**(`scale?`): `this`

#### Parameters

##### scale?

`number` \| `Cartesian3`

#### Returns

`this`

***

### setShow()

> **setShow**(`show?`): `this`

#### Parameters

##### show?

`boolean`

#### Returns

`this`

***

### setTranslation()

> **setTranslation**(`translation?`): `this`

#### Parameters

##### translation?

`Cartesian3`

#### Returns

`this`
