# Beam Projection Computation

`Analysis.BeamProjector` is the core engine for coverage analysis. It computes a beam's projected footprint on the ground or any celestial body from a satellite matrix and sensor parameters.

## Architecture

```
BeamProjector（统一入口）
  ├── BeamProjectorCpuBackend（CPU 后端，同步/批量）
  └── BeamProjectorGpuBackend（GPU 后端，异步，基于 gpu-io）
```

`BeamProjector` manages backend initialization and fallback automatically. When the GPU is unavailable, it falls back to the CPU without manual checks.

## Construction

```typescript
import * as Daisy from "daisy-space-sdk"

// 默认 CPU 后端
const bp = new Daisy.Analysis.BeamProjector()

// 显式指定 GPU 后端（不可用时自动降级 CPU）
const bp = new Daisy.Analysis.BeamProjector(Daisy.Analysis.BeamProjectorBackend.GPU)
```

The `BeamProjectorBackend` enum values are `CPU` (`"cpu"`) and `GPU` (`"gpu"`).

## projectFootprint()

Synchronous method that returns the result of a single beam projection.

```typescript
bp.projectFootprint(input: BeamProjectorInput): FootprintResult
```

### Parameters (BeamProjectorInput)

| Parameter | Type | Description |
|------|------|------|
| `entityId` | `string` | Entity identifier used for cache deduplication |
| `entityMatrix` | `Matrix4` | Satellite ECEF world matrix (`sat.entity.getWorldMatrix(time)`) |
| `beamAttitude` | `{ azimuthDeg, elevationDeg, rollDeg }` | Beam attitude angles, in degrees |
| `sensorType` | `SensorType` | Beam type (`EllipticalCone` / `Cone` / `Pyramid` / `Cylinder`) |
| `apertureDeg` | `{ xDeg, yDeg }` | Opening angles along X/Y, in degrees |
| `beamLength` | `number` | Beam length, in meters |
| `emitDirection` | `EmitDirection` | Emission direction (`TO_GROUND` / `TO_BOTTOM` / `TO_UP`, etc.) |
| `slices` | `number` | Circumferential sampling resolution (default 32; higher values are more accurate but slower) |
| `celestialEllipsoid` | `CelestialEllipsoid` | Target celestial ellipsoid (`PW.CelestialEllipsoid.Earth()`, etc.) |
| `time` | `JulianDate` | Time of computation |

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

The `cartographic` array contains the ordered polygon outline points of the footprint.

## Asynchronous GPU Methods

Use the dedicated asynchronous methods when precise control over the backend path is required:

```typescript
// 异步 GPU 投影（如 GPU 不可用则降级 CPU）
const result: FootprintResult = await bp.projectFootprintGpu(input)

// 批量投影（内部自动多路并发）
const results: FootprintResult[] = await bp.projectFootprintBatchGpu(inputs)
```

## Rendering Coverage Footprints

The computed footprint is rendered through the Sensor's `drawFootprint()` method:

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

`drawFootprint()` automatically calls `BeamProjector` to compute the footprint at each sample time and draws the polygon through `ShaderPolygonFeature`.

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

## Choosing the CPU vs. GPU Backend

| Scene | Recommended backend | Reason |
|------|----------|------|
| Single / small number of projections | CPU | GPU initialization has overhead, so CPU latency is lower for small computations |
| Large batches / constellation coverage | GPU | Parallel GPU computation can significantly accelerate thousands of projections |
| Browser does not support WebGL2 | CPU (automatic fallback) | The GPU backend depends on `GpuDeviceManager.isSupported()` |
| Precision-sensitive | CPU (fallback comparison available) | GPU endpoint precision is limited by floating-point texture precision |

> **Tip**: Pass `GPU` to the constructor. The implementation automatically detects GPU availability and falls back to the CPU on failure, so no manual check is required.

---

> **Related API**: [PW.Sensor](/en/api/classes/PW.Sensor)
