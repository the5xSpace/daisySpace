[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ClockRange

# Enumeration: ClockRange

Constants used by Clock#tick to determine behavior
when Clock#startTime or Clock#stopTime is reached.

## Enumeration Members

### CLAMPED

> **CLAMPED**: `1`

When Clock#startTime or Clock#stopTime is reached,
Clock#tick will not advance Clock#currentTime any further.

***

### LOOP\_STOP

> **LOOP\_STOP**: `2`

When Clock#stopTime is reached, Clock#tick will advance
Clock#currentTime to the opposite end of the interval. When
time is moving backwards, Clock#tick will not advance past
Clock#startTime

***

### UNBOUNDED

> **UNBOUNDED**: `0`

Clock#tick will always advances the clock in its current direction.
