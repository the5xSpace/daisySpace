[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereOverlayOptions

# Type Alias: AttitudeSphereOverlayOptions

> **AttitudeSphereOverlayOptions** = `object`

AttitudeSphereOverlay 创建参数。

## Remarks

- 该 overlay 会在指定容器内创建一个 `canvas`（absolute 定位、pointer-events: none）。
- 通过 `renderFromCamera(camera)` 把相机的 right/up/direction 投影到 2D 画布上进行可视化。
- `container` 支持传入 HTMLElement 或选择器字符串（`#id` / `.class` / `id`）。

## Example

```ts
import { AttitudeSphereOverlay } from "daisy-space-sdk";

const overlay = new AttitudeSphereOverlay(viewer, {
 container: "#daisyContainer",
 position: { right: "8px", bottom: "8px" },
 size: 160,
 showLabels: true,
});

// 在你的渲染循环/相机更新回调里调用
overlay.renderFromCamera(viewer.cesiumScene.camera);

// ...
overlay.destroy();
```

## Properties

### container?

> `optional` **container?**: `HTMLElement` \| `string`

容器：HTMLElement 或选择器字符串（`#id` / `.class` / `id`）。
未提供时默认使用 底层渲染引擎 容器。

***

### margin?

> `optional` **margin?**: `number`

预留参数（当前实现中未使用）。

#### Default

```ts
8
```

***

### position?

> `optional` **position?**: `object`

画布在容器内的定位样式（CSS 字符串）。

#### bottom?

> `optional` **bottom?**: `string`

#### left?

> `optional` **left?**: `string`

#### right?

> `optional` **right?**: `string`

#### top?

> `optional` **top?**: `string`

#### Default

```ts
{ top: "8px", left: "8px" }
```

***

### showAxes?

> `optional` **showAxes?**: `boolean`

是否绘制 XYZ 三轴箭头。

#### Default

```ts
true
```

***

### showLabels?

> `optional` **showLabels?**: `boolean`

是否显示 XYZ 文本标签（绘制在轴箭头末端）。

#### Default

```ts
false
```

***

### showSphere?

> `optional` **showSphere?**: `boolean`

是否绘制半透明球体填充。

#### Default

```ts
true
```

***

### showWireframe?

> `optional` **showWireframe?**: `boolean`

是否绘制球体外圈线框。

#### Default

```ts
true
```

***

### showYawPitchRoll?

> `optional` **showYawPitchRoll?**: `boolean`

是否绘制 yaw/pitch/roll 三个参考圆。

#### Default

```ts
true
```

***

### size?

> `optional` **size?**: `number`

画布尺寸（像素）。最小值会被限制为 64。

#### Default

```ts
140
```

***

### xColor?

> `optional` **xColor?**: `Daisy.Color` \| `string`

X 轴颜色（Daisy.Color 或 css 颜色字符串）。

#### Default

```ts
Daisy.Color.RED
```

***

### yColor?

> `optional` **yColor?**: `Daisy.Color` \| `string`

Y 轴颜色（Daisy.Color 或 css 颜色字符串）。

#### Default

```ts
Daisy.Color.GREEN
```

***

### zColor?

> `optional` **zColor?**: `Daisy.Color` \| `string`

Z 轴颜色（Daisy.Color 或 css 颜色字符串）。

#### Default

```ts
Daisy.Color.BLUE
```
