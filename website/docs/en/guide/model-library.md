---
title: Built-in Model Library
---

# Built-in Model Library

The DaisySpace SDK ships a built-in lightweight GLB model set covering common scene objects such as spacecraft, ground facilities, aircraft, and vessels. The assets live in the SDK `models/` directory. You can obtain paths, dimensions, anchors, animations, and movable part nodes from `catalog.json` or the TypeScript API.

This page lists each model with a preview, name, parts (control nodes), and built-in animation so you can pick the right asset for a scene.

## Model Previews

| Satellite | Fixed ground station | Rocket | Vehicle |
|-----------|----------------------|--------|---------|
| ![Satellite](/images/models/daisy-satellite.png) | ![Fixed ground station](/images/models/daisy-fixed-ground-station.png) | ![Rocket](/images/models/daisy-rocket.png) | ![Vehicle](/images/models/daisy-vehicle.png) |

| Aircraft | Mobile ground station | Cargo ship | UAV |
|----------|----------------------|------------|-----|
| ![Aircraft](/images/models/daisy-aircraft.png) | ![Mobile ground station](/images/models/daisy-mobile-ground-station.png) | ![Cargo ship](/images/models/daisy-cargo-ship.png) | ![UAV](/images/models/daisy-uav.png) |

> Preview images are static screenshots for documentation. Use the GLB assets at runtime.

## Catalog Overview

| Name | Model ID | Path | Built-in animation | Size (m, X×Y×Z) |
|------|----------|------|--------------------|-----------------|
| Satellite | `daisy-satellite` | `models/daisy-satellite.glb` | `solar_array_fold` | 9.4 × 3.5 × 3.6 |
| Fixed ground station | `daisy-fixed-ground-station` | `models/daisy-fixed-ground-station.glb` | `antenna_scan` | 12.0 × 10.0 × 11.5 |
| Rocket | `daisy-rocket` | `models/daisy-rocket.glb` | `launch_separation_sequence` | 8.2 × 8.2 × 55.0 |
| Vehicle | `daisy-vehicle` | `models/daisy-vehicle.glb` | `wheel_rotation` | 2.0 × 4.8 × 1.8 |
| Aircraft | `daisy-aircraft` | `models/daisy-aircraft.glb` | `control_surface_check` | 17.0 × 19.0 × 4.8 |
| Mobile ground station | `daisy-mobile-ground-station` | `models/daisy-mobile-ground-station.glb` | `mobile_station_scan` | 2.6 × 7.4 × 6.0 |
| Cargo ship | `daisy-cargo-ship` | `models/daisy-cargo-ship.glb` | `ship_systems_check` | 20.0 × 120.0 × 26.0 |
| UAV | `daisy-uav` | `models/daisy-uav.glb` | `rotor_spin` | 2.9 × 2.9 × 0.7 |

## Loading Models

Prefer `DaisyModelLibrary` or `resolveDaisyModelAsset()` to obtain model metadata, then load the result with [ModelFeature](/en/api/classes/ModelFeature).

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

You can also read the catalog manifest directly:

```typescript
const catalogUrl = Daisy.BuildModuleUrl.getUrl("models/catalog.json")
const catalog = await fetch(catalogUrl).then((response) => response.json())
```

### Catalog API

| Field / API | Description |
|-------------|-------------|
| `Daisy.DaisyModelLibrary` | Built-in model catalog constant, indexed by `kind` |
| `Daisy.resolveDaisyModelAsset(kind)` | Returns the full asset record and resolves `modelUrl` / `fallbackImageUrl` |
| `Daisy.resolveDaisyBuiltinModelOptions(options, kind)` | Resolves which model an object constructor config should use, including the builtin toggle |
| `Daisy.withDaisyBuiltinModel(options, kind)` | Injects the default model into a config object during physical-object construction |
| `Daisy.DAISY_BUILTIN_MODEL_VISUAL_DEFAULTS` | Default `minimumPixelSize` / `maximumScale` for each model kind |
| `id` | Unique model ID, for example `daisy-satellite` |
| `kind` | Type key such as `satellite`, `rocket`, or `uav` |
| `modelPath` / `model` | Relative GLB path |
| `fallbackImagePath` | Transparent PNG fallback path |
| `dimensionsMeters` | Bounding-box size in meters |
| `anchor` | Placement anchor semantic |
| `animation` | Built-in animation name |
| `controlNodes` | Movable part (control-node) names |

## Default Builtin Models on Physical Objects

Major physical objects under the `PW` namespace mount their corresponding builtin model **during construction**, so you no longer need to assemble a `model` URL by hand.

| Physical object | Default builtin `kind` | Model ID |
|-----------------|------------------------|----------|
| `PW.Vehicle` | `vehicle` | `daisy-vehicle` |
| `PW.Aircraft` | `aircraft` | `daisy-aircraft` |
| `PW.Rocket` | `rocket` | `daisy-rocket` |
| `PW.Vessel` | `cargoShip` | `daisy-cargo-ship` |
| `PW.NearEarthOrbiter` / `PW.Satellite` | `satellite` | `daisy-satellite` |
| `PW.GroundStation` / `PW.Site` | `fixedGroundStation` | `daisy-fixed-ground-station` |
| `PW.FreeObject` | none | Generic object; no model is mounted automatically |

`mobileGroundStation` and `uav` are already in the model library, but there is no dedicated PW class yet. Reference them from `Aircraft` / `GroundStation` through `model`.

### Toggle and Override Rules

Constructor configuration supports `useBuiltinModel` and `model`. Priority is: **explicit `model` > `useBuiltinModel` > builtin default**.

| Configuration | Result |
|---------------|--------|
| No `model` (default) | Automatically mounts the matching builtin model from the table above |
| `useBuiltinModel: false` | Does not mount a builtin model |
| `model: { url, ... }` | Uses the custom model |
| `model: false` | Does not mount a model |

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

- `useBuiltinModel` **takes effect only at construction time**. To remove a model at runtime, use `setOptions({ model: false })`.
- An explicit `model` always wins and is never overwritten by the builtin default.
- For custom `url` values, resolve builtin asset paths with `Daisy.resolveDaisyModelAsset()` or `Daisy.DaisyModelLibrary`.

## Model Details

The previews below come from the SDK `models/fallback/` directory. Each model lists its English name, type key, size, anchor, built-in animation, and every control node.

### Satellite

![Satellite](/images/models/daisy-satellite.png)

| Field | Value |
|-------|-------|
| Name | Satellite |
| Model ID | `daisy-satellite` |
| `kind` | `satellite` |
| GLB path | `models/daisy-satellite.glb` |
| Fallback image | `models/fallback/daisy-satellite.png` |
| Size (m) | 9.4 × 3.5 × 3.6 |
| `anchor` | `center` |
| Built-in animation | `solar_array_fold` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `solar_array_left_shoulder` | Left solar-array shoulder joint |
| `solar_array_left_hinge` | Left solar-array hinge |
| `solar_array_right_shoulder` | Right solar-array shoulder joint |
| `solar_array_right_hinge` | Right solar-array hinge |
| `radar_azimuth` | Payload radar azimuth axis |
| `radar_elevation` | Payload radar elevation axis |

### Fixed ground station

![Fixed ground station](/images/models/daisy-fixed-ground-station.png)

| Field | Value |
|-------|-------|
| Name | Fixed ground station |
| Model ID | `daisy-fixed-ground-station` |
| `kind` | `fixedGroundStation` |
| GLB path | `models/daisy-fixed-ground-station.glb` |
| Fallback image | `models/fallback/daisy-fixed-ground-station.png` |
| Size (m) | 12.0 × 10.0 × 11.5 |
| `anchor` | `ground-center` |
| Built-in animation | `antenna_scan` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `azimuth` | Antenna azimuth axis |
| `elevation` | Antenna elevation axis |

### Rocket

![Rocket](/images/models/daisy-rocket.png)

| Field | Value |
|-------|-------|
| Name | Rocket |
| Model ID | `daisy-rocket` |
| `kind` | `rocket` |
| GLB path | `models/daisy-rocket.glb` |
| Fallback image | `models/fallback/daisy-rocket.png` |
| Size (m) | 8.2 × 8.2 × 55.0 |
| `anchor` | `engine-base` |
| Built-in animation | `launch_separation_sequence` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `core_stage_1` | Core stage 1 |
| `core_stage_2` | Core stage 2 |
| `booster_1` | Booster 1 |
| `booster_2` | Booster 2 |
| `booster_3` | Booster 3 |
| `booster_4` | Booster 4 |
| `fairing_left` | Fairing left half |
| `fairing_right` | Fairing right half |
| `payload_mount` | Payload mount |
| `payload_satellite` | Payload satellite |

### Vehicle

![Vehicle](/images/models/daisy-vehicle.png)

| Field | Value |
|-------|-------|
| Name | Vehicle |
| Model ID | `daisy-vehicle` |
| `kind` | `vehicle` |
| GLB path | `models/daisy-vehicle.glb` |
| Fallback image | `models/fallback/daisy-vehicle.png` |
| Size (m) | 2.0 × 4.8 × 1.8 |
| `anchor` | `ground-center` |
| Built-in animation | `wheel_rotation` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `wheel_left_rear` | Left rear wheel |
| `wheel_left_front` | Left front wheel |
| `wheel_right_rear` | Right rear wheel |
| `wheel_right_front` | Right front wheel |

### Aircraft

![Aircraft](/images/models/daisy-aircraft.png)

| Field | Value |
|-------|-------|
| Name | Aircraft |
| Model ID | `daisy-aircraft` |
| `kind` | `aircraft` |
| GLB path | `models/daisy-aircraft.glb` |
| Fallback image | `models/fallback/daisy-aircraft.png` |
| Size (m) | 17.0 × 19.0 × 4.8 |
| `anchor` | `center-of-gravity` |
| Built-in animation | `control_surface_check` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `aileron_left` | Left aileron |
| `aileron_right` | Right aileron |
| `elevator_left` | Left elevator |
| `elevator_right` | Right elevator |
| `rudder` | Rudder |

### Mobile ground station

![Mobile ground station](/images/models/daisy-mobile-ground-station.png)

| Field | Value |
|-------|-------|
| Name | Mobile ground station |
| Model ID | `daisy-mobile-ground-station` |
| `kind` | `mobileGroundStation` |
| GLB path | `models/daisy-mobile-ground-station.glb` |
| Fallback image | `models/fallback/daisy-mobile-ground-station.png` |
| Size (m) | 2.6 × 7.4 × 6.0 |
| `anchor` | `ground-center` |
| Built-in animation | `mobile_station_scan` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `mast` | Antenna mast |
| `azimuth` | Antenna azimuth axis |
| `elevation` | Antenna elevation axis |
| `wheel_left_rear` | Left rear wheel |
| `wheel_left_front` | Left front wheel |
| `wheel_right_rear` | Right rear wheel |
| `wheel_right_front` | Right front wheel |

### Cargo ship

![Cargo ship](/images/models/daisy-cargo-ship.png)

| Field | Value |
|-------|-------|
| Name | Cargo ship |
| Model ID | `daisy-cargo-ship` |
| `kind` | `cargoShip` |
| GLB path | `models/daisy-cargo-ship.glb` |
| Fallback image | `models/fallback/daisy-cargo-ship.png` |
| Size (m) | 20.0 × 120.0 × 26.0 |
| `anchor` | `waterline-center` |
| Built-in animation | `ship_systems_check` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `radar` | Shipboard radar |
| `rudder` | Rudder |

### UAV

![UAV](/images/models/daisy-uav.png)

| Field | Value |
|-------|-------|
| Name | UAV |
| Model ID | `daisy-uav` |
| `kind` | `uav` |
| GLB path | `models/daisy-uav.glb` |
| Fallback image | `models/fallback/daisy-uav.png` |
| Size (m) | 2.9 × 2.9 × 0.7 |
| `anchor` | `center-of-gravity` |
| Built-in animation | `rotor_spin` |

**Parts (control nodes)**

| Node | Description |
|------|-------------|
| `rotor_front_left` | Front-left rotor |
| `rotor_front_right` | Front-right rotor |
| `rotor_rear_left` | Rear-left rotor |
| `rotor_rear_right` | Rear-right rotor |
| `gimbal` | Camera gimbal |

## Runtime Contract

- glTF coordinates use `+Y` up after export.
- One glTF distance unit equals one meter.
- Static geometry is merged by semantic modules; movable modules are driven by control nodes.
- Every GLB uses `KHR_draco_mesh_compression` and stays below 128 KiB.
- `models/fallback/` contains a matching transparent PNG for each GLB.
- `models/catalog.json` is the language-neutral manifest. TypeScript callers use `DaisyModelLibrary` or `resolveDaisyModelAsset()`.

## Node and Animation Control

After the model loads, call `model.getNodeNames()` to verify node names and drive parts with `transformNode(name)`:

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

When playing a built-in animation, set `name` to the catalog `animation` field value. See [3D Models and Tilesets](/en/guide/model-tileset) for full parameters.

## Related Documentation

- [3D Models and Tilesets](/en/guide/model-tileset)
- [Built-in Assets](/en/guide/builtin-assets)
- [Ground Stations](/en/guide/ground-station)
- [Satellites and Orbital Mechanics](/en/guide/satellite)
- [ModelFeature](/en/api/classes/ModelFeature)
- `DaisyModelLibrary` / `resolveDaisyModelAsset()` / `withDaisyBuiltinModel()`
- [BuildModuleUrl](/en/api/classes/BuildModuleUrl)
