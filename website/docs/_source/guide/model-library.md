---
title: 内置模型库
---

# 内置模型库

DaisySpace SDK 随包提供一组内置轻量 GLB 模型，覆盖航天器、地面设施、飞行器与船舶等常见场景对象。模型位于 SDK 的 `models/` 目录，可通过 `catalog.json` 或 TypeScript API 获取路径、尺寸、锚点、动画与可动部件节点。

本页逐一列出每个模型的预览、名称、部件（控制节点）与内置动画，方便在场景中直接选用。

## 模型预览

| 卫星 | 固定地面站 | 火箭 | 地面车辆 |
|------|------------|------|----------|
| ![卫星](/images/models/daisy-satellite.png) | ![固定地面站](/images/models/daisy-fixed-ground-station.png) | ![火箭](/images/models/daisy-rocket.png) | ![地面车辆](/images/models/daisy-vehicle.png) |

| 固定翼飞机 | 移动地面站 | 货船 | 无人机 |
|------------|------------|------|----------|
| ![固定翼飞机](/images/models/daisy-aircraft.png) | ![移动地面站](/images/models/daisy-mobile-ground-station.png) | ![货船](/images/models/daisy-cargo-ship.png) | ![无人机](/images/models/daisy-uav.png) |

> 预览图为模型静态截图，用于文档展示。运行时请以 GLB 资源为准。

## 目录总览

| 名称 | 模型 ID | 路径 | 内置动画 | 尺寸（米，X×Y×Z） |
|------|---------|------|----------|-------------------|
| 卫星 | `daisy-satellite` | `models/daisy-satellite.glb` | `solar_array_fold` | 9.4 × 3.5 × 3.6 |
| 固定地面站 | `daisy-fixed-ground-station` | `models/daisy-fixed-ground-station.glb` | `antenna_scan` | 12.0 × 10.0 × 11.5 |
| 火箭 | `daisy-rocket` | `models/daisy-rocket.glb` | `launch_separation_sequence` | 8.2 × 8.2 × 55.0 |
| 地面车辆 | `daisy-vehicle` | `models/daisy-vehicle.glb` | `wheel_rotation` | 2.0 × 4.8 × 1.8 |
| 固定翼飞机 | `daisy-aircraft` | `models/daisy-aircraft.glb` | `control_surface_check` | 17.0 × 19.0 × 4.8 |
| 移动地面站 | `daisy-mobile-ground-station` | `models/daisy-mobile-ground-station.glb` | `mobile_station_scan` | 2.6 × 7.4 × 6.0 |
| 货船 | `daisy-cargo-ship` | `models/daisy-cargo-ship.glb` | `ship_systems_check` | 20.0 × 120.0 × 26.0 |
| 无人机 | `daisy-uav` | `models/daisy-uav.glb` | `rotor_spin` | 2.9 × 2.9 × 0.7 |

## 加载方式

推荐通过 `DaisyModelLibrary` 或 `resolveDaisyModelAsset()` 获取模型信息，再交给 [ModelFeature](/api/classes/ModelFeature) 加载。

```typescript
import * as Daisy from "daisy-space-sdk"

const asset = Daisy.resolveDaisyModelAsset("satellite")
// asset.modelUrl → 当前 SDK baseUrl 下的 models/daisy-satellite.glb

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("sat")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

const model = entity.addFeature(new Daisy.ModelFeature({
    url: asset.modelUrl,
    minimumPixelSize: 40,
}))

model.onload(() => {
    // 按控制节点名称变换可动部件
    model.transformNode("solar_array_left_shoulder")
        .setRotationAxisAngleDeg(Daisy.Cartesian3.UNIT_Y, 30)

    // 播放模型内置动画
    model.playAnimation({
        name: asset.animation,
        loop: Daisy.ModelAnimationLoop.REPEAT,
        multiplier: 1.0,
        startTime: engine.getCurrentTime(),
    })
})
```

也可以直接读取目录清单：

```typescript
const catalogUrl = Daisy.BuildModuleUrl.getUrl("models/catalog.json")
const catalog = await fetch(catalogUrl).then((response) => response.json())
```

### 目录 API

| 字段 / 接口 | 说明 |
|-------------|------|
| `Daisy.DaisyModelLibrary` | 内置模型目录常量，按 `kind` 索引 |
| `Daisy.resolveDaisyModelAsset(kind)` | 返回完整资产信息，并解析 `modelUrl` / `fallbackImageUrl` |
| `Daisy.resolveDaisyBuiltinModelOptions(options, kind)` | 按对象构造配置解析应使用的模型（含内置开关） |
| `Daisy.withDaisyBuiltinModel(options, kind)` | 在配置对象上注入默认模型（物理对象构造期使用） |
| `Daisy.DAISY_BUILTIN_MODEL_VISUAL_DEFAULTS` | 各模型默认 `minimumPixelSize` / `maximumScale` |
| `id` | 模型唯一 ID，如 `daisy-satellite` |
| `kind` | 类型键，如 `satellite`、`rocket`、`uav` |
| `modelPath` / `model` | GLB 相对路径 |
| `fallbackImagePath` | 透明 PNG 回退图路径 |
| `dimensionsMeters` | 模型包围盒尺寸（米） |
| `anchor` | 摆放锚点语义 |
| `animation` | 内置动画名称 |
| `controlNodes` | 可动部件（控制节点）名称列表 |

## 物理对象默认内置模型

`PW` 命名空间下的主要物理对象在**构造时**会默认挂载对应的内置模型，无需再手动拼 `model` URL。

| 物理对象 | 默认内置模型 `kind` | 模型 ID |
|----------|---------------------|---------|
| `PW.Vehicle` | `vehicle` | `daisy-vehicle` |
| `PW.Aircraft` | `aircraft` | `daisy-aircraft` |
| `PW.Rocket` | `rocket` | `daisy-rocket` |
| `PW.Vessel` | `cargoShip` | `daisy-cargo-ship` |
| `PW.NearEarthOrbiter` / `PW.Satellite` | `satellite` | `daisy-satellite` |
| `PW.GroundStation` / `PW.Site` | `fixedGroundStation` | `daisy-fixed-ground-station` |
| `PW.FreeObject` | 无 | 通用对象，不自动挂模型 |

`mobileGroundStation` 与 `uav` 已收录在模型库中，但当前没有独立的 PW 类；可在 `Aircraft` / `GroundStation` 上通过 `model` 引用。

### 开关与覆盖规则

构造配置支持 `useBuiltinModel` 与 `model`，优先级为：**显式 `model` > `useBuiltinModel` > 内置默认**。

| 配置 | 结果 |
|------|------|
| 不传 `model`（默认） | 自动挂载上表对应的内置模型 |
| `useBuiltinModel: false` | 不挂载内置模型 |
| `model: { url, ... }` | 使用自定义模型 |
| `model: false` | 不挂载模型 |

```typescript
import * as Daisy from "daisy-space-sdk"

// 默认：构造时自动挂载内置模型
const sat = new Daisy.PW.Satellite({ name: "STARLINK-1" })
const vehicle = new Daisy.PW.Vehicle({ name: "Truck-1" })
const rocket = new Daisy.PW.Rocket({ name: "Daisy-Rocket" })
const site = new Daisy.PW.GroundStation({ name: "GS-1" })

// 关闭内置模型
const bare = new Daisy.PW.Satellite({ name: "STARLINK-2", useBuiltinModel: false })
const bareVehicle = new Daisy.PW.Vehicle({ name: "Truck-Bare", useBuiltinModel: false })

// 自定义模型（优先于内置默认）
const custom = new Daisy.PW.Aircraft({
    name: "UAV-X",
    model: {
        url: Daisy.resolveDaisyModelAsset("uav").modelUrl,
        minimumPixelSize: 28,
    },
})
```

- `useBuiltinModel` **仅在构造期生效**。运行期移除模型请使用 `setOptions({ model: false })`。
- 显式传入的 `model` 始终优先，不会被内置默认覆盖。
- 自定义 `url` 可配合 `Daisy.resolveDaisyModelAsset()` 或 `Daisy.DaisyModelLibrary` 获取内置模型路径。

## 模型明细

以下预览来自 SDK `models/fallback/` 目录。每个模型给出英文名称、类型键、尺寸、锚点、内置动画，以及全部控制节点。

### 卫星 Satellite

![卫星](/images/models/daisy-satellite.png)

| 字段 | 值 |
|------|----|
| 名称 | 卫星 / Satellite |
| 模型 ID | `daisy-satellite` |
| 类型键 `kind` | `satellite` |
| GLB 路径 | `models/daisy-satellite.glb` |
| 回退图 | `models/fallback/daisy-satellite.png` |
| 尺寸（米） | 9.4 × 3.5 × 3.6 |
| 锚点 `anchor` | `center` |
| 内置动画 | `solar_array_fold`（太阳翼收拢） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `solar_array_left_shoulder` | 左太阳翼肩部转轴 |
| `solar_array_left_hinge` | 左太阳翼铰链 |
| `solar_array_right_shoulder` | 右太阳翼肩部转轴 |
| `solar_array_right_hinge` | 右太阳翼铰链 |
| `radar_azimuth` | 载荷雷达方位轴 |
| `radar_elevation` | 载荷雷达俯仰轴 |

### 固定地面站 Fixed ground station

![固定地面站](/images/models/daisy-fixed-ground-station.png)

| 字段 | 值 |
|------|----|
| 名称 | 固定地面站 / Fixed ground station |
| 模型 ID | `daisy-fixed-ground-station` |
| 类型键 `kind` | `fixedGroundStation` |
| GLB 路径 | `models/daisy-fixed-ground-station.glb` |
| 回退图 | `models/fallback/daisy-fixed-ground-station.png` |
| 尺寸（米） | 12.0 × 10.0 × 11.5 |
| 锚点 `anchor` | `ground-center` |
| 内置动画 | `antenna_scan`（天线扫描） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `azimuth` | 天线方位轴 |
| `elevation` | 天线俯仰轴 |

### 火箭 Rocket

![火箭](/images/models/daisy-rocket.png)

| 字段 | 值 |
|------|----|
| 名称 | 火箭 / Rocket |
| 模型 ID | `daisy-rocket` |
| 类型键 `kind` | `rocket` |
| GLB 路径 | `models/daisy-rocket.glb` |
| 回退图 | `models/fallback/daisy-rocket.png` |
| 尺寸（米） | 8.2 × 8.2 × 55.0 |
| 锚点 `anchor` | `engine-base` |
| 内置动画 | `launch_separation_sequence`（发射分离序列） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `core_stage_1` | 芯一级 |
| `core_stage_2` | 芯二级 |
| `booster_1` | 助推器 1 |
| `booster_2` | 助推器 2 |
| `booster_3` | 助推器 3 |
| `booster_4` | 助推器 4 |
| `fairing_left` | 整流罩左半 |
| `fairing_right` | 整流罩右半 |
| `payload_mount` | 载荷支架 |
| `payload_satellite` | 载荷卫星 |

### 地面车辆 Vehicle

![地面车辆](/images/models/daisy-vehicle.png)

| 字段 | 值 |
|------|----|
| 名称 | 地面车辆 / Vehicle |
| 模型 ID | `daisy-vehicle` |
| 类型键 `kind` | `vehicle` |
| GLB 路径 | `models/daisy-vehicle.glb` |
| 回退图 | `models/fallback/daisy-vehicle.png` |
| 尺寸（米） | 2.0 × 4.8 × 1.8 |
| 锚点 `anchor` | `ground-center` |
| 内置动画 | `wheel_rotation`（车轮旋转） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `wheel_left_rear` | 左后轮 |
| `wheel_left_front` | 左前轮 |
| `wheel_right_rear` | 右后轮 |
| `wheel_right_front` | 右前轮 |

### 固定翼飞机 Aircraft

![固定翼飞机](/images/models/daisy-aircraft.png)

| 字段 | 值 |
|------|----|
| 名称 | 固定翼飞机 / Aircraft |
| 模型 ID | `daisy-aircraft` |
| 类型键 `kind` | `aircraft` |
| GLB 路径 | `models/daisy-aircraft.glb` |
| 回退图 | `models/fallback/daisy-aircraft.png` |
| 尺寸（米） | 17.0 × 19.0 × 4.8 |
| 锚点 `anchor` | `center-of-gravity` |
| 内置动画 | `control_surface_check`（操纵面检查） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `aileron_left` | 左副翼 |
| `aileron_right` | 右副翼 |
| `elevator_left` | 左升降舵 |
| `elevator_right` | 右升降舵 |
| `rudder` | 方向舵 |

### 移动地面站 Mobile ground station

![移动地面站](/images/models/daisy-mobile-ground-station.png)

| 字段 | 值 |
|------|----|
| 名称 | 移动地面站 / Mobile ground station |
| 模型 ID | `daisy-mobile-ground-station` |
| 类型键 `kind` | `mobileGroundStation` |
| GLB 路径 | `models/daisy-mobile-ground-station.glb` |
| 回退图 | `models/fallback/daisy-mobile-ground-station.png` |
| 尺寸（米） | 2.6 × 7.4 × 6.0 |
| 锚点 `anchor` | `ground-center` |
| 内置动画 | `mobile_station_scan`（移动站扫描） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `mast` | 天线桅杆 |
| `azimuth` | 天线方位轴 |
| `elevation` | 天线俯仰轴 |
| `wheel_left_rear` | 左后轮 |
| `wheel_left_front` | 左前轮 |
| `wheel_right_rear` | 右后轮 |
| `wheel_right_front` | 右前轮 |

### 货船 Cargo ship

![货船](/images/models/daisy-cargo-ship.png)

| 字段 | 值 |
|------|----|
| 名称 | 货船 / Cargo ship |
| 模型 ID | `daisy-cargo-ship` |
| 类型键 `kind` | `cargoShip` |
| GLB 路径 | `models/daisy-cargo-ship.glb` |
| 回退图 | `models/fallback/daisy-cargo-ship.png` |
| 尺寸（米） | 20.0 × 120.0 × 26.0 |
| 锚点 `anchor` | `waterline-center` |
| 内置动画 | `ship_systems_check`（船舶系统检查） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `radar` | 船载雷达 |
| `rudder` | 舵 |

### 无人机 UAV

![无人机](/images/models/daisy-uav.png)

| 字段 | 值 |
|------|----|
| 名称 | 无人机 / UAV |
| 模型 ID | `daisy-uav` |
| 类型键 `kind` | `uav` |
| GLB 路径 | `models/daisy-uav.glb` |
| 回退图 | `models/fallback/daisy-uav.png` |
| 尺寸（米） | 2.9 × 2.9 × 0.7 |
| 锚点 `anchor` | `center-of-gravity` |
| 内置动画 | `rotor_spin`（旋翼旋转） |

**部件（控制节点）**

| 节点名 | 说明 |
|--------|------|
| `rotor_front_left` | 前左旋翼 |
| `rotor_front_right` | 前右旋翼 |
| `rotor_rear_left` | 后左旋翼 |
| `rotor_rear_right` | 后右旋翼 |
| `gimbal` | 相机云台 |

## 运行时约定

- glTF 坐标系导出后为 `+Y` 向上。
- 1 个 glTF 单位等于 1 米。
- 静态几何按语义模块合并，可动模块通过控制节点驱动。
- 每个 GLB 使用 `KHR_draco_mesh_compression`，体积控制在 128 KiB 以内。
- `models/fallback/` 为每个 GLB 提供配套的透明 PNG。
- `models/catalog.json` 是语言无关的清单文件；TypeScript 侧使用 `DaisyModelLibrary` 或 `resolveDaisyModelAsset()`。

## 节点与动画控制

加载完成后，可用 `model.getNodeNames()` 核对实际节点名称，并用 `transformNode(name)` 驱动部件：

```typescript
model.onload(() => {
    const names = model.getNodeNames()
    // 包含 catalog.controlNodes 中列出的可动节点

    model.transformNode("azimuth")
        .setRotationAxisAngleDeg(Daisy.Cartesian3.UNIT_Z, 45)

    model.transformNode("elevation")
        .setRotationAxisAngleDeg(Daisy.Cartesian3.UNIT_Y, 20)
})
```

播放内置动画时，将 `name` 设为目录中的 `animation` 字段值。详细参数见 [3D 模型与 Tileset](/guide/model-tileset)。

## 相关文档

- [3D 模型与 Tileset](/guide/model-tileset)
- [内置静态资源](/guide/builtin-assets)
- [地面站](/guide/ground-station)
- [卫星与轨道力学](/guide/satellite)
- [ModelFeature](/api/classes/ModelFeature)
- `DaisyModelLibrary` / `resolveDaisyModelAsset()` / `withDaisyBuiltinModel()`
- [BuildModuleUrl](/api/classes/BuildModuleUrl)
