[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AltitudeProfile

# Interface: AltitudeProfile

PathBuilder - 路径构建器

从航点集合创建路径位置序列或带时间的仿真轨迹。

两种产出模式：
 1. buildPositions() → Cartesian3[] 纯位置集合（无时间，用于折线/几何）
 2. buildTrajectory() → TrajectorySample 带时间的仿真采样（用于驱动实体运动）

用法示例：

 // 纯贝塞尔曲线位置集合
 const pts = new PathBuilder()
 .fromWaypoints([p1, p2, p3])
 .bezier(30, 30)
 .buildPositions();

 // 带高度剖面的仿真轨迹
 const traj = new PathBuilder()
 .fromWaypoints([p1, p2, p3])
 .bezier(30, 24)
 .altitudeProfile({
 segmentAltitudes: [6000, 9000, 5000],
 groundAltitude: 100,
 })
 .buildTrajectory(start, stop);

 // 闭合环形路径
 const ring = new PathBuilder()
 .fromWaypoints([p1, p2, p3, p4])
 .bezier(15, 20)
 .closed(true)
 .buildPositions();

## Properties

### climbRatio?

> `optional` **climbRatio?**: `number`

爬升阶段占比（0~1），默认 0.2

***

### descentRatio?

> `optional` **descentRatio?**: `number`

下降起始占比（0~1），默认 0.8

***

### groundAltitude?

> `optional` **groundAltitude?**: `number`

地面/起降高度（米），默认 0

***

### segmentAltitudes

> **segmentAltitudes**: `number`[]

每段巡航高度（米）。段数 = 航点数 - 1
