# Reference Plane and Grid Layers

Auxiliary layers are added to the scene via `engine.addViewLayer()`, independent of imagery/terrain layers. All layers inherit from [Layer](/en/api/classes/Layer), supporting the `show` / `destroy` lifecycle.

## Reference Planes

### Equatorial Plane

[EquatorialPlaneLayers](/en/api/classes/Plane.EquatorialPlaneLayers) draws a semi-transparent disk + grid at the Earth's equatorial position:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addViewLayer(new Daisy.Plane.EquatorialPlaneLayers({
    color: Daisy.Color.CYAN,
    planeAlpha: 0.15,
}))
```

### Ecliptic Plane

[EclipticPlaneLayers](/en/api/classes/Plane.EclipticPlaneLayers) draws a disk + grid at the ecliptic plane position:

```typescript
engine.addViewLayer(new Daisy.Plane.EclipticPlaneLayers({
    show: true,
    color: Daisy.Color.ORANGE,
    planeAlpha: 0.12,
}))
```

### Ecliptic Reference Plane (with scale)

[EclipticReferencePlaneLayers](/en/api/classes/Plane.EclipticReferencePlaneLayers) draws concentric circle scale marks on the ecliptic plane:

```typescript
engine.addViewLayer(new Daisy.Plane.EclipticReferencePlaneLayers({
    color: Daisy.Color.WHITE,
    planeAlpha: 0.08,
}))
```

### PlaneLayer Common Options

The above three share [PlaneLayerOptions](/en/api/interfaces/Plane.PlaneLayerOptions):

| Option | Type | Default | Description |
|--------|------|:---:|-------------|
| `show` | `boolean` | `true` | Whether to show |
| `color` | `DColor` | — | Grid line color |
| `planeAlpha` | `number` | `0.1` | Disk fill transparency |
| `segments` | `number` | — | Disk segments (higher = smoother) |
| `referenceRadius` | `number` | — | Reference radius (meters) |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance display condition |
| `gridStyle` | `PlaneGridStyle` | — | Grid style (see below) |

### Grid Style

| Option | Type | Default | Description |
|--------|------|:---:|-------------|
| `followCamera` | `boolean` | `true` | Whether to adapt grid density based on camera distance |
| `cellPixelSize` | `number` | `80` | Target grid cell screen pixel size |
| `linePixelWidth` | `number` | `1` | Grid line pixel width |
| `minCellSizeMeters` | `number` | `100000` | Minimum grid cell size (prevents over-density) |
| `maxCellSizeMeters` | `number` | `5e9` | Maximum grid cell size (prevents under-density) |
| `cellAlpha` | `number` | `0.1` | Grid cell fill transparency |

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

## Latitude/Longitude Grids

### EarthGridLayers

[EarthGridLayers](/en/api/classes/EarthGridLayers) draws latitude/longitude grid lines on the Earth's surface:

```typescript
engine.addViewLayer(new Daisy.EarthGridLayers({
    show: true,
    color: Daisy.Color.WHITE.withAlpha(0.3),
    width: 1,
}))
```

### CelestialGeodeticGridLayers

[CelestialGeodeticGridLayers](/en/api/classes/CelestialGeodeticGridLayers) draws latitude/longitude grids on a specified celestial body surface. `EarthGridLayers` is its Earth-default subclass:

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
|--------|------|-------------|
| `show` | `boolean` | Whether to show |
| `color` | `DColor` | Grid line color |
| `width` | `number` | Line width (pixels) |
| Constructor second parameter | `CelestialEllipsoid` | Bound celestial body (defaults to Earth when omitted) |

## Celestial Sphere Grid

[CelestialSphereGridLayers](/en/api/classes/CelestialSphereGridLayers) draws a grid sphere on the celestial sphere at latitude/longitude intervals:

```typescript
engine.addViewLayer(new Daisy.CelestialSphereGridLayers({
    show: true,
    color: Daisy.Color.WHITE.withAlpha(0.15),
    radius: 10_000_000,
}))
```

| Option | Type | Default | Description |
|--------|------|:---:|-------------|
| `show` | `boolean` | `true` | Whether to show |
| `color` | `DColor` | — | Grid line color |
| `radius` | `number` | — | Sphere radius (meters) |

## Night Tiles

[NightTileLayer](/en/api/classes/NightTileLayer) restricts night tiles to display only on the Earth's night side. It uses the same day/night boundary calculation for both 3D Earth and 2D maps, defaulting to Daisy's built-in offline night tiles (`static/night`, `z=0..3`), with no dependency on third-party network services.

```typescript
import * as Daisy from "daisy-space-sdk"

const nightTiles = new Daisy.NightTileLayer({
    dayAlpha: 0,
    nightAlpha: 1,
    brightness: 1.15,
})
engine.addWidget(nightTiles)
```

When remote night light data is needed, you can pass a Daisy imagery source configuration. The example below uses NASA GIBS:

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
|--------|:---:|-------------|
| `show` | `true` | Whether to show night tiles |
| `dayAlpha` | `0` | Day area transparency |
| `nightAlpha` | `1` | Night area transparency |
| `brightness` | `1` | Tile brightness |
| `contrast` | `1` | Tile contrast |
| `enableLighting` | `true` | Auto-enable Earth day/night calculation |
| `source` | Daisy built-in offline XYZ | Custom Daisy imagery source; can pass XYZ, WMTS, etc. remote sources |

`NightTileLayer` does not rewrite original tile pixels, nor does it control the base imagery's maximum level. The base imagery's `maxLevel` should be set in the base imagery source configuration; the night effect only blends its own imagery based on the Earth's lighting state. After passing a `source`, tile requests and service capabilities are the responsibility of the user-provided imagery source configuration.

## Sun Cone

[SunConeLayer](/en/api/classes/SunConeLayer) draws the umbra and penumbra on the side of the celestial body facing away from the Sun. It is suitable for solar/lunar eclipse analysis, spacecraft shadow entry/exit, and solar state analysis, not a decorative layer required for ordinary maps.

The sun cone only has clear spatial meaning in 3D, so **2D mode does not create cone primitives**; switching back to 3D will automatically rebuild following the Daisy Layer lifecycle. Night tiles do not depend on the sun cone, and the two can be used independently.

```typescript
const sunCone = new Daisy.SunConeLayer({
    body: Daisy.PW.CelestialEllipsoid.Earth(),
    umbraColor: Daisy.Color.BLUE.withAlpha(0.34),
    penumbraColor: Daisy.Color.ORANGE.withAlpha(0.16),
    visualLengthScale: 0.12,
})
engine.addViewLayer(sunCone)
```

`visualLengthScale` only compresses the display length, allowing the celestial body and cone to be identified in the same field of view; `calculateSunConeDimensions()` and occlusion determination always use real physical dimensions.

### Determining a Moving Object's Lighting State

Pass the current world coordinates of an entity or physical object directly to `getSunOcclusionState()`:

```typescript
const position = satellite.getCurrentPosition()
if (position) {
    const state = Daisy.getSunOcclusionState(position, engine.getCurrentTime())
    // state: "sunlit" | "penumbra" | "umbra"
}
```

Reuse the same set of celestial body objects for custom central bodies:

```typescript
const moon = Daisy.PW.CelestialEllipsoid.Moon()
const sun = Daisy.PW.CelestialEllipsoid.Sun()
const state = Daisy.getSunOcclusionState(position, engine.getCurrentTime(), {
    body: moon,
    sun,
})
```

### Mode and Lifecycle

| Capability | 3D | 2D | morph Behavior |
|------------|:---:|:---:|----------------|
| Night tiles | Supported | Supported | Destroys own imagery and re-registers |
| Sun cone umbra/penumbra | 3D control | - | Creates spatial primitives only in 3D scenes |
| Sun occlusion calculation | Supported | Supported | Pure computation, holds no rendering resources |

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

> `removeViewLayer()` is a compatibility interface that only removes the layer from the update collection; `destroy()` must be called to release resources. New code is recommended to use `removeWidget(layer, true)`.

> **Related API**: Plane.[EclipticPlaneLayers](/en/api/classes/Plane.EclipticPlaneLayers) · Plane.[EquatorialPlaneLayers](/en/api/classes/Plane.EquatorialPlaneLayers) · Plane.[EclipticReferencePlaneLayers](/en/api/classes/Plane.EclipticReferencePlaneLayers) · [EarthGridLayers](/en/api/classes/EarthGridLayers) · [CelestialGeodeticGridLayers](/en/api/classes/CelestialGeodeticGridLayers) · [CelestialSphereGridLayers](/en/api/classes/CelestialSphereGridLayers) · [NightTileLayer](/en/api/classes/NightTileLayer) · [SunConeLayer](/en/api/classes/SunConeLayer)
