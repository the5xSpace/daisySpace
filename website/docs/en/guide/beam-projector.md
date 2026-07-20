# Beam Projection Computation

`Analysis.BeamProjector` is the core engine for coverage analysis, responsible for computing the beam's projected footprint on the ground (or any celestial body) from satellite matrices and sensor parameters.

## Architecture

```
BeamProjector（统一入口）
  ├── BeamProjectorCpuBackend（CPU 后端，同步/批量）
  └── BeamProjectorGpuBackend（GPU 后端，异步，基于 gpu-io）
```

`BeamProjector` internally manages backend initialization and fallback: it automatically falls back to CPU when GPU is unavailable, with no manual intervention needed.

## Construction

```typescript
import * as Daisy from "daisy-space-sdk"

// 默认 CPU 后端
const bp = new Daisy.Analysis.BeamProjector()

// 显式指定 GPU 后端（不可用时自动降级 CPU）
const bp = new Daisy.Analysis.BeamProjector(Daisy.Analysis.BeamProjectorBackend.GPU)
```

`BeamProjectorBackend` enum values: `CPU` (`"cpu"`) and `GPU` (`"gpu"`).

## projectFootprint()

Synchronous method that returns the result of a single beam projection computation.

```typescript
bp.projectFootprint(input: BeamProjectorInput): FootprintResult
```

### Parameter Table (BeamProjectorInput)

| Parameter | Type | Description |
|-----------|------|-------------|
| `entityId` | `string` | Entity identifier, used for cache deduplication |
| `entityMatrix` | `Matrix4` | Satellite ECEF world matrix (`sat.entity.getWorldMatrix(time)`) |
| `beamAttitude` | `{ azimuthDeg, elevationDeg, rollDeg }` | Beam attitude angles (degrees) |
| `sensorType` | `SensorType` | Beam type (`EllipticalCone` / `Cone` / `Pyramid` / `Cylinder`) |
| `apertureDeg` | `{ xDeg, yDeg }` | X/Y aperture angles (degrees) |
| `beamLength` | `number` | Beam length (meters) |
| `emitDirection` | `EmitDirection` | Emission direction (`TO_GROUND` / `TO_BOTTOM` / `TO_UP` etc.) |
| `slices` | `number` | Circumferential sampling precision (default 32, higher is more accurate but slower) |
| `celestialEllipsoid` | `CelestialEllipsoid` | Target celestial ellipsoid (`PW.CelestialEllipsoid.Earth()` etc.) |
| `time` | `JulianDate` | Computation time |

### Return Value (FootprintResult)

```typescript
interface FootprintResult {
    cartographic: Daisy.Cartographic[]   // 地面 hit 点数组（经纬度弧度制）
    metadata: {
        hitCount: number           // 命中地面点数
        sampleCount: number        // 总采样点数
        dropReason?: string        // 丢弃原因（如无命中时为具体原因描述）
    }
}
```

The `cartographic` array contains the footprint polygon contour points (in order).

## Asynchronous GPU Methods

When precise control over the backend path is needed, use the dedicated async methods:

```typescript
// 异步 GPU 投影（如 GPU 不可用则降级 CPU）
const result: FootprintResult = await bp.projectFootprintGpu(input)

// 批量投影（内部自动多路并发）
const results: FootprintResult[] = await bp.projectFootprintBatchGpu(inputs)
```

## Rendering Coverage Footprints

The computed footprint is rendered via the Sensor's `drawFootprint()`:

```typescript
sensor.drawFootprint({
    begin: startTime,           // 起始时间
    end: stopTime,              // 结束时间
    union: true,                // 合并所有采样
    debugName: "demo-footprint",
    sampleStepSeconds: 30,      // 采样步长（秒）
    maxSampleCount: 500,        // 最大采样数
    fillColor: Daisy.Color.RED.withAlpha(0.12),
    outline: true,
    outlineColor: Daisy.Color.YELLOW.withAlpha(1),
    outlineWidthPx: 2,
})

// 清除已渲染的 footprint
sensor.clearFootprintUnionRenderer?.()
```

`drawFootprint()` internally calls `BeamProjector` at each sampling time to compute the footprint, and draws it via `ShaderPolygonFeature`.

## Complete Example

```typescript
const engine = await Daisy.Engine.create("container")
const seedTime = Daisy.JulianDate.fromDate(new Date("2026-07-01T00:00:00Z"))

// 1. 创建卫星并绑定引擎
const sat = new Daisy.PW.Satellite({ name: "Demo-Sat" })
sat.setTle("1 25544U 98067A   25152.50000000  .00000000  00000-0  00000-0 0  9990\n2 25544  51.6400 247.4627 0000000  51.6400 110.0000 15.50000000    001")
sat.bindEngine(engine)

// 2. 挂载传感器
const sensor = sat.addSensor({
    name: "Footprint-Sensor",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 30, yDeg: 60 },
    beamLength: 800_000,
    color: Daisy.Color.CYAN.withAlpha(0.82),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.5),
})

// 3. 创建波束投影器（GPU 优先，自动降级）
const bp = new Daisy.Analysis.BeamProjector(Daisy.Analysis.BeamProjectorBackend.GPU)

// 4. 计算单个时刻的 footprint
const startTime = engine.getStartTime()
const t0 = performance.now()
const result = bp.projectFootprint({
    entityId: "demo",
    entityMatrix: sat.entity.getWorldMatrix(startTime) ?? Daisy.Matrix4.IDENTITY,
    beamAttitude: { azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 },
    sensorType: Daisy.PW.SensorType.EllipticalCone,
    apertureDeg: { xDeg: 30, yDeg: 60 },
    beamLength: 800_000,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    slices: 32,
    celestialEllipsoid: Daisy.PW.CelestialEllipsoid.Earth(),
    time: startTime,
})
const costMs = performance.now() - t0

console.log(`采样 ${result.metadata.sampleCount} 点, 命中 ${result.metadata.hitCount} 点, 耗时 ${costMs.toFixed(1)}ms`)

// 5. 渲染 footprint 到地图
sensor.drawFootprint({
    begin: engine.getStartTime(),
    end: engine.getStopTime(),
    union: true,
    sampleStepSeconds: 30,
    maxSampleCount: 500,
    fillColor: Daisy.Color.RED.withAlpha(0.12),
    outline: true,
    outlineColor: Daisy.Color.YELLOW.withAlpha(1),
    outlineWidthPx: 2,
})

```

## CPU vs GPU Backend Selection

| Scenario | Recommended Backend | Reason |
|----------|-------------------|--------|
| Single / few projections | CPU | GPU initialization has overhead; CPU latency is lower for small computations |
| Large batch / constellation coverage | GPU | GPU parallel computation significantly accelerates thousands of projections |
| Browser doesn't support WebGL2 | CPU (auto fallback) | GPU backend depends on `GpuDeviceManager.isSupported()` |
| Precision-sensitive | CPU (fallback for comparison) | GPU endpoint precision is limited by floating-point texture precision |

> **Tip**: Simply pass `GPU` during construction — the system automatically detects GPU availability and falls back to CPU on failure, with no manual judgment needed.

---

> **Related API**: [PW.Sensor](/en/api/classes/PW.Sensor)
