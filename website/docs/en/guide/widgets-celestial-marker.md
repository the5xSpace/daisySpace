# Celestial Marker

[CelestialMarkerWidget](/en/api/classes/CelestialMarkerWidget) draws point markers and text labels for celestial bodies (Earth, Moon, Sun, Mars) in the 3D scene. Inherits from [MarkerWidget](/en/api/classes/MarkerWidget).

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addWidget(new Daisy.CelestialMarkerWidget({
    earth: true,
    moon: true,
    sun: true,
    mars: false,
    showDistance: 90_000_000,
    pointSize: 8,
    font: "14px sans-serif",
}))
```

| Option | Type | Default | Description |
|--------|------|:---:|---|
| `earth` | boolean | `false` | Whether to show the Earth marker |
| `moon` | boolean | `false` | Whether to show the Moon marker |
| `sun` | boolean | `false` | Whether to show the Sun marker |
| `mars` | boolean | `false` | Whether to show the Mars marker |
| `showDistance` | number | `90000000` | Maximum camera distance for marker visibility (meters) |
| `pointSize` | number | `8` | Marker point pixel size |
| `font` | string | `"14px sans-serif"` | Label font |

Marker targets are determined at Widget construction time; to change targets at runtime, destroy the old Widget and create a new one.

## Custom Targets

`CelestialMarkerWidget` supports arbitrary marker targets via the `custom` field:

```typescript
new Daisy.CelestialMarkerWidget({
    sun: true,
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
