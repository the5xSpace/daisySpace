# Reference Planes and Grid Layers

Auxiliary layers are added to the scene through `engine.addViewLayer()` independently of imagery and terrain layers. All layers inherit from [Layer](/en/api/classes/Layer) and support the `show` / `destroy` lifecycle.

## Reference Planes

### Equatorial Plane

[EquatorialPlaneLayers](/en/api/classes/Plane.EquatorialPlaneLayers) draws a translucent disk and grid at Earth's equator:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addViewLayer(new Daisy.Plane.EquatorialPlaneLayers({
    color: Daisy.Color.CYAN,
    planeAlpha: 0.15,
}))
```

### Ecliptic Plane

[EclipticPlaneLayers](/en/api/classes/Plane.EclipticPlaneLayers) draws a disk and grid on the ecliptic plane:

```typescript
engine.addViewLayer(new Daisy.Plane.EclipticPlaneLayers({
    show: true,
    color: Daisy.Color.ORANGE,
    planeAlpha: 0.12,
}))
```

### Ecliptic Reference Plane (with Scale Markers)

[EclipticReferencePlaneLayers](/en/api/classes/Plane.EclipticReferencePlaneLayers) draws concentric scale markers on the ecliptic plane:

```typescript
engine.addViewLayer(new Daisy.Plane.EclipticReferencePlaneLayers({
    color: Daisy.Color.WHITE,
    planeAlpha: 0.08,
}))
```

### Common PlaneLayer Options

The three layers above share [PlaneLayerOptions](/en/api/interfaces/Plane.PlaneLayerOptions):

| Option | Type | Default | Description |
|------|------|:---:|------|
| `show` | `boolean` | `true` | Whether to show the layer |
| `color` | `DColor` | — | Grid-line color |
| `planeAlpha` | `number` | `0.1` | Disk fill opacity |
| `segments` | `number` | — | Number of disk segments; larger values are smoother |
| `referenceRadius` | `number` | — | Reference radius in meters |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance display condition |
| `gridStyle` | `PlaneGridStyle` | — | Grid style (see below) |

### Grid Style

| Option | Type | Default | Description |
|------|------|:---:|------|
| `followCamera` | `boolean` | `true` | Adapt grid density to camera distance |
| `cellPixelSize` | `number` | `80` | Target grid-cell size in screen pixels |
| `linePixelWidth` | `number` | `1` | Grid-line width in pixels |
| `minCellSizeMeters` | `number` | `100000` | Minimum grid-cell size to prevent excessive density |
| `maxCellSizeMeters` | `number` | `5e9` | Maximum grid-cell size to prevent sparse grids |
| `cellAlpha` | `number` | `0.1` | Grid-cell fill opacity |

```typescript
new Daisy.Plane.EquatorialPlaneLayers({
    color: Daisy.Color.CYAN,
    planeAlpha: 0.1,
    gridStyle: {
        followCamera: true,
        cellPixelSize: 60,
        linePixelWidth: 1.5,
        cellAlpha: 0.08,
    },
})
```

## Geodetic Grids

### EarthGridLayers

[EarthGridLayers](/en/api/classes/EarthGridLayers) draws longitude and latitude grid lines on the Earth's surface:

```typescript
engine.addViewLayer(new Daisy.EarthGridLayers({
    show: true,
    color: Daisy.Color.WHITE.withAlpha(0.3),
    width: 1,
}))
```

### CelestialGeodeticGridLayers

[CelestialGeodeticGridLayers](/en/api/classes/CelestialGeodeticGridLayers) draws longitude and latitude grids on a specified celestial body. `EarthGridLayers` is its default Earth subclass:

```typescript
const mars = Daisy.PW.CelestialEllipsoid.create({
    ellipsoid: Daisy.ELLIPSOID.MARS,
})
engine.addViewLayer(new Daisy.CelestialGeodeticGridLayers({
    show: true,
    color: Daisy.Color.CYAN.withAlpha(0.2),
    width: 1,
}, mars))
```

| Option | Type | Description |
|------|------|------|
| `show` | `boolean` | Whether to show the grid |
| `color` | `DColor` | Grid-line color |
| `width` | `number` | Line width in pixels |
| Second constructor argument | `CelestialEllipsoid` | Body to bind to; defaults to Earth when omitted |

## Celestial Sphere Grid

[CelestialSphereGridLayers](/en/api/classes/CelestialSphereGridLayers) draws a gridded celestial sphere using longitude and latitude intervals:

```typescript
engine.addViewLayer(new Daisy.CelestialSphereGridLayers({
    show: true,
    color: Daisy.Color.WHITE.withAlpha(0.15),
    radius: 10_000_000,
}))
```

| Option | Type | Default | Description |
|------|------|:---:|------|
| `show` | `boolean` | `true` | Whether to show the grid |
| `color` | `DColor` | — | Grid-line color |
| `radius` | `number` | — | Sphere radius in meters |

## Night Tiles

[NightTileLayer](/en/api/classes/NightTileLayer) limits night tiles to the night side of Earth. It uses the same day/night boundary calculation for 3D Earth and 2D maps, defaults to Daisy's built-in offline night tiles (`static/night`, `z=0..3`), and does not depend on third-party network services.

```typescript
import * as Daisy from "daisy-space-sdk"

const nightTiles = new Daisy.NightTileLayer({
    dayAlpha: 0,
    nightAlpha: 1,
    brightness: 1.15,
})
engine.addWidget(nightTiles)
```

To use remote night-light data, pass a Daisy imagery-source configuration. The following example uses NASA GIBS:

```typescript
const nightTiles = new Daisy.NightTileLayer({
    source: {
        type: Daisy.GeoImageryType.WMTS,
        url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi",
        layer: "VIIRS_CityLights_2012",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level8",
    },
})
```

| Option | Default | Description |
|------|:---:|------|
| `show` | `true` | Whether to show night tiles |
| `dayAlpha` | `0` | Day-region opacity |
| `nightAlpha` | `1` | Night-region opacity |
| `brightness` | `1` | Tile brightness |
| `contrast` | `1` | Tile contrast |
| `enableLighting` | `true` | Automatically enable Earth day/night calculations |
| `source` | Daisy built-in offline XYZ | Custom Daisy imagery source; can be an XYZ, WMTS, or other remote source |

`NightTileLayer` does not rewrite source tile pixels or control the maximum level of the base imagery. Set the base imagery's `maxLevel` in the base imagery-source configuration; the night effect only blends its own imagery according to Earth's lighting state. After `source` is provided, tile requests and service capabilities are controlled by the supplied imagery-source configuration.

## Sun Cone

[SunConeLayer](/en/api/classes/SunConeLayer) draws the umbra and penumbra on the side of a celestial body facing away from the Sun. It is useful for solar/lunar eclipses, spacecraft shadow-region analysis, and solar-power state analysis, but is not a required decorative layer for ordinary maps.

The sun cone has a clear spatial meaning only in 3D, so **2D mode does not create the cone Primitive**. When switching back to 3D, it is rebuilt automatically according to the Daisy Layer lifecycle. Night tiles do not depend on the sun cone and the two can be used independently.

```typescript
const sunCone = new Daisy.SunConeLayer({
    body: Daisy.PW.CelestialEllipsoid.Earth(),
    umbraColor: Daisy.Color.BLUE.withAlpha(0.34),
    penumbraColor: Daisy.Color.ORANGE.withAlpha(0.16),
    visualLengthScale: 0.12,
})
engine.addViewLayer(sunCone)
```

`visualLengthScale` only compresses the displayed length so the body and cone can be recognized in the same view. `calculateSunConeDimensions()` and occlusion checks always use the true physical dimensions.

### Determine a Moving Object's Lighting State

Pass the current world coordinates of an Entity or physics object directly to `getSunOcclusionState()`:

```typescript
const position = satellite.getCurrentPosition()
if (position) {
    const state = Daisy.getSunOcclusionState(position, engine.getCurrentTime())
    // state: "sunlit" | "penumbra" | "umbra"
}
```

When using a custom central body, reuse the same celestial objects:

```typescript
const moon = Daisy.PW.CelestialEllipsoid.Moon()
const sun = Daisy.PW.CelestialEllipsoid.Sun()
const state = Daisy.getSunOcclusionState(position, engine.getCurrentTime(), {
    body: moon,
    sun,
})
```

### Modes and Lifecycle

| Capability | 3D | 2D | Morph behavior |
|------|:---:|:---:|------|
| Night tiles | Supported | Supported | Destroy their imagery and register again |
| Sun-cone umbra/penumbra | 3D control | - | Create spatial primitives only in 3D scenes |
| Solar occlusion calculation | Supported | Supported | Pure computation; holds no rendering resources |

## Layer Management

```typescript
const layer = new Daisy.EarthGridLayers()

// 添加
engine.addViewLayer(layer)

// 显示/隐藏
layer.show = true
layer.show = false

// 兼容接口先移出更新集合，再显式销毁
engine.removeViewLayer(layer)
layer.destroy()

// Widget 统一接口也可以一次完成移除与销毁
engine.removeWidget(layer, true)
```

> `removeViewLayer()` is a compatibility interface that only removes a layer from the update set. Call `destroy()` to release its resources. New code should use `removeWidget(layer, true)`.

> **Related APIs**: Plane.[EclipticPlaneLayers](/en/api/classes/Plane.EclipticPlaneLayers) · Plane.[EquatorialPlaneLayers](/en/api/classes/Plane.EquatorialPlaneLayers) · Plane.[EclipticReferencePlaneLayers](/en/api/classes/Plane.EclipticReferencePlaneLayers) · [EarthGridLayers](/en/api/classes/EarthGridLayers) · [CelestialGeodeticGridLayers](/en/api/classes/CelestialGeodeticGridLayers) · [CelestialSphereGridLayers](/en/api/classes/CelestialSphereGridLayers) · [NightTileLayer](/en/api/classes/NightTileLayer) · [SunConeLayer](/en/api/classes/SunConeLayer)
