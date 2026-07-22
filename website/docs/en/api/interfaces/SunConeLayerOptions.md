[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SunConeLayerOptions

# Interface: SunConeLayerOptions

Sun cone layer configuration.

## Properties

### body?

> `optional` **body?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Occulting celestial body, defaults to Earth.

***

### id?

> `optional` **id?**: `string`

Unique layer ID.

***

### name?

> `optional` **name?**: `string`

Layer display name. Defaults to `Sun cone`.

***

### penumbraColor?

> `optional` **penumbraColor?**: `Color`

Penumbra color.

***

### segments?

> `optional` **segments?**: `number`

Number of circumferential segments, range 3 to 512. Default 64.

***

### show?

> `optional` **show?**: `boolean`

是否显示，默认 true。

***

### showPenumbra?

> `optional` **showPenumbra?**: `boolean`

Whether to show penumbra, default true.

***

### showUmbra?

> `optional` **showUmbra?**: `boolean`

Whether to show umbra, default true.

***

### sun?

> `optional` **sun?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Light source celestial body, defaults to the Sun.

***

### umbraColor?

> `optional` **umbraColor?**: `Color`

Umbra color.

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

Minimum interval for updating spatial form by simulation time, in seconds; `0` means update every frame. Default 30.

***

### visualLengthScale?

> `optional` **visualLengthScale?**: `number`

Ratio of axial display length to physical umbra length, must be greater than 0. Default 0.12; occlusion determination is unaffected.
