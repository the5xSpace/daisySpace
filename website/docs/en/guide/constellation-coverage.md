# 星座覆盖分析

星座覆盖分析用于评估一组卫星在指定时间段内对地球（或任意天体）表面的覆盖能力——覆盖率、最大间隙、重访时间等指标。

## 概念模型

```
Constellation（星座容器）
  ├── Satellite × N
  │     └── Sensor（波束 → BeamProjector 计算 footprint）
  └── ConstellationCoverageAnalysis（分析引擎）
        ├── 按时间步长遍历 → 每个时刻计算所有卫星的 footprint
        ├── 网格化覆盖统计 → 覆盖百分比 / 间隙 / 重访
        └── 输出 CoverageAnalysisResult（stats + polygons + summaries）
```

## 星座容器（PW.Constellation）

[Constellation](/en/api/classes/PW.Constellation) 是卫星的聚合容器，提供批量操作接口。

```typescript
import * as Daisy from "daisy-space-sdk"

const constellation = new Daisy.PW.Constellation()
```

### 核心方法

| 方法 | 说明 |
|------|------|
| `addSatellite(sat)` | 添加一颗卫星 |
| `removeSatellite(sat)` | 移除一颗卫星 |
| `bindEngine(engine)` | 绑定引擎（自动为所有未绑卫星调用 `bindEngine`） |
| `getSatellites()` | 获取所有卫星的只读数组 |
| `get allSensors` | 获取所有卫星的全部 Sensor 组件 |
| `satelliteCount` | 卫星数量 |
| `destroy()` | 销毁星座及所有卫星 |

### Walker 拓扑

构造时可选传入 `WalkerTopology` 描述星座构型（用于后续高级分析）：

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

## 覆盖分析引擎

`Analysis.ConstellationCoverageAnalysis` 是覆盖分析入口。

```typescript
const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis({
    backend: Daisy.Analysis.BeamProjectorBackend.GPU, // 可选，默认 CPU
})
```

### 构造参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `backend` | `BeamProjectorBackend`（可选） | footprint 计算后端（`CPU` 或 `GPU`） |

### setConstellation()

分析前必须先绑定星座：

```typescript
await analysis.setConstellation(constellation)
```

### computeCoverageOverRange()

核心分析入口，返回 `CoverageAnalysisResult`：

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

`startTime`/`endTime` 也可用 `start`/`end` 别名。

### 返回值（CoverageAnalysisResult）

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

`satelliteCoverages` 每项包含：

| 字段 | 类型 | 说明 |
|------|------|------|
| `satelliteName` | `string` | 卫星名称 |
| `sensorCount` | `number` | 传感器数量 |
| `polygonCount` | `number` | 该星产生的 footprint 多边形数 |
| `polygons` | `SatelliteCoveragePolygon[]` | 该星的 footprint 详情列表 |

`polygons` 每项包含：`satelliteName` / `sensorName` / `time` / `ring: [lon, lat][]`。

## 渲染覆盖围栏

覆盖分析的 `polygons` 输出可通过 [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature) 渲染：

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

## 完整示例（双星星座）

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

## 千帆星座（164 星）真实案例

千帆星座是一个 164 颗卫星的大规模星座案例。关键要点：

1. **批量创建**：遍历 TLE 数组为每颗卫星创建 `Satellite` + 挂载 `Sensor` + 调用 `constellation.addSatellite(sat)`
2. **进度回调**：通过 `onProgress` 实时反馈分析进度（`current/total: satName`）
3. **GPU 后端推荐**：`backend: Analysis.BeamProjectorBackend.GPU` 对大规模星座显著加速
4. **按星筛选**：`targets` 参数可指定参与分析的卫星子集，避免重复计算
5. **围栏渲染**：分析完成后将 `result.polygons` 传入 `CoverageAreaFeature.setPolygons()` 渲染
6. **资源释放**：分析完成后调用 `analysis.destroy()` 释放计算资源

> **提示**：大规模星座分析可能耗时较长（取决于卫星数 × 时间段 × 步长）。建议先用较小的窗口和步长验证参数，再放大到完整分析。

---

> **相关 API**：[PW.Constellation](/en/api/classes/PW.Constellation) · [PW.Satellite](/en/api/classes/PW.Satellite) · [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature)
