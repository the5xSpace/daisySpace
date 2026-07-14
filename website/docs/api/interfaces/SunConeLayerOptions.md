[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SunConeLayerOptions

# Interface: SunConeLayerOptions

日锥图层配置。

## Properties

### body?

> `optional` **body?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

遮挡天体，默认地球。

***

### id?

> `optional` **id?**: `string`

图层唯一标识。

***

### name?

> `optional` **name?**: `string`

图层显示名称。默认 `Sun cone`。

***

### penumbraColor?

> `optional` **penumbraColor?**: `Color`

半影颜色。

***

### segments?

> `optional` **segments?**: `number`

圆周分段数，范围为 3 至 512。默认 64。

***

### show?

> `optional` **show?**: `boolean`

是否显示，默认 true。

***

### showPenumbra?

> `optional` **showPenumbra?**: `boolean`

是否显示半影，默认 true。

***

### showUmbra?

> `optional` **showUmbra?**: `boolean`

是否显示本影，默认 true。

***

### sun?

> `optional` **sun?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

光源天体，默认太阳。

***

### umbraColor?

> `optional` **umbraColor?**: `Color`

本影颜色。

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

按仿真时间更新空间形态的最小间隔，单位为秒；`0` 表示每帧更新。默认 30。

***

### visualLengthScale?

> `optional` **visualLengthScale?**: `number`

轴向显示长度相对物理本影长度的比例，必须大于 0。默认 0.12；遮挡判定不受影响。
