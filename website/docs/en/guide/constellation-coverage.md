# Constellation Coverage Analysis

Constellation coverage analysis evaluates how a group of satellites covers the surface of Earth or another celestial body over a specified time range, including coverage percentage, maximum gap, and revisit time.

## Conceptual Model

```
Constellation（星座容器）
  ├── Satellite × N
  │     └── Sensor（波束 → BeamProjector 计算 footprint）
  └── ConstellationCoverageAnalysis（分析引擎）
        ├── 按时间步长遍历 → 每个时刻计算所有卫星的 footprint
        ├── 网格化覆盖统计 → 覆盖百分比 / 间隙 / 重访
        └── 输出 CoverageAnalysisResult（stats + polygons + summaries）
```

## Constellation Container (PW.Constellation)

[Constellation](/en/api/classes/PW.Constellation) is a satellite aggregation container that provides batch-operation APIs.

```typescript
import * as Daisy from "daisy-space-sdk"

const constellation = new Daisy.PW.Constellation()
```

### Core Methods

| Method | Description |
|------|------|
| `addSatellite(sat)` | Adds a satellite |
| `removeSatellite(sat)` | Removes a satellite |
| `bindEngine(engine)` | Binds the engine (automatically calls `bindEngine` for all unbound satellites) |
| `getSatellites()` | Gets a read-only array of all satellites |
| `get allSensors` | Gets all Sensor components from all satellites |
| `satelliteCount` | Number of satellites |
| `destroy()` | Destroys the constellation and all satellites |

### Walker Topology

Optionally pass `WalkerTopology` to the constructor to describe the constellation configuration for advanced analysis:

```typescript
const walkerTopology: WalkerTopology = {
    planes: 8,               // 轨道面数
    satsPerPlane: 20,        // 每面卫星数
    inclination: 53,         // 轨道倾角（度）
    altitude: 550_000,       // 轨道高度（米）
    phaseFactor: 1,          // 相位因子
}

const constellation = new Daisy.PW.Constellation(walkerTopology)
// constellation.topology → WalkerTopology
```

## Coverage Analysis Engine

`Analysis.ConstellationCoverageAnalysis` is the entry point for coverage analysis.

```typescript
const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis({
    backend: Daisy.Analysis.BeamProjectorBackend.GPU, // 可选，默认 CPU
})
```

### Constructor Parameters

| Parameter | Type | Description |
|------|------|------|
| `backend` | `BeamProjectorBackend` (optional) | Footprint computation backend (`CPU` or `GPU`) |

### setConstellation()

The constellation must be assigned before analysis:

```typescript
await analysis.setConstellation(constellation)
```

### computeCoverageOverRange()

The main analysis entry point, returning `CoverageAnalysisResult`:

```typescript
const result: CoverageAnalysisResult = await analysis.computeCoverageOverRange({
    startTime: t0,                            // 起始时间（JulianDate）
    endTime: t1,                              // 结束时间（JulianDate）
    stepSeconds: 60,                          // 采样步长（秒）
    gridResolution: { latSteps: 72, lonSteps: 144 },  // 网格精度
    targetRegion: {                           // 覆盖区域
        westLon: -180, southLat: -90,
        eastLon: 180, northLat: 90,
    },
    targets: satelliteArray,                  // 指定参与分析的卫星（可选，默认全部）
    onProgress: (current, total, name) => {   // 进度回调
        console.log(`${current}/${total}: ${name}`)
    },
    useWorker: true,                          // 是否启用 Worker 并行（默认 true）
})
```

`startTime`/`endTime` can also be provided through the `start`/`end` aliases.

### Return Value (CoverageAnalysisResult)

```typescript
interface CoverageAnalysisResult {
    // 覆盖统计
    stats: {
        coveragePercent: number       // 覆盖率（%）
        totalTimeSeconds: number      // 分析总时长（秒）
        stepSeconds: number           // 步长
        maxGapSeconds: number         // 最大覆盖间隙（秒）
        revisitTimeSeconds: number    // 平均重访时间（秒）
        grid: Float32Array            // 覆盖网格原始数据
        gridWidth: number             // 网格宽度
        gridHeight: number            // 网格高度
        region: CoverageRegion        // 覆盖区域
    }

    // 逐星汇总
    satelliteCoverages: SatelliteCoverageSummary[]

    // 所有采样多边形的扁平列表
    polygons: SatelliteCoveragePolygon[]
}
```

Each `satelliteCoverages` entry contains:

| Field | Type | Description |
|------|------|------|
| `satelliteName` | `string` | Satellite name |
| `sensorCount` | `number` | Number of sensors |
| `polygonCount` | `number` | Number of footprint polygons produced by the satellite |
| `polygons` | `SatelliteCoveragePolygon[]` | Detailed footprint list for the satellite |

Each `polygons` entry contains `satelliteName` / `sensorName` / `time` / `ring: [lon, lat][]`.

## Rendering Coverage Boundaries

The coverage analysis `polygons` output can be rendered through [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature):

```typescript
const engine = await Daisy.Engine.create("container")

// 创建专用于覆盖渲染的 Entity
const coverageEntity = new Daisy.Entity("coverage-render")
coverageEntity.position = Daisy.Cartesian3.fromDegrees(0, 0, 0)
coverageEntity.bindEngine(engine)

// 添加 CoverageAreaFeature
const coverageFeature = coverageEntity.addFeature(new Daisy.CoverageAreaFeature({
    polygons: [],
    opacity: 0.78,
    minVisible: 0.01,
    resolution: 4,
    outlineWidth: 0,
    outlineColor: "rgba(255,255,255,0.34)",
    label: { show: false },
}))

// 分析完成后填充多边形
coverageFeature.setPolygons(
    result.polygons.map(p => ({
        ring: p.ring,
        color: "hsla(198, 88%, 60%, 0.28)", // 可依卫星名染色
    }))
)
```

## Complete Example (Two-Satellite Constellation)

```typescript
const engine = await Daisy.Engine.create("container")

const tleText1 = `SAT-1\n1 44714U ...`
const tleText2 = `SAT-2\n1 44715U ...`

const t0 = Daisy.JulianDate.fromDate(new Date("2026-03-20T12:00:00Z"))
const t1 = Daisy.JulianDate.addSeconds(t0, 7200, new Daisy.JulianDate())

// 创建卫星
const sat1 = new Daisy.PW.Satellite({ name: "SAT-1" })
sat1.setTle(tleText1)
sat1.bindEngine(engine)
sat1.addSensor({ type: Daisy.PW.SensorType.EllipticalCone, emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 30, yDeg: 60 }, beamLength: 800_000 })

const sat2 = new Daisy.PW.Satellite({ name: "SAT-2" })
sat2.setTle(tleText2)
sat2.bindEngine(engine)
sat2.addSensor({ type: Daisy.PW.SensorType.EllipticalCone, emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 30, yDeg: 60 }, beamLength: 800_000 })

// 星座容器
const constellation = new Daisy.PW.Constellation()
constellation.addSatellite(sat1)
constellation.addSatellite(sat2)
constellation.bindEngine(engine)

// 覆盖分析
const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis()
await analysis.setConstellation(constellation)
const result = await analysis.computeCoverageOverRange({
    startTime: t0,
    endTime: t1,
    stepSeconds: 120,
    gridResolution: { latSteps: 18, lonSteps: 36 },
    targetRegion: { westLon: -180, southLat: -90, eastLon: 180, northLat: 90 },
})

console.log(`覆盖率: ${result.stats.coveragePercent.toFixed(1)}%`)
console.log(`最大间隙: ${result.stats.maxGapSeconds.toFixed(0)}s`)
console.log(`重访时间: ${result.stats.revisitTimeSeconds.toFixed(0)}s`)
```

## Real-World Case: Qianfan Constellation (164 Satellites)

Qianfan is a large constellation case with 164 satellites. Key points:

1. **Batch creation**: iterate through the TLE array, create a `Satellite` for each, attach a `Sensor`, and call `constellation.addSatellite(sat)`.
2. **Progress callback**: report analysis progress in real time through `onProgress` (`current/total: satName`).
3. **GPU backend recommended**: `backend: Analysis.BeamProjectorBackend.GPU` significantly accelerates large constellations.
4. **Per-satellite filtering**: use `targets` to specify a subset of satellites and avoid duplicate computation.
5. **Fence rendering**: pass `result.polygons` to `CoverageAreaFeature.setPolygons()` after analysis
6. **Resource release**: call `analysis.destroy()` after analysis to release computation resources.

> **Tip**: Large constellation analyses may take a long time depending on the satellite count, time range, and step size. Validate the parameters with a smaller window and step first, then scale up to the full analysis.

---

> **Related API**: [PW.Constellation](/en/api/classes/PW.Constellation) · [PW.Satellite](/en/api/classes/PW.Satellite) · [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature)
