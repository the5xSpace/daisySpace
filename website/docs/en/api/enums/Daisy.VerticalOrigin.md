[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / VerticalOrigin

# Enumeration: VerticalOrigin

The vertical location of an origin relative to an object, e.g., a Billboard
or Label. For example, setting the vertical origin to `TOP`
or `BOTTOM` will display a billboard above or below (in screen space)
the anchor position.








## Enumeration Members

### BASELINE

> **BASELINE**: `2`

If the object contains text, the origin is at the baseline of the text, else the origin is at the bottom of the object.

***

### BOTTOM

> **BOTTOM**: `1`

The origin is at the bottom of the object.

***

### CENTER

> **CENTER**: `0`

The origin is at the vertical center between `BASELINE` and `TOP`.

***

### TOP

> **TOP**: `-1`

The origin is at the top of the object.
