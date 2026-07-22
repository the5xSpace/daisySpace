[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / LinkOptions

# Type Alias: LinkOptions

> **LinkOptions** = `{ target: LinkEndpoint }`

Link component configuration.

Describes the link's target endpoint, display schedule, and basic transmission line appearance.

## Example

```ts
site.addLink({
 name: "Uplink-A",
 target: relaySat,
 show: accessWindows,
 color: Daisy.Color.RED,
 material: Daisy.MaterialFactory.PolylineArrow({ color: Daisy.Color.RED, speed: 1.2 }),
 width: 3,
 direction: "forward",
});
```

## Properties

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

Link interpolation mode. Defaults to straight-line connection.

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

Whether to clamp the link to the ground. Defaults to `false`.

***

### color?

> `optional` **color?**: [`DColor`](DColor.md)

Link line color.

***

### direction?

> `optional` **direction?**: [`LinkDirection`](PW.LinkDirection.md)

Transmission arrow flow direction.

- `forward`: default direction
- `reverse`: reverse direction

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Link line material, with higher priority than `color`, `speed`, and `direction`.

- Can pass a color string or Daisy color object as a solid line material
- Can pass a custom material, e.g., `MaterialFactory.PolylineArrow(...)`
- When omitted, uses default fallback: internally generates
 arrow flow material based on `color`, `speed`, and `direction`, which is typically sufficient for regular link display; business code can safely omit this field

***

### name?

> `optional` **name?**: `string`

Link name.

***

### show?

> `optional` **show?**: [`LinkSchedule`](PW.LinkSchedule.md)

Link display schedule.

When a boolean is passed, indicates always show or hide;
when a time range or array of time ranges is passed, displays only during matching intervals.

***

### speed?

> `optional` **speed?**: `number`

Transmission arrow flow speed.

- Defaults to `0` when omitted
- When set to `0`, the default material is still displayed but without additional flow animation

***

### target

> **target**: [`LinkEndpoint`](PW.LinkEndpoint.md)

Link target endpoint.

Can pass a physical object, entity, wrapper object that resolves to an entity,
or directly pass a fixed position.

***

### width?

> `optional` **width?**: `number`

Link line width, in pixels. Defaults to `2`.
