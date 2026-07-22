[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialGeodeticGridOptions

# Interface: CelestialGeodeticGridOptions

## Extended by

- [`earthGridOptions`](earthGridOptions.md)

## Properties

### color?

> `optional` **color?**: `Color`

Color.

#### Default

```ts
Color.LIGHTGREEN.withAlpha(0.5)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

***

### distanceDisplayLevel?

> `optional` **distanceDisplayLevel?**: [`ViewDistanceLevel`](../enums/ViewDistanceLevel.md)

View distance level (used with the Engine's view distance strategy).

#### Default

```ts
ViewDistanceLevel.FAR
```

***

### followCamera?

> `optional` **followCamera?**: `boolean`

Whether the label follows the camera (stable display in screen space).

#### Default

```ts
true
```

***

### id?

> `optional` **id?**: `string`

Unique ID.

#### Default

```ts
"GeodeticGrid"
```

***

### labelOptions?

> `optional` **labelOptions?**: [`LabelOptionsWithFormat`](../types/LabelOptionsWithFormat.md)

Label configuration.

***

### material?

> `optional` **material?**: `Material`

Material.

***

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

***

### showLabel?

> `optional` **showLabel?**: `boolean`

Whether to show label.

#### Default

```ts
true
```

***

### step?

> `optional` **step?**: `number`

Longitude/latitude grid step (in degrees).

#### Default

```ts
10
```

***

### width?

> `optional` **width?**: `number`

Line width (pixels).

#### Default

```ts
1
```
