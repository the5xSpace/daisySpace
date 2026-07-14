[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ClockStep

# Enumeration: ClockStep

Constants to determine how much time advances with each call
to Clock#tick.

## Enumeration Members

### SYSTEM\_CLOCK

> **SYSTEM\_CLOCK**: `2`

Clock#tick sets the clock to the current system time;
ignoring all other settings.

***

### SYSTEM\_CLOCK\_MULTIPLIER

> **SYSTEM\_CLOCK\_MULTIPLIER**: `1`

Clock#tick advances the current time by the amount of system
time elapsed since the previous call multiplied by Clock#multiplier.

***

### TICK\_DEPENDENT

> **TICK\_DEPENDENT**: `0`

Clock#tick advances the current time by a fixed step,
which is the number of seconds specified by Clock#multiplier.
