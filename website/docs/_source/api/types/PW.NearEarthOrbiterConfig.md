[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterConfig

# Type Alias: NearEarthOrbiterConfig

> **NearEarthOrbiterConfig** = [`VehicleConfig`](PW.VehicleConfig.md) & `object`

NearEarthOrbiter 配置。

## Type Declaration

### autoOrientationByVelocity?

> `optional` **autoOrientationByVelocity?**: `boolean`

是否自动将姿态设置为“速度朝向”。

注意：该能力依赖于 position 为“轨迹采样”类型。

### enableSpg4Propagation?

> `optional` **enableSpg4Propagation?**: `boolean`

是否启用实时传播。

- true：每帧按仿真时间更新位置
- false：保留用户设置的 position（静态或轨迹采样）

### groundTrack?

> `optional` **groundTrack?**: [`GroundTrackComponentOptions`](PW.GroundTrackComponentOptions.md) \| `false`

真实星下点轨迹组件配置。

- `false`：不自动挂载
- 对象：构造时自动挂载组件

### orbitDefinition?

> `optional` **orbitDefinition?**: `OrbitSourceInput`

轨道定义（首选入口），支持 TLE / OMM XML / JSON GP。

当同时提供 `orbitDefinition`、`orbitSource`、`tle` 时，
优先级：`orbitDefinition > orbitSource > tle`。

### orbitElementsView?

> `optional` **orbitElementsView?**: [`OrbitElementsViewComponentOptions`](PW.OrbitElementsViewComponentOptions.md) \| `false`

轨道根数几何视图组件配置。

- `false`：不自动挂载
- 对象：构造时自动挂载组件

### orbitSource?

> `optional` **orbitSource?**: `OrbitSourceInput`

通用轨道源输入，支持 TLE / OMM XML / JSON GP。

当同时提供 `orbitSource` 和 `tle` 时，优先使用 `orbitSource`。

### realtimeOrbit?

> `optional` **realtimeOrbit?**: [`RealtimeOrbitComponentOptions`](PW.RealtimeOrbitComponentOptions.md) \| `false`

实时轨道圈组件配置。

- `false`：不自动挂载
- 对象：构造时自动挂载组件

### tle?

> `optional` **tle?**: `string` \| `string`[]

轨道根数（两行/三行字符串）。

### trajectory?

> `optional` **trajectory?**: `false` \| [`NearEarthOrbiterTrajectoryRequest`](PW.NearEarthOrbiterTrajectoryRequest.md)

构造后是否自动写入轨迹采样。

- 省略：自动启用，绑定 Engine 后会自动执行 `applyTrajectory()`
- `false`：关闭自动执行，改为手动调用 `applyTrajectory()`
- 对象：自动执行，并把对象作为 `applyTrajectory(...)` 的默认参数
