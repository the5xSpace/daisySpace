[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EntityTimeState

# Interface: EntityTimeState

Time state snapshot of an entity at a given moment.

## Properties

### position?

> `optional` **position?**: `Cartesian3`

Entity position at that moment (world coordinates).

***

### positionECEF?

> `optional` **positionECEF?**: `Cartesian3`

Entity position at that moment (Earth-fixed / ECEF).

***

### positionInertial?

> `optional` **positionInertial?**: `Cartesian3`

Entity position at that moment (inertial coordinates).

***

### time

> **time**: `JulianDate`

Simulation time.
