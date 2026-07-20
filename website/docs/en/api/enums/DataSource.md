[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DataSource

# Enumeration: DataSource

Source type for orbit/position data.

This enum is typically used to distinguish between different data input methods such as TLE, Keplerian elements, ephemeris samples, etc.

## Enumeration Members

### EPHEMERIS

> **EPHEMERIS**: `2`

Ephemeris data

***

### KEPLER\_ELEMENT

> **KEPLER\_ELEMENT**: `1`

Keplerian elements

***

### LIVE\_UPDATE\_POSITION

> **LIVE\_UPDATE\_POSITION**: `3`

Real-time position update

***

### TLE

> **TLE**: `0`

tle must include 3 lines of elements
