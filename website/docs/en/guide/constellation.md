# Constellation

Constellation is a container for satellite collections, providing bulk management, unified binding, and analysis integration.

## Architecture

```
Constellation
  ├── Satellite[0]  ── Entity ── Sensor/Path/Label ...
  ├── Satellite[1]
  ├── ...
  └── Satellite[N]  ── Entity ── Sensor/Path/Label ...
```

## Create and Add Satellites

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

`bindEngine()` iterates over all added satellites and calls `sat.bindEngine(engine)` for each satellite that has not yet been bound to an Engine.

## Member Management

| Method | Description |
|------|-------------|
| `addSatellite(sat)` | Add a satellite; automatically bind it if bindEngine has already been called |
| `removeSatellite(sat)` | Remove a satellite |
| `getSatelliteByName(name)` | Find a satellite by name |
| `getSatellites()` | Return a read-only satellite array |
| `satelliteCount` | Number of members |
| `forEach(fn)` | Iterate over each satellite |
| `map(fn)` | Map to an array |
| `filter(fn)` | Filter and return a subset |

## Aggregated Properties

| Property | Type | Description |
|------|------|-------------|
| `allSensors` | `Sensor[]` | Sensor list for all member satellites |
| `allPositions` | `TrajectorySample[]` | TrajectorySample positions of all member satellites |
| `allTles` | `Spg4Tle[]` | TLE data for all member satellites |

```typescript
console.log(`总卫星数: ${con.satelliteCount}`)
console.log(`总传感器数: ${con.allSensors.length}`)
```

## Walker Topology

The constructor accepts an optional `WalkerTopology` parameter to describe the Walker constellation topology; member satellites are still created by application code and added through `addSatellite()`:

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

The `topology` property can be read at any time to inspect the registered topology configuration.

## Integration with Coverage Analysis

`Constellation` can be used with `ConstellationCoverageAnalysis` to analyze multi-satellite coverage performance:

```typescript
const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis({
    constellation: con,
    // ... 覆盖区域与分析参数
})
// 详见「星座覆盖分析」文档
```

## Cleanup

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

| Parameter | Type | Description |
|------|------|-------------|
| `topology` | `WalkerTopology` | Optional Walker constellation topology |

---

> **Related API**: [PW.Constellation](/en/api/classes/PW.Constellation) · [PW.Satellite](/en/api/classes/PW.Satellite)
