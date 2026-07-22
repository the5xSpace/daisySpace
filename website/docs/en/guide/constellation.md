# Constellation

Constellation is a container for a collection of satellites, providing batch management, unified binding, and analysis integration capabilities.

## Architecture

```
Constellation
  ├── Satellite[0]  ── Entity ── Sensor/Path/Label ...
  ├── Satellite[1]
  ├── ...
  └── Satellite[N]  ── Entity ── Sensor/Path/Label ...
```

## Creating and Adding Satellites

```typescript
import * as Daisy from "daisy-space-sdk"

const con = new Daisy.PW.Constellation()

for (const data of tleList) {
    const sat = new Daisy.PW.Satellite({
        name: data.name,
        tle: data.tle,
        enableSpg4Propagation: false,
        trajectory: { stepSeconds: 30 },
        point: { size: 800, color: Daisy.Color.CYAN },
        label: { text: data.name },
        path: {
            show: true,
            width: 1.5,
            color: Daisy.Color.CYAN.withAlpha(0.45),
            historySecond: 30 * 60,
            futureSecond: 30 * 60,
        },
    })
    con.addSatellite(sat)
}

// 一键绑定所有成员卫星
con.bindEngine(engine)
```

`bindEngine()` iterates over all added satellites, calling `sat.bindEngine(engine)` one by one for satellites that have not yet been bound to an Engine.

## Member Management

| 方法 | 说明 |
|------|------|
| `addSatellite(sat)` | 添加卫星（若已 bindEngine 则自动绑定） |
| `removeSatellite(sat)` | 移除卫星 |
| `getSatelliteByName(name)` | 按名称查找卫星 |
| `getSatellites()` | 获取只读卫星数组 |
| `satelliteCount` | 成员数量 |
| `forEach(fn)` | 遍历每一颗卫星 |
| `map(fn)` | 映射为数组 |
| `filter(fn)` | 过滤返回子集 |

## Aggregate Properties

| 属性 | 类型 | 说明 |
|------|------|------|
| `allSensors` | `Sensor[]` | 所有成员卫星的传感器列表 |
| `allPositions` | `TrajectorySample[]` | 所有成员卫星的 TrajectorySample 位置 |
| `allTles` | `Spg4Tle[]` | 所有成员卫星的 TLE 数据 |

```typescript
console.log(`总卫星数: ${con.satelliteCount}`)
console.log(`总传感器数: ${con.allSensors.length}`)
```

## Walker Topology

The constructor accepts an optional `WalkerTopology` parameter for recording Walker constellation topology; member satellites are still created by the business side and added via `addSatellite()`:

```typescript
const topology = {
    planes: 6,
    satsPerPlane: 66,
    inclination: 53,
    phaseFactor: 1,
    altitude: 550_000,
}

const con = new Daisy.PW.Constellation(topology)
// ... 后续业务侧根据拓扑参数逐颗创建并 addSatellite
```

The `topology` property can be read at any time to retrieve the registered topology configuration.

## Integration with Coverage Analysis

`Constellation` can be used with `ConstellationCoverageAnalysis` to analyze multi-satellite coverage performance:

```typescript
const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis({
    constellation: con,
    // ... 覆盖区域与分析参数
})
// 详见「星座覆盖分析」文档
```

## Resource Cleanup

```typescript
con.destroy()
// 依次销毁所有卫星并清空内部引用
```

## Full Example

```typescript
const engine = await Daisy.Engine.create("container")

const tles = [
    { name: "SAT-A", tle: `SAT-A\n1 44714U ...` },
    { name: "SAT-B", tle: `SAT-B\n1 44715U ...` },
    { name: "SAT-C", tle: `SAT-C\n1 60379U ...` },
]

const con = new Daisy.PW.Constellation()

for (const { name, tle } of tles) {
    const sat = new Daisy.PW.Satellite({
        name, tle,
        enableSpg4Propagation: false,
        trajectory: { stepSeconds: 30 },
        point: { size: 800, color: Daisy.Color.CYAN },
        label: { text: name },
        path: { show: true, width: 1.5, color: Daisy.Color.CYAN.withAlpha(0.45) },
    })
    con.addSatellite(sat)
}

con.bindEngine(engine)
console.log(`星座已就绪: ${con.satelliteCount} 颗卫星`)
```

## Constructor Parameters

| 参数 | 类型 | 说明 |
|------|------|------|
| `topology` | `WalkerTopology` | Walker 星座拓扑参数（可选） |

---

> **Related APIs**: [PW.Constellation](/api/classes/PW.Constellation) · [PW.Satellite](/api/classes/PW.Satellite)
