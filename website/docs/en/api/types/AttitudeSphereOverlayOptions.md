[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereOverlayOptions

# Type Alias: AttitudeSphereOverlayOptions

> **AttitudeSphereOverlayOptions** = `object`

AttitudeSphereOverlay creation parameters.

## Remarks

- This overlay creates a `canvas` inside the specified container (absolute positioning, pointer-events: none).
- Project the camera right/up/direction onto a 2D canvas via `renderFromCamera(camera)` for visualization.
- `container` accepts an HTMLElement or selector string (`#id` / `.class` / `id`).

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

Container: HTMLElement or selector string (`#id` / `.class` / `id`).
Defaults to the underlying rendering engine container when not provided.

***

### margin?

> `optional` **margin?**: `number`

Reserved parameter (not used in current implementation).

#### Default

```ts
8
```

***

### position?

> `optional` **position?**: `object`

Canvas positioning style within the container (CSS string).

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

Whether to draw XYZ axis arrows.

#### Default

```ts
true
```

***

### showLabels?

> `optional` **showLabels?**: `boolean`

Whether to display XYZ text labels (drawn at the end of axis arrows).

#### Default

```ts
false
```

***

### showSphere?

> `optional` **showSphere?**: `boolean`

Whether to draw a semi-transparent sphere fill.

#### Default

```ts
true
```

***

### showWireframe?

> `optional` **showWireframe?**: `boolean`

Whether to draw the sphere outer wireframe.

#### Default

```ts
true
```

***

### showYawPitchRoll?

> `optional` **showYawPitchRoll?**: `boolean`

Whether to draw yaw/pitch/roll reference circles.

#### Default

```ts
true
```

***

### size?

> `optional` **size?**: `number`

Canvas size (pixels). Minimum value is clamped to 64.

#### Default

```ts
140
```

***

### xColor?

> `optional` **xColor?**: `Daisy.Color` \| `string`

X-axis color (Daisy.Color or CSS color string).

#### Default

```ts
Daisy.Color.RED
```

***

### yColor?

> `optional` **yColor?**: `Daisy.Color` \| `string`

Y-axis color (Daisy.Color or CSS color string).

#### Default

```ts
Daisy.Color.GREEN
```

***

### zColor?

> `optional` **zColor?**: `Daisy.Color` \| `string`

Z-axis color (Daisy.Color or CSS color string).

#### Default

```ts
Daisy.Color.BLUE
```
