[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ComponentDatatype

# Enumeration: ComponentDatatype

WebGL component datatypes. Components are intrinsics,
which form attributes, which form vertices.

## Enumeration Members

### BYTE

> **BYTE**: `5120`

8-bit signed byte corresponding to `gl.BYTE` and the type
of an element in `Int8Array`.

***

### DOUBLE

> **DOUBLE**: `5130`

64-bit floating-point corresponding to `gl.DOUBLE` (in Desktop OpenGL;
this is not supported in WebGL, and is emulated in via GeometryPipeline.encodeAttribute)
and the type of an element in `Float64Array`.

***

### FLOAT

> **FLOAT**: `5126`

32-bit floating-point corresponding to `FLOAT` and the type
of an element in `Float32Array`.

***

### INT

> **INT**: `5124`

32-bit signed int corresponding to `INT` and the type
of an element in `Int32Array`.

***

### SHORT

> **SHORT**: `5122`

16-bit signed short corresponding to `SHORT` and the type
of an element in `Int16Array`.

***

### UNSIGNED\_BYTE

> **UNSIGNED\_BYTE**: `5121`

8-bit unsigned byte corresponding to `UNSIGNED_BYTE` and the type
of an element in `Uint8Array`.

***

### UNSIGNED\_INT

> **UNSIGNED\_INT**: `5125`

32-bit unsigned int corresponding to `UNSIGNED_INT` and the type
of an element in `Uint32Array`.

***

### UNSIGNED\_SHORT

> **UNSIGNED\_SHORT**: `5123`

16-bit unsigned short corresponding to `UNSIGNED_SHORT` and the type
of an element in `Uint16Array`.
