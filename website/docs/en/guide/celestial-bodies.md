# Celestial Bodies

> **Experimental**: The celestial-body module is currently experimental, and its API and rendering behavior may change in future versions. Use it with caution in production.

DaisySpace-Sdk can switch a simulation scene to celestial bodies other than Earth, such as the Moon and Mars. It provides celestial-ellipsoid rendering, latitude/longitude grids, and coordinate transformations.

## Architecture

```
CelestialBody（抽象基类）
  ├── Moon   ── 月面材质 + 晨昏线 shader
  └── Mars   ── 火星表面材质 + 大气层渲染
```

Each body is managed by a `CelestialBody` subclass, while `CelestialEllipsoid` provides ellipsoid geometry, coordinate transformations, and ray intersections.

## PW.Moon — Moon

Create a lunar ellipsoid and switch to a Moon scene:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("container")
const moon = new Daisy.PW.Moon({
    name: "Moon",
    lockCamera: true,       // 相机锁定到月球相对坐标
})

engine.switchToCelestial(moon)
moon.bindEngine(engine)
```

`switchToCelestial()` switches the engine's primary celestial body to the Moon. Entities added afterward use the Moon as their reference frame.

### Moon-Specific Features

- **Surface gravity**: 1.62 m/s²
- **Ellipsoid coordinate system**: `ELLIPSOID.MOON` supports conversion from latitude/longitude to selenocentric coordinates.
- **Terminator shader**: When `terminator` is enabled, renders the light transition on the lunar material according to the Sun direction.
- **Camera tracking**: With `lockCamera: true`, the camera follows the Moon and `BodyTrackedCameraController` corrects the view each frame.
- **Latitude/longitude grid**: The `grid` option controls coordinate-grid display.

### Moon Constructor Parameters

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `name` | `string` | `"Moon"` | Body name |
| `lockCamera` | `boolean` | — | Whether to lock the camera to the Moon |
| `ellipsoid` | `false` \| `{ show?, terminator?, shadows? }` | — | Ellipsoid configuration; `false` disables it |
| `grid` | `false` \| `GridConfig` | — | Latitude/longitude grid configuration; `false` disables it |
| `bodyAxis` | `boolean` \| `BodyAxisOptions` | — | Body-axis display |
| `arrowPointers` | `ArrowPointerOptions[]` | — | List of direction arrows |
| `track` | `boolean` | — | Whether to enable camera tracking |

## PW.Mars — Mars

```typescript
const mars = new Daisy.PW.Mars({
    name: "Mars",
    lockCamera: true,
    atmosphere: { show: true, intensity: 0 },
})

engine.switchToCelestial(mars)
mars.bindEngine(engine)
```

### Mars-Specific Features

- **Surface gravity**: 3.71 m/s²
- **Atmosphere rendering**: Implemented through `CelestialAtmosphereFeature`, with Rayleigh/Mie scattering parameters.
- **Atmosphere configuration**: `atmosphere` can be a boolean or detailed options object; `intensity` controls atmospheric strength.

### Mars Constructor Parameters

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `name` | `string` | `"Mars"` | Body name |
| `lockCamera` | `boolean` | — | Whether to lock the camera to Mars |
| `atmosphere` | `boolean` \| `{ show?, intensity? }` | — | Atmosphere switch and intensity |
| `ellipsoid` | `false` \| `{ show?, terminator?, shadows? }` | — | Ellipsoid configuration |
| `grid` | `false` \| `GridConfig` | — | Latitude/longitude grid configuration |
| `bodyAxis` | `boolean` \| `BodyAxisOptions` | — | Body-axis display |
| `arrowPointers` | `ArrowPointerOptions[]` | — | List of direction arrows |
| `track` | `boolean` | — | Whether to enable camera tracking |

## CelestialEllipsoid — Celestial Ellipsoid Utility

`CelestialEllipsoid` encapsulates celestial-ellipsoid geometry and coordinate transformations. Use its static factory methods to obtain preconfigured body instances:

```typescript
// 工厂方法
const earth = Daisy.PW.CelestialEllipsoid.Earth()    // WGS84，原点即地心
const moon = Daisy.PW.CelestialEllipsoid.Moon({      // 动态月球位置（Simon1994 行星星历）
    time: () => engine.getCurrentTime(),
})
const mars = Daisy.PW.CelestialEllipsoid.create({    // 动态火星位置
    ellipsoid: Daisy.ELLIPSOID.MARS,
    time: () => engine.getCurrentTime(),
    position: (time) => Daisy.Utils.getMarsPositionECEF(time),
})
```

### Core Methods

| Method | Description |
|------|------|
| `getPositionECEF(time?)` | Get the body's center in ECEF coordinates |
| `getBodyToWorldRotation(time?)` | Get the rotation matrix from body-fixed to world coordinates |
| `localToWorldPoint(local, time?)` | Convert local coordinates to ECEF world coordinates |
| `worldToLocalPoint(ecef, time?)` | Convert ECEF world coordinates to local coordinates |
| `rayIntersection(ray, time?)` | Intersect a ray with the celestial ellipsoid |
| `cartesianToCartographic(ecef)` | Convert ECEF to latitude/longitude (Cartographic) |
| `cartographicToCartesian(carto)` | Convert latitude/longitude to ECEF |
| `cameraHeightMeters(camPos, time?)` | Get camera height above the body surface |
| `isEarth()` | Determine whether the current ellipsoid is Earth |
| `getSurfaceGravity()` | Get the surface-gravity constant in m/s² |

### Custom Celestial Ellipsoid

```typescript
const custom = Daisy.PW.CelestialEllipsoid.create({
    ellipsoid: Daisy.ELLIPSOID.MARS,
    time: () => engine.getCurrentTime(),
    position: (time) => Daisy.Utils.getMarsPositionECEF(time),
    surfaceGravity: 3.71,
})
```

## Switch Engine Scenes

`Engine` provides two methods for managing the current celestial scene:

| Method | Description |
|------|------|
| `engine.switchToCelestial(body)` | Switch to the specified celestial scene |
| `engine.removeCelestial(body)` | Remove the body from the scene |

After switching, the engine uses the new body as its center, and subsequent `entity.position` values and related calculations use that body as the reference frame.

## lockCamera — Camera Lock

When `lockCamera: true`, the camera automatically switches to the body-relative coordinate system:

- Moon: The camera is positioned above the equator with the spin axis upward.
- Mars: Above 0° longitude and 0° latitude, with the up direction corrected by Gram-Schmidt.

After locking, use `setSuppressLock(true)` to pause it temporarily, such as during a flyTo animation, and `resumeCameraLock()` to restore it.

## Grid Suppression

Use `setGridSuppressShow(value)` to temporarily hide or show the latitude/longitude grid during camera transitions:

```typescript
moon.setGridSuppressShow(true)  // 隐藏网格
// ... 相机动画 ...
moon.setGridSuppressShow(false) // 恢复
```

## Complete Example

```typescript
// 1. 创建月球场景
const moon = new Daisy.PW.Moon({
    name: "Moon",
    lockCamera: true,
    grid: { show: true },
    bodyAxis: true,
})

engine.switchToCelestial(moon)
moon.bindEngine(engine)

// 2. 在月球表面添加实体
const entity = engine.createEntity("Lunar-Lander")
entity.position = Daisy.Cartesian3.fromDegrees(0, 0, 1000, Daisy.ELLIPSOID.MOON)
entity.addFeature(new Daisy.PointFeature({
    pixelSize: 8,
    color: Daisy.Color.CYAN,
}))

// 3. 天体标记组件
engine.addWidget(new Daisy.CelestialMarkerWidget({
    sun: true,
    earth: true,
    mars: true,
}))

// 4. 移除天体
engine.removeCelestial(moon)
```

---

> **Related API**: [PW.Moon](/en/api/classes/PW.Moon) · [PW.Mars](/en/api/classes/PW.Mars) · [PW.CelestialEllipsoid](/en/api/classes/PW.CelestialEllipsoid) · [Engine](/en/api/classes/Engine)
