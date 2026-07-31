# Celestial Markers

[CelestialMarkerWidget](/en/api/classes/CelestialMarkerWidget) draws point markers and text labels for celestial bodies (Earth, Moon, Sun, and Mars) in a 3D scene. It extends [MarkerWidget](/en/api/classes/MarkerWidget).

Sun, Moon, and Mars are enabled by default; Earth is disabled by default. Disabled built-in bodies do not create marker targets or invoke their ephemeris calculations on each frame.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const markerWidget = new Daisy.CelestialMarkerWidget({
    enabledBodies: [
        Daisy.CelestialMarkerBody.Sun,
        Daisy.CelestialMarkerBody.Moon,
        Daisy.CelestialMarkerBody.Mars,
        Daisy.CelestialMarkerBody.Earth,
    ],
    showDistance: 90_000_000,
    pointSize: 8,
    font: "14px sans-serif",
})

engine.addWidget(markerWidget)
```

| Option | Type | Default | Description |
|------|------|:---:|------|
| `enabledBodies` | `CelestialMarkerBody[]` | `[Sun, Moon, Mars]` | Complete list of enabled built-in bodies; an empty array disables all built-in bodies |
| `earth` / `moon` / `sun` / `mars` | boolean | - | Legacy compatibility fields. If `enabledBodies` is omitted and any of these fields is provided, only fields set to `true` are enabled; new code should use `enabledBodies` |
| `showDistance` | number | `90000000` | Maximum camera distance at which markers are visible, in meters |
| `pointSize` | number | `8` | Marker point size in pixels |
| `font` | string | `"14px sans-serif"` | Label font |

## Runtime Switching

`enabledBodies` is a complete list and can be changed at runtime through the getter/setter or methods. After switching, only built-in targets in the enabled list remain active, so disabled bodies do not continue calculating ephemerides:

```typescript
markerWidget.setEnabledBodies([
    Daisy.CelestialMarkerBody.Sun,
    Daisy.CelestialMarkerBody.Mars,
])

const enabledBodies = markerWidget.getEnabledBodies()
markerWidget.enabledBodies = [Daisy.CelestialMarkerBody.Moon]
```

## Numeric Precision

Built-in body positions use Cesium `JulianDate` and `Cartesian3`. The `Cartesian3` components use JavaScript `number` values (IEEE-754 double precision); the SDK does not downgrade ephemeris coordinates to `Float32`, so this representation is sufficient for marker display at solar-system scales.

Actual position error is primarily determined by the ephemeris model, time resolution, and ICRF/ECEF transformation, rather than the range of JavaScript `number`. To preserve precision, pass `JulianDate` and `Cartesian3` values directly instead of converting them to `Float32Array` or rounding coordinates yourself.

## Custom Targets

`CelestialMarkerWidget` supports arbitrary marker targets through the `custom` field:

```typescript
new Daisy.CelestialMarkerWidget({
    enabledBodies: [Daisy.CelestialMarkerBody.Sun],
    custom: [{
        label: "Space Station",
        color: Daisy.Color.CYAN,
        getPosition: (time) => {
            // 返回 ECEF 坐标
            return stationEntity.getPositionByTime(time)
        },
    }],
})
```

Each [MarkerTarget](/en/api/interfaces/MarkerTarget) contains `label`, `color`, and `getPosition(time)`.

> **Related API**: [CelestialMarkerWidget](/en/api/classes/CelestialMarkerWidget) · [MarkerWidget](/en/api/classes/MarkerWidget)
