[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / earthGridOptions

# Interface: earthGridOptions

## Extends

- [`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md)

## Properties

### color?

> `optional` **color?**: `Color`

Color.

#### Default

```ts
Color.LIGHTGREEN.withAlpha(0.5)
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`color`](CelestialGeodeticGridOptions.md#color)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`distanceDisplayCondition`](CelestialGeodeticGridOptions.md#distancedisplaycondition)

***

### distanceDisplayLevel?

> `optional` **distanceDisplayLevel?**: [`ViewDistanceLevel`](../enums/ViewDistanceLevel.md)

View distance level (used with the Engine's view distance strategy).

#### Default

```ts
ViewDistanceLevel.FAR
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`distanceDisplayLevel`](CelestialGeodeticGridOptions.md#distancedisplaylevel)

***

### followCamera?

> `optional` **followCamera?**: `boolean`

Whether the label follows the camera (stable display in screen space).

#### Default

```ts
true
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`followCamera`](CelestialGeodeticGridOptions.md#followcamera)

***

### id?

> `optional` **id?**: `string`

Unique ID.

#### Default

```ts
"GeodeticGrid"
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`id`](CelestialGeodeticGridOptions.md#id)

***

### labelOptions?

> `optional` **labelOptions?**: [`LabelOptionsWithFormat`](../types/LabelOptionsWithFormat.md)

Label configuration.

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`labelOptions`](CelestialGeodeticGridOptions.md#labeloptions)

***

### material?

> `optional` **material?**: `Material`

Material.

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`material`](CelestialGeodeticGridOptions.md#material)

***

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`show`](CelestialGeodeticGridOptions.md#show)

***

### showLabel?

> `optional` **showLabel?**: `boolean`

Whether to show label.

#### Default

```ts
true
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`showLabel`](CelestialGeodeticGridOptions.md#showlabel)

***

### step?

> `optional` **step?**: `number`

Longitude/latitude grid step (in degrees).

#### Default

```ts
10
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`step`](CelestialGeodeticGridOptions.md#step)

***

### width?

> `optional` **width?**: `number`

Line width (pixels).

#### Default

```ts
1
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`width`](CelestialGeodeticGridOptions.md#width)
