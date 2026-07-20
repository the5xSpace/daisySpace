# Constellation Coverage Analysis

Constellation coverage analysis evaluates a set of satellites' coverage capability over the Earth's (or any celestial body's) surface within a specified time period — coverage percentage, maximum gap, revisit time, and other metrics.

## Concept Model

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

[Constellation](/en/api/classes/PW.Constellation) is an aggregate container for satellites, providing batch operation interfaces.

```typescript
import * as Daisy from "daisy-space-sdk"

const constellation = new Daisy.PW.Constellation()
```

### Core Methods

| Method | Description |
|--------|-------------|
| `addSatellite(sat)` | Add a satellite |
| `removeSatellite(sat)` | Remove a satellite |
| `bindEngine(engine)` | Bind the engine (auto-calls `bindEngine` for all unbound satellites) |
| `getSatellites()` | Get a read-only array of all satellites |
| `get allSensors` | Get all Sensor components from all satellites |
| `satelliteCount` | Number of satellites |
| `destroy()` | Destroy the constellation and all its satellites |

### Walker Topology

An optional `WalkerTopology` can be passed during construction to describe the constellation configuration (for advanced analysis):

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
|-----------|------|-------------|
| `backend` | `BeamProjectorBackend` (optional) | Footprint computation backend (`CPU` or `GPU`) |

### setConstellation()

The constellation must be bound before analysis:

```typescript
await analysis.setConstellation(constellation)
```

### computeCoverageOverRange()

Core analysis entry point, returns `CoverageAnalysisResult`:

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

`startTime`/`endTime` can also use `start`/`end` aliases.

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

Each `satelliteCoverages` item contains:

| Field | Type | Description |
|-------|------|-------------|
| `satelliteName` | `string` | Satellite name |
| `sensorCount` | `number` | Number of sensors |
| `polygonCount` | `number` | Number of footprint polygons from this satellite |
| `polygons` | `SatelliteCoveragePolygon[]` | List of footprint details for this satellite |

Each `polygons` item contains: `satelliteName` / `sensorName` / `time` / `ring: [lon, lat][]`.

## Rendering Coverage Fence

The `polygons` output from coverage analysis can be rendered via [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature):

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

## Qianfan Constellation (164 Satellites) Real-World Case

The Qianfan constellation is a large-scale 164-satellite constellation case study. Key points:

1. **Batch creation**: Iterate through the TLE array, creating a `Satellite` + mounting `Sensor` + calling `constellation.addSatellite(sat)` for each
2. **Progress callback**: Use `onProgress` for real-time analysis progress feedback (`current/total: satName`)
3. **GPU backend recommended**: `backend: Analysis.BeamProjectorBackend.GPU` significantly accelerates large-scale constellations
4. **Per-satellite filtering**: The `targets` parameter can specify a subset of satellites for analysis, avoiding redundant computation
5. **Fence rendering**: After analysis, pass `result.polygons` to `CoverageAreaFeature.setPolygons()` for rendering
6. **Resource cleanup**: Call `analysis.destroy()` to release computational resources after analysis

> **Tip**: Large-scale constellation analysis may take a long time (depending on satellite count × time period × step size). It is recommended to first verify parameters with a smaller window and step size, then scale up to the full analysis.

---

> **Related API**: [PW.Constellation](/en/api/classes/PW.Constellation) · [PW.Satellite](/en/api/classes/PW.Satellite) · [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature)
