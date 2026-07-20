[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateCameraViewForm

# Type Alias: ArcRotateCameraViewForm

> **ArcRotateCameraViewForm** = `object`

Orbit view parameters (spherical coordinates + roll).

Conventions:
- theta: horizontal angle (around local Z axis)
- phi: pitch angle (limited to near ±90° to avoid singularity)
- radius: distance (greater than 0)
- roll: roll around the view direction

## Properties

### phi?

> `optional` **phi?**: `number`

***

### radius?

> `optional` **radius?**: `number`

***

### roll?

> `optional` **roll?**: `number`

***

### theta?

> `optional` **theta?**: `number`
