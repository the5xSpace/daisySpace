[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AltitudeProfile

# Interface: AltitudeProfile

PathBuilder - Path builder

Creates path position sequences or time-based simulation trajectories from a set of waypoints.

Two output modes:
 1. buildPositions() → Cartesian3[] pure position set (no time, for polylines/geometry)
 2. buildTrajectory() → TrajectorySample time-based simulation samples (for driving entity motion)

Usage example:

 // Pure Bezier curve position set
 const pts = new PathBuilder()
 .fromWaypoints([p1, p2, p3])
 .bezier(30, 30)
 .buildPositions();

 // Simulation trajectory with altitude profile
 const traj = new PathBuilder()
 .fromWaypoints([p1, p2, p3])
 .bezier(30, 24)
 .altitudeProfile({
 segmentAltitudes: [6000, 9000, 5000],
 groundAltitude: 100,
 })
 .buildTrajectory(start, stop);

 // Closed loop path
 const ring = new PathBuilder()
 .fromWaypoints([p1, p2, p3, p4])
 .bezier(15, 20)
 .closed(true)
 .buildPositions();

## Properties

### climbRatio?

> `optional` **climbRatio?**: `number`

Climb stage ratio (0~1), default 0.2

***

### descentRatio?

> `optional` **descentRatio?**: `number`

Descent start ratio (0~1), default 0.8

***

### groundAltitude?

> `optional` **groundAltitude?**: `number`

Ground/takeoff and landing altitude (meters), default 0

***

### segmentAltitudes

> **segmentAltitudes**: `number`[]

Cruise altitude per segment (meters). Segment count = waypoint count - 1
