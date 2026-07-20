# Celestial System

> **Experimental**: The celestial system module is currently in an experimental stage. The API and rendering effects may change in future versions. Use with caution in production environments.

DaisySpace-Sdk supports switching the simulation scene to celestial bodies other than Earth (Moon, Mars, etc.), providing complete celestial ellipsoid rendering, latitude/longitude grids, and coordinate transformation capabilities.

## Architecture

```
CelestialBody（抽象基类）
  ├── Moon   ── 月面材质 + 晨昏线 shader
  └── Mars   ── 火星表面材质 + 大气层渲染
```

Each celestial body is managed by a `CelestialBody` subclass, with the underlying `CelestialEllipsoid` providing ellipsoid geometry, coordinate transformation, and ray intersection.

## PW.Moon — Moon

Create a Moon ellipsoid and switch to the Moon scene:

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

`switchToCelestial()` switches the engine's primary celestial body to the Moon, and subsequent entities will use the Moon as their reference frame.

### Moon-Specific Features

- **Surface gravity**: 1.62 m/s²
- **Ellipsoid coordinate system**: `ELLIPSOID.MOON`, supports conversion between latitude/longitude and Moon-centered coordinates
- **Terminator shader**: When the `terminator` option is enabled, renders a light/dark transition on the Moon surface material based on the Sun direction
- **Camera tracking**: When `lockCamera: true`, the camera always follows the Moon; `BodyTrackedCameraController` corrects the view angle each frame
- **Latitude/longitude grid**: The `grid` option controls coordinate grid display

### Moon Constructor Parameters

| Parameter | Type | Default | Description |
|-----------|------|:---:|-------------|
| `name` | `string` | `"Moon"` | Celestial body name |
| `lockCamera` | `boolean` | — | Whether to lock the camera to the Moon |
| `ellipsoid` | `false` \| `{ show?, terminator?, shadows? }` | — | Ellipsoid configuration, `false` to disable |
| `grid` | `false` \| `GridConfig` | — | Latitude/longitude grid configuration, `false` to disable |
| `bodyAxis` | `boolean` \| `BodyAxisOptions` | — | Body axis display |
| `arrowPointers` | `ArrowPointerOptions[]` | — | Arrow pointer list |
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
- **Atmosphere rendering**: Implemented via `CelestialAtmosphereFeature`, supports Rayleigh/Mie scattering parameters
- **Atmosphere configuration**: `atmosphere` can be a boolean or a detailed parameter object; `intensity` controls atmospheric intensity

### Mars Constructor Parameters

| Parameter | Type | Default | Description |
|-----------|------|:---:|-------------|
| `name` | `string` | `"Mars"` | Celestial body name |
| `lockCamera` | `boolean` | — | Whether to lock the camera to Mars |
| `atmosphere` | `boolean` \| `{ show?, intensity? }` | — | Atmosphere toggle and intensity |
| `ellipsoid` | `false` \| `{ show?, terminator?, shadows? }` | — | Ellipsoid configuration |
| `grid` | `false` \| `GridConfig` | — | Latitude/longitude grid configuration |
| `bodyAxis` | `boolean` \| `BodyAxisOptions` | — | Body axis display |
| `arrowPointers` | `ArrowPointerOptions[]` | — | Arrow pointer list |
| `track` | `boolean` | — | Whether to enable camera tracking |

## CelestialEllipsoid — Celestial Ellipsoid Utility

`CelestialEllipsoid` encapsulates celestial ellipsoid geometry and coordinate transformations. Get pre-configured celestial body instances via static factory methods:

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
|--------|-------------|
| `getPositionECEF(time?)` | Get the celestial body center's ECEF coordinates |
| `getBodyToWorldRotation(time?)` | Get the celestial body's rotation matrix from body to world |
| `localToWorldPoint(local, time?)` | Local coordinates → ECEF world coordinates |
| `worldToLocalPoint(ecef, time?)` | ECEF world coordinates → Local coordinates |
| `rayIntersection(ray, time?)` | Ray intersection with the celestial ellipsoid |
| `cartesianToCartographic(ecef)` | ECEF → Latitude/longitude (Cartographic) |
| `cartographicToCartesian(carto)` | Latitude/longitude → ECEF |
| `cameraHeightMeters(camPos, time?)` | Camera height above the celestial body surface |
| `isEarth()` | Check if the current ellipsoid is Earth |
| `getSurfaceGravity()` | Get surface gravity constant (m/s²) |

### Custom Celestial Ellipsoid

```typescript
const custom = Daisy.PW.CelestialEllipsoid.create({
    ellipsoid: Daisy.ELLIPSOID.MARS,
    time: () => engine.getCurrentTime(),
    position: (time) => Daisy.Utils.getMarsPositionECEF(time),
    surfaceGravity: 3.71,
})
```

## Engine Scene Switching

`Engine` provides two methods for managing the current celestial body scene:

| Method | Description |
|--------|-------------|
| `engine.switchToCelestial(body)` | Switch to the specified celestial body scene |
| `engine.removeCelestial(body)` | Remove the celestial body from the scene |

After switching, the engine is centered on the new celestial body, and subsequent `entity.position` and related calculations will use that body as the reference frame.

## lockCamera — Camera Lock

When `lockCamera: true`, the camera automatically switches to the celestial body-relative coordinate system:

- Moon: Camera positioned above the equator, spin axis upward
- Mars: Above 0° longitude/0° latitude, Gram-Schmidt corrected up direction

After locking, use `setSuppressLock(true)` to temporarily pause (e.g., during flyTo animation), and `resumeCameraLock()` to restore.

## Grid Suppression

Use `setGridSuppressShow(value)` to temporarily hide/show the latitude/longitude grid, suitable for camera transition animations:

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
