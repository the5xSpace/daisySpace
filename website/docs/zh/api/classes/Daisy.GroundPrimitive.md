[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / GroundPrimitive

# Class: GroundPrimitive

A ground primitive represents geometry draped over terrain or 3D Tiles in the [Scene](Daisy.Scene.md).

A primitive combines geometry instances with an Appearance that describes the full shading, including
[Material](Daisy.Material.md) and RenderState. Roughly, the geometry instance defines the structure and placement,
and the appearance defines the visual characteristics. Decoupling geometry and appearance allows us to mix
and match most of them and add a new geometry or appearance independently of each other.


Support for the WEBGL_depth_texture extension is required to use GeometryInstances with different PerInstanceColors
or materials besides PerInstanceColorAppearance.


Textured GroundPrimitives were designed for notional patterns and are not meant for precisely mapping
textures to terrain - for that use case, use [SingleTileImageryProvider](Daisy.SingleTileImageryProvider.md).


For correct rendering, this feature requires the EXT_frag_depth WebGL extension. For hardware that do not support this extension, there
will be rendering artifacts for some viewing angles.


Valid geometries are CircleGeometry, CorridorGeometry, EllipseGeometry, PolygonGeometry, and [RectangleGeometry](Daisy.RectangleGeometry.md).


## Example

```ts
// Example 1: Create primitive with a single instance
const rectangleInstance = new Daisy.GeometryInstance({
 geometry : new Daisy.RectangleGeometry({
 rectangle : Daisy.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0)
 }),
 id : 'rectangle',
 attributes : {
 color : new Daisy.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
 }
});
scene.primitives.add(new Daisy.GroundPrimitive({
 geometryInstances : rectangleInstance
}));

// Example 2: Batch instances
const color = new Daisy.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5); // Both instances must have the same color.
const rectangleInstance = new Daisy.GeometryInstance({
 geometry : new Daisy.RectangleGeometry({
 rectangle : Daisy.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0)
 }),
 id : 'rectangle',
 attributes : {
 color : color
 }
});
const ellipseInstance = new Daisy.GeometryInstance({
 geometry : new Daisy.EllipseGeometry({
 center : Daisy.Cartesian3.fromDegrees(-105.0, 40.0),
 semiMinorAxis : 300000.0,
 semiMajorAxis : 400000.0
 }),
 id : 'ellipse',
 attributes : {
 color : color
 }
});
scene.primitives.add(new Daisy.GroundPrimitive({
 geometryInstances : [rectangleInstance, ellipseInstance]
}));
```

## Param

Object with the following properties:

## Param

The geometry instances to render.

## Param

The appearance used to render the primitive. Defaults to a flat PerInstanceColorAppearance when GeometryInstances have a color attribute.

## Param

Determines if this primitive will be shown.

## Param

When `true`, geometry vertices are optimized for the pre and post-vertex-shader caches.

## Param

When `true`, geometry vertex attributes are interleaved, which can slightly improve rendering performance but increases load time.

## Param

When `true`, the geometry vertices are compressed, which will save memory.

## Param

When `true`, the primitive does not keep a reference to the input `geometryInstances` to save memory.

## Param

When `true`, each geometry instance will only be pickable with [Scene#pick](Daisy.Scene.md#pick). When `false`, GPU memory is saved.

## Param

Determines if the primitive will be created asynchronously or block until ready. If false initializeTerrainHeights() must be called first.

## Param

Determines whether terrain, 3D Tiles or both will be classified.

## Param

For debugging only. Determines if this primitive's commands' bounding spheres are shown.

## Param

For debugging only. Determines if the shadow volume for each geometry in the primitive is drawn. Must be `true` on
 creation for the volumes to be created before the geometry is released or options.releaseGeometryInstance must be `false`.

## Constructors

### Constructor

> **new GroundPrimitive**(`options?`): `GroundPrimitive`

#### Parameters

##### options?

###### allowPicking?

`boolean`

###### appearance?

`Appearance`

###### asynchronous?

`boolean`

###### classificationType?

[`ClassificationType`](../enums/Daisy.ClassificationType.md)

###### compressVertices?

`boolean`

###### debugShowBoundingVolume?

`boolean`

###### debugShowShadowVolume?

`boolean`

###### geometryInstances?

`any`[] \| [`GeometryInstance`](Daisy.GeometryInstance.md)

###### interleave?

`boolean`

###### releaseGeometryInstances?

`boolean`

###### show?

`boolean`

###### vertexCacheOptimize?

`boolean`

#### Returns

`GroundPrimitive`

## Properties

### allowPicking

> `readonly` **allowPicking**: `boolean`

When `true`, each geometry instance will only be pickable with [Scene#pick](Daisy.Scene.md#pick). When `false`, GPU memory is saved.

***

### appearance

> **appearance**: `Appearance`

The Appearance used to shade this primitive. Each geometry
instance is shaded with the same appearance. Some appearances, like
[PerInstanceColorAppearance](Daisy.PerInstanceColorAppearance.md) allow giving each instance unique
properties.

***

### asynchronous

> `readonly` **asynchronous**: `boolean`

Determines if the geometry instances will be created and batched on a web worker.

***

### classificationType

> **classificationType**: [`ClassificationType`](../enums/Daisy.ClassificationType.md)

Determines whether terrain, 3D Tiles or both will be classified.

***

### compressVertices

> `readonly` **compressVertices**: `boolean`

When `true`, geometry vertices are compressed, which will save memory.

***

### debugShowBoundingVolume

> **debugShowBoundingVolume**: `boolean`

This property is for debugging only; it is not for production use nor is it optimized.

Draws the bounding sphere for each draw command in the primitive.


***

### debugShowShadowVolume

> **debugShowShadowVolume**: `boolean`

This property is for debugging only; it is not for production use nor is it optimized.

Draws the shadow volume for each geometry in the primitive.


***

### geometryInstances

> `readonly` **geometryInstances**: `any`[] \| [`GeometryInstance`](Daisy.GeometryInstance.md)

The geometry instances rendered with this primitive. This may
be `undefined` if `options.releaseGeometryInstances`
is `true` when the primitive is constructed.

Changing this property after the primitive is rendered has no effect.


***

### interleave

> `readonly` **interleave**: `boolean`

Determines if geometry vertex attributes are interleaved, which can slightly improve rendering performance.

***

### ready

> `readonly` **ready**: `boolean`

Determines if the primitive is complete and ready to render. If this property is
true, the primitive will be rendered the next time that [GroundPrimitive#update](#update)
is called.

***

### releaseGeometryInstances

> `readonly` **releaseGeometryInstances**: `boolean`

When `true`, the primitive does not keep a reference to the input `geometryInstances` to save memory.

***

### show

> **show**: `boolean`

Determines if the primitive will be shown. This affects all geometry
instances in the primitive.

***

### vertexCacheOptimize

> `readonly` **vertexCacheOptimize**: `boolean`

When `true`, geometry vertices are optimized for the pre and post-vertex-shader caches.

## Methods

### destroy()

> **destroy**(): `void`

Destroys the WebGL resources held by this object. Destroying an object allows for deterministic
release of WebGL resources, instead of relying on the garbage collector to destroy this object.

Once an object is destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception. Therefore,
assign the return value (`undefined`) to the object as done in the example.


#### Returns

`void`

#### Example

```ts
e = e && e.destroy();
```

***

### getGeometryInstanceAttributes()

> **getGeometryInstanceAttributes**(`id`): `any`

Returns the modifiable per-instance attributes for a [GeometryInstance](Daisy.GeometryInstance.md).

#### Parameters

##### id

`any`

The id of the [GeometryInstance](Daisy.GeometryInstance.md).

#### Returns

`any`

The typed array in the attribute's format or undefined if the is no instance with id.

#### Example

```ts
const attributes = primitive.getGeometryInstanceAttributes('an id');
attributes.color = Daisy.ColorGeometryInstanceAttribute.toValue(Daisy.Color.AQUA);
attributes.show = Daisy.ShowGeometryInstanceAttribute.toValue(true);
```

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.

If this object was destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception.


#### Returns

`boolean`

`true` if this object was destroyed; otherwise, `false`.

***

### update()

> **update**(): `void`

Called when Viewer or [Widget](Daisy.Widget.md) render the scene to
get the draw commands needed to render this primitive.

Do not call this function directly. This is documented just to
list the exceptions that may be propagated when the scene is rendered:


#### Returns

`void`

***

### initializeTerrainHeights()

> `static` **initializeTerrainHeights**(): `Promise`\<`void`\>

Initializes the minimum and maximum terrain heights. This only needs to be called if you are creating the
GroundPrimitive synchronously.

#### Returns

`Promise`\<`void`\>

A promise that will resolve once the terrain heights have been loaded.

***

### isSupported()

> `static` **isSupported**(`scene`): `boolean`

Determines if GroundPrimitive rendering is supported.

#### Parameters

##### scene

[`Scene`](Daisy.Scene.md)

The scene.

#### Returns

`boolean`

`true` if GroundPrimitives are supported; otherwise, returns `false`

***

### supportsMaterials()

> `static` **supportsMaterials**(`scene`): `boolean`

Checks if the given Scene supports materials on GroundPrimitives.
Materials on GroundPrimitives require support for the WEBGL_depth_texture extension.

#### Parameters

##### scene

[`Scene`](Daisy.Scene.md)

The current scene.

#### Returns

`boolean`

Whether or not the current scene supports materials on GroundPrimitives.
