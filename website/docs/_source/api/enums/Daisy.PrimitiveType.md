[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / PrimitiveType

# Enumeration: PrimitiveType

The type of a geometric primitive, i.e., points, lines, and triangles.

## Enumeration Members

### LINE\_LOOP

> **LINE\_LOOP**: `2`

Line loop primitive where each vertex (or index) after the first connects a line to
the previous vertex, and the last vertex implicitly connects to the first.

***

### LINE\_STRIP

> **LINE\_STRIP**: `3`

Line strip primitive where each vertex (or index) after the first connects a line to the previous vertex.

***

### LINES

> **LINES**: `1`

Lines primitive where each two vertices (or indices) is a line segment. Line segments are not necessarily connected.

***

### POINTS

> **POINTS**: `0`

Points primitive where each vertex (or index) is a separate point.

***

### TRIANGLE\_FAN

> **TRIANGLE\_FAN**: `6`

Triangle fan primitive where each vertex (or index) after the first two connect to
the previous vertex and the first vertex forming a triangle. For example, this can be used
to model a cone or circle.

***

### TRIANGLE\_STRIP

> **TRIANGLE\_STRIP**: `5`

Triangle strip primitive where each vertex (or index) after the first two connect to
the previous two vertices forming a triangle. For example, this can be used to model a wall.

***

### TRIANGLES

> **TRIANGLES**: `4`

Triangles primitive where each three vertices (or indices) is a triangle. Triangles do not necessarily share edges.
