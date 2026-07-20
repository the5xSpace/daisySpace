# 波束投影计算

`Analysis.BeamProjector` 是覆盖分析的核心引擎，负责从卫星矩阵 + 传感器参数计算出波束在地面（或任意天体）的投影 footprint。

## 架构

```
BeamProjector（统一入口）
  ├── BeamProjectorCpuBackend（CPU 后端，同步/批量）
  └── BeamProjectorGpuBackend（GPU 后端，异步，基于 gpu-io）
```

`BeamProjector` 内部自动管理后端的初始化和降级：GPU 不可用时自动回退到 CPU，无需手动判断。

## 构造

```typescript
import * as Daisy from "daisy-space-sdk"

// 默认 CPU 后端
const bp = new Daisy.Analysis.BeamProjector()

// 显式指定 GPU 后端（不可用时自动降级 CPU）
const bp = new Daisy.Analysis.BeamProjector(Daisy.Analysis.BeamProjectorBackend.GPU)
```

`BeamProjectorBackend` 枚举值：`CPU`（`"cpu"`）和 `GPU`（`"gpu"`）。

## projectFootprint()

同步方法，返回单次波束投影的计算结果。

```typescript
bp.projectFootprint(input: BeamProjectorInput): FootprintResult
```

### 参数表（BeamProjectorInput）

| 参数 | 类型 | 说明 |
|------|------|------|
| `entityId` | `string` | 实体标识，用于缓存去重 |
| `entityMatrix` | `Matrix4` | 卫星 ECEF 世界矩阵（`sat.entity.getWorldMatrix(time)`） |
| `beamAttitude` | `{ azimuthDeg, elevationDeg, rollDeg }` | 波束姿态角（度） |
| `sensorType` | `SensorType` | 波束类型（`EllipticalCone` / `Cone` / `Pyramid` / `Cylinder`） |
| `apertureDeg` | `{ xDeg, yDeg }` | X/Y 方向开角（度） |
| `beamLength` | `number` | 波束长度（米） |
| `emitDirection` | `EmitDirection` | 发射方向（`TO_GROUND` / `TO_BOTTOM` / `TO_UP` 等） |
| `slices` | `number` | 圆周采样精度（默认 32，更高值更精确但更慢） |
| `celestialEllipsoid` | `CelestialEllipsoid` | 目标天体椭球（`PW.CelestialEllipsoid.Earth()` 等） |
| `time` | `JulianDate` | 计算时刻 |

### 返回值（FootprintResult）

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

`cartographic` 数组即为 footprint 的多边形轮廓点（按顺序排列）。

## 异步 GPU 方法

当需要精确控制后端路径时，使用专门的异步方法：

```typescript
// 异步 GPU 投影（如 GPU 不可用则降级 CPU）
const result: FootprintResult = await bp.projectFootprintGpu(input)

// 批量投影（内部自动多路并发）
const results: FootprintResult[] = await bp.projectFootprintBatchGpu(inputs)
```

## 渲染覆盖足迹

计算出的 footprint 通过 Sensor 的 `drawFootprint()` 渲染：

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

`drawFootprint()` 内部会自动调用 `BeamProjector` 在每个采样时刻计算 footprint，并通过 `ShaderPolygonFeature` 绘制多边形。

## 完整示例

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

## CPU vs GPU 后端选择

| 场景 | 推荐后端 | 原因 |
|------|----------|------|
| 单次 / 少量投影 | CPU | GPU 初始化有额外开销，少量计算时 CPU 延迟更低 |
| 大批量 / 星座覆盖 | GPU | GPU 并行计算可显著加速数千次投影 |
| 浏览器不支持 WebGL2 | CPU（自动降级） | GPU 后端依赖 `GpuDeviceManager.isSupported()` |
| 精确性敏感 | CPU（可回退比对） | GPU 端点精度受浮点纹理精度限制 |

> **提示**：构造时传 `GPU` 即可，内部会自动检测 GPU 可用性并在失败时降级为 CPU——无需手动判断。

---

> **相关 API**：[PW.Sensor](/en/api/classes/PW.Sensor)
