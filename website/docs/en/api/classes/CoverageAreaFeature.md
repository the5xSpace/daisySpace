[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CoverageAreaFeature

# Class: CoverageAreaFeature

Daisy Feature abstract capability interface.

A Feature attaches renderable or interactive capabilities to a Daisy.Entity, such as models, points, lines, polygons, and UI overlays.

## Extends

- [`Feature`](Feature.md)

## Implements

- [`IFeature`](../interfaces/IFeature.md)

## Constructors

### Constructor

> **new CoverageAreaFeature**(`options`): `CoverageAreaFeature`

#### Parameters

##### options

[`CoverageAreaOptions`](../interfaces/CoverageAreaOptions.md)

#### Returns

`CoverageAreaFeature`

#### Overrides

[`Feature`](Feature.md).[`constructor`](Feature.md#constructor)

## Properties

### handle

> **handle**: (`mode`) => `void`

Default handling when the scene mode changes.

In 2D or non-3D modes, the body axis is destroyed by default to avoid abnormal display.

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`handle`](Feature.md#handle)

***

### registered

> **registered**: `boolean` = `false`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`registered`](../interfaces/IFeature.md#registered)

#### Inherited from

[`Feature`](Feature.md).[`registered`](Feature.md#registered)

***

### transformer

> **transformer**: `Transformer`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`transformer`](../interfaces/IFeature.md#transformer)

#### Inherited from

[`Feature`](Feature.md).[`transformer`](Feature.md#transformer)

***

### type

> `readonly` `static` **type**: `string` = `""`

#### Inherited from

[`Feature`](Feature.md).[`type`](Feature.md#type)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `undefined`

##### Returns

[`Entity`](Entity.md) \| `undefined`

#### Set Signature

> **set** **entity**(`value`): `void`

##### Parameters

###### value

[`Entity`](Entity.md) \| `undefined`

##### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`entity`](Feature.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

The unique identifier of the Feature.

##### Default

`${type}__${GenGuid()}`

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

The unique identifier of the Feature.

Usually generated automatically by the base class during construction: `${type}__${GenGuid()}`.
Subclasses may also override it manually before registration.

##### Default

`${type}__${GenGuid()}`

##### Parameters

###### value

`string`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`id`](../interfaces/IFeature.md#id)

#### Inherited from

[`Feature`](Feature.md).[`id`](Feature.md#id)

***

### includeInBoundingSphere

#### Get Signature

> **get** **includeInBoundingSphere**(): `boolean`

Whether the current Feature participates in the Entity bounding-sphere aggregation.

The default is `true`. Features such as helper lines and particles that should not affect the camera framing can disable it.

##### Returns

`boolean`

#### Set Signature

> **set** **includeInBoundingSphere**(`value`): `void`

Set whether the current Feature participates in the Entity bounding-sphere aggregation.

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`includeInBoundingSphere`](../interfaces/IFeature.md#includeinboundingsphere)

#### Inherited from

[`Feature`](Feature.md).[`includeInBoundingSphere`](Feature.md#includeinboundingsphere)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`isDestroyed`](../interfaces/IFeature.md#isdestroyed)

#### Inherited from

[`Feature`](Feature.md).[`isDestroyed`](Feature.md#isdestroyed)

***

### lodMode

#### Get Signature

> **get** **lodMode**(): `"none"`

Get the LOD mode of the current Feature.

##### Returns

`"none"`

#### Overrides

[`Feature`](Feature.md).[`lodMode`](Feature.md#lodmode)

***

### name

#### Get Signature

> **get** **name**(): `string`

The display name of the Feature (customized by the application).

##### Default

```ts
""
```

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

The display name of the Feature (customized by the application).

##### Default

```ts
""
```

##### Parameters

###### value

`string`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`name`](../interfaces/IFeature.md#name)

#### Inherited from

[`Feature`](Feature.md).[`name`](Feature.md#name)

***

### options

#### Get Signature

> **get** **options**(): `any`

Get the component configuration (EntityComOptions).

Subclasses usually read settings such as show, distanceDisplayCondition, and height from this object.

##### Returns

`any`

Component configuration.

#### Set Signature

> **set** **options**(`value`): `void`

Merge and update the component configuration (EntityComOptions).

Note: existing configuration is preserved while new fields are overwritten, and the LOD-remembered show state is synchronized.

##### Parameters

###### value

`any`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`options`](../interfaces/IFeature.md#options)

#### Inherited from

[`Feature`](Feature.md).[`options`](Feature.md#options)

***

### requiresEntityModelMatrix

#### Get Signature

> **get** **requiresEntityModelMatrix**(): `boolean`

Conservative default: most Features require the Entity model matrix.

##### Returns

`boolean`

Whether the current Feature requires the Entity to precompute the model matrix every frame.

Features such as points, labels, and images that only depend on the entity position can return false,
allowing scenes with many targets to skip unnecessary orientation and matrix calculations.

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`requiresEntityModelMatrix`](../interfaces/IFeature.md#requiresentitymodelmatrix)

#### Overrides

[`Feature`](Feature.md).[`requiresEntityModelMatrix`](Feature.md#requiresentitymodelmatrix)

***

### throttleable

#### Get Signature

> **get** **throttleable**(): `boolean`

Get whether the current Feature can be culled.

##### Returns

`boolean`

#### Set Signature

> **set** **throttleable**(`value`): `void`

Set whether the current Feature can be culled.

When the value changes, the owning Entity is notified to reaggregate its feature-level scheduling state when possible.

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`throttleable`](Feature.md#throttleable)

***

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`type`](../interfaces/IFeature.md#type)

#### Overrides

[`Feature`](Feature.md).[`type`](Feature.md#type-1)

***

### useLod

#### Get Signature

> **get** **useLod**(): `boolean`

Whether LOD is enabled; an external policy determines visibility.

##### Returns

`boolean`

#### Set Signature

> **set** **useLod**(`use`): `void`

Whether LOD is enabled; an external policy determines visibility.

##### Parameters

###### use

`boolean`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`useLod`](../interfaces/IFeature.md#uselod)

#### Inherited from

[`Feature`](Feature.md).[`useLod`](Feature.md#uselod)

***

### viewDistanceConst

#### Get Signature

> **get** **viewDistanceConst**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

Get the distance-display configuration.

##### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

#### Inherited from

[`Feature`](Feature.md).[`viewDistanceConst`](Feature.md#viewdistanceconst)

***

### visibility

#### Get Signature

> **get** **visibility**(): [`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

##### Returns

[`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

#### Inherited from

[`Feature`](Feature.md).[`visibility`](Feature.md#visibility)

## Methods

### beforeRegister()

> **beforeRegister**(`entity`): `void`

Pre-registration logic, which subclasses can override.

Default behavior: record the owning Entity reference.

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`beforeRegister`](Feature.md#beforeregister)

***

### destroy()

> **destroy**(): `void`

Destroy the Feature.

This removes morph listeners, destroys the event bridge and body axis, and clears the internal EventManager.

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`destroy`](../interfaces/IFeature.md#destroy)

#### Overrides

[`Feature`](Feature.md).[`destroy`](Feature.md#destroy)

***

### disableTracking()

> **disableTracking**(): `void`

Disable tracking while preserving the trackingTarget configuration.

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`disableTracking`](Feature.md#disabletracking)

***

### enableTracking()

> **enableTracking**(`options`): `void`

Enable tracking.

The tracking target can be an Entity, Cartographic, or Cartesian3. Subclasses can use
`_getTrackTargetBPosition` in update to obtain the target position and perform orientation, line, or related behavior.

#### Parameters

##### options

[`TrackingOptions`](../interfaces/TrackingOptions.md)

Configuration item.

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`enableTracking`](Feature.md#enabletracking)

***

### forceFlush()

> **forceFlush**(): `void`

Force-refresh the Feature appearance.

Used by Features that need to rebuild nodes, such as when an underlying Primitive cannot be incrementally updated.
Calls `reCreate` by default; subclasses provide the specific behavior.

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`forceFlush`](../interfaces/IFeature.md#forceflush)

#### Overrides

[`Feature`](Feature.md).[`forceFlush`](Feature.md#forceflush)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the current position of the owning Entity, consistent with Entity.getCurrentPosition.

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`Feature`](Feature.md).[`getCurrentPosition`](Feature.md#getcurrentposition)

***

### getEngine()

> **getEngine**(): [`Engine`](Engine.md) \| `undefined`

Get the owning Engine, if the Feature has been registered with an Entity.

#### Returns

[`Engine`](Engine.md) \| `undefined`

#### Inherited from

[`Feature`](Feature.md).[`getEngine`](Feature.md#getengine)

***

### getMatrix()

> **getMatrix**(): `Matrix4`

Get the transformation matrix of the current Feature.

Returns the identity matrix if no application matrix is set on transformer.

#### Returns

`Matrix4`

Transformation matrix.

#### Inherited from

[`Feature`](Feature.md).[`getMatrix`](Feature.md#getmatrix)

***

### is3d()

> **is3d**(): `boolean`

Whether the current Engine is in 3D mode.

#### Returns

`boolean`

#### Inherited from

[`Feature`](Feature.md).[`is3d`](Feature.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_mode`): `void`

Default handling when the scene mode changes.

In 2D or non-3D modes, the body axis is destroyed by default to avoid abnormal display.

#### Parameters

##### \_mode

`any`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`morphSwitchHandle`](../interfaces/IFeature.md#morphswitchhandle)

#### Overrides

`Feature.morphSwitchHandle`

***

### preUpdate()

> **preUpdate**(`entity`, `time`): `void`

#### Parameters

##### entity

`any`

##### time

`JulianDate`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`preUpdate`](../interfaces/IFeature.md#preupdate)

#### Inherited from

[`Feature`](Feature.md).[`preUpdate`](Feature.md#preupdate)

***

### register()

> **register**(`entity`): [`IFeature`](../interfaces/IFeature.md)

Register the Feature with the specified Entity.

Triggers BEFORE_REGISTER/AFTER_REGISTER/REGISTER and installs the interaction event bridge when enabled.
It also fills in the default distanceDisplayCondition when not configured by the user.

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

[`IFeature`](../interfaces/IFeature.md)

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`register`](../interfaces/IFeature.md#register)

#### Overrides

[`Feature`](Feature.md).[`register`](Feature.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

Reset internal state related to time continuity.

The default implementation is empty and can be overridden by Features that need to handle seek, rewind, or paused dragging.

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`resetTemporalState`](Feature.md#resettemporalstate)

***

### setBodyAxis()

> **setBodyAxis**(`options`): `void`

Configure the body axis (BodyAxis).

After this call, the axis is created or updated as needed during the update cycle; this is available only in 3D mode.

#### Parameters

##### options

`BodyAxisOptions`

#### Returns

`void`

#### Default

```ts
undefined 配置项
```

#### Inherited from

[`Feature`](Feature.md).[`setBodyAxis`](Feature.md#setbodyaxis)

***

### setIncludeInBoundingSphere()

> **setIncludeInBoundingSphere**(`value`): `this`

Set whether the current Feature participates in the Entity bounding-sphere aggregation.

#### Parameters

##### value

`boolean`

Whether to participate in bounding-sphere aggregation.

#### Returns

`this`

The current Feature, for method chaining.

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`setIncludeInBoundingSphere`](../interfaces/IFeature.md#setincludeinboundingsphere)

#### Inherited from

[`Feature`](Feature.md).[`setIncludeInBoundingSphere`](Feature.md#setincludeinboundingsphere)

***

### setOutline()

> **setOutline**(`outlineWidth`, `outlineColor?`): `void`

Dynamically update the outline (width and color); rebuild immediately after changes.

#### Parameters

##### outlineWidth

`number`

##### outlineColor?

`string`

#### Returns

`void`

***

### setPolygons()

> **setPolygons**(`polygons`): `void`

Update the coverage-area polygon collection.

#### Parameters

##### polygons

[`CoveragePolygon`](../interfaces/CoveragePolygon.md)[]

#### Returns

`void`

***

### setResolution()

> **setResolution**(`resolution`): `void`

Dynamically update the texture resolution (pixels per degree). Larger values are sharper but more expensive.

#### Parameters

##### resolution

`number`

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

Unregister the Feature, equivalent to destroy.

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`unregister`](../interfaces/IFeature.md#unregister)

#### Overrides

[`Feature`](Feature.md).[`unregister`](Feature.md#unregister)

***

### updateByInteraction()

> **updateByInteraction**(`interaction`, `entity`): `void`

#### Parameters

##### interaction

`InteractionComponent`

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`updateByInteraction`](../interfaces/IFeature.md#updatebyinteraction)

#### Inherited from

[`Feature`](Feature.md).[`updateByInteraction`](Feature.md#updatebyinteraction)

## Events

### offClick()

> **offClick**(`handler?`): `this`

Stop listening for Feature click events.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; omit it to remove all listeners for the event.

#### Returns

`this`

this
 click

#### Inherited from

[`Feature`](Feature.md).[`offClick`](Feature.md#offclick)

***

### offDblClick()

> **offDblClick**(`handler?`): `this`

Stop listening for Feature double-click events.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; omit it to remove all listeners for the event.

#### Returns

`this`

this
 dblclick

#### Inherited from

[`Feature`](Feature.md).[`offDblClick`](Feature.md#offdblclick)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Stop listening for scene mode changes.

#### Parameters

##### callback

(`mode`) => `void`

Callback function.
 MORPH_SWITCH

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`offMorphSwitch`](Feature.md#offmorphswitch)

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `this`

Stop listening for Feature mouse-enter events.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; omit it to remove all listeners for the event.

#### Returns

`this`

this
 mouseenter

#### Inherited from

[`Feature`](Feature.md).[`offMouseEnter`](Feature.md#offmouseenter)

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `this`

Stop listening for Feature mouse-leave events.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; omit it to remove all listeners for the event.

#### Returns

`this`

this
 mouseleave

#### Inherited from

[`Feature`](Feature.md).[`offMouseLeave`](Feature.md#offmouseleave)

***

### onAfterRegister()

> **onAfterRegister**(`callback`): `void`

Listen for the post-registration callback.

The initial LOD show value is synchronized at this stage.
 AFTER_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onAfterRegister`](../interfaces/IFeature.md#onafterregister)

#### Inherited from

[`Feature`](Feature.md).[`onAfterRegister`](Feature.md#onafterregister)

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

Listen for the pre-destruction callback.
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onBeforeDestroy`](../interfaces/IFeature.md#onbeforedestroy)

#### Inherited from

[`Feature`](Feature.md).[`onBeforeDestroy`](Feature.md#onbeforedestroy)

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

Listen for the pre-registration callback.

This callback has no parameters; use onRegister if an Entity parameter is needed.
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onBeforeRegister`](../interfaces/IFeature.md#onbeforeregister)

#### Inherited from

[`Feature`](Feature.md).[`onBeforeRegister`](Feature.md#onbeforeregister)

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

Listen for the pre-update callback.

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

(Entity, time)
 BEFORE_UPDATE

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onBeforeUpdate`](../interfaces/IFeature.md#onbeforeupdate)

#### Inherited from

[`Feature`](Feature.md).[`onBeforeUpdate`](Feature.md#onbeforeupdate)

***

### onClick()

> **onClick**(`handler`): `this`

Listen for Feature click events.

#### Parameters

##### handler

(`e`) => `void`

Event callback.

#### Returns

`this`

this
 click

#### Example

```ts
feature.onClick((e) => {
 console.log("feature clicked", e.comId);
});
```

#### Inherited from

[`Feature`](Feature.md).[`onClick`](Feature.md#onclick)

***

### onDblClick()

> **onDblClick**(`handler`): `this`

Listen for Feature double-click events.

#### Parameters

##### handler

(`e`) => `void`

Event callback.

#### Returns

`this`

this
 dblclick

#### Inherited from

[`Feature`](Feature.md).[`onDblClick`](Feature.md#ondblclick)

***

### onDestroy()

> **onDestroy**(`callback`): `void`

Listen for the destruction callback.
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onDestroy`](../interfaces/IFeature.md#ondestroy)

#### Inherited from

[`Feature`](Feature.md).[`onDestroy`](Feature.md#ondestroy)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Listen for scene mode changes.

#### Parameters

##### callback

(`mode`) => `void`

Callback function.
 MORPH_SWITCH

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`onMorphSwitch`](Feature.md#onmorphswitch)

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `this`

Listen for Feature mouse-enter events.

#### Parameters

##### handler

(`e`) => `void`

Event callback.

#### Returns

`this`

this
 mouseenter

#### Inherited from

[`Feature`](Feature.md).[`onMouseEnter`](Feature.md#onmouseenter)

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `this`

Listen for Feature mouse-leave events.

#### Parameters

##### handler

(`e`) => `void`

Event callback.

#### Returns

`this`

this
 mouseleave

#### Inherited from

[`Feature`](Feature.md).[`onMouseLeave`](Feature.md#onmouseleave)

***

### onRegister()

> **onRegister**(`callback`): `void`

Listen for registration-complete events.

#### Parameters

##### callback

(`spaceObject`) => `void`

The callback parameter is the owning Entity.
 REGISTER

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onRegister`](../interfaces/IFeature.md#onregister)

#### Inherited from

[`Feature`](Feature.md).[`onRegister`](Feature.md#onregister)

***

### onUpdate()

> **onUpdate**(`callback`): `void`

Listen for the update callback.

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

(Entity, time)
 UPDATE

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onUpdate`](../interfaces/IFeature.md#onupdate)

#### Inherited from

[`Feature`](Feature.md).[`onUpdate`](Feature.md#onupdate)
