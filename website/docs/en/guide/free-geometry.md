# Custom Geometry

`FreeGeometryFeature` allows users to supply custom vertex and index data to render arbitrary 3D geometry without relying on built-in geometry types. Suitable for mathematical polyhedra, custom models, procedurally generated geometry, and similar scenarios.

## Geometry Descriptor

The core input is a `DaisyGeometryDescriptor` object:

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

interface DaisyGeometryDescriptor {
    positions: GeometryPositions   // 顶点位置（必填，局部坐标）
    indices: GeometryIndices       // 索引数据（必填）
    normals?: GeometryNormals      // 顶点法线（可选）
    uvs?: GeometryUvs              // 纹理坐标（可选）
    boundingSphere?: Daisy.BoundingSphere // 包围球（可选）
}
```

### Data Types

| Field | Supported Types |
|-------|-----------------|
| `positions` | `Cartesian3[]` \| `Float64Array` \| `Float32Array` \| `number[]` |
| `indices` | `Uint16Array` \| `Uint32Array` \| `number[]` |
| `normals` | `Cartesian3[]` \| `Float32Array` \| `number[]` |
| `uvs` | `Cartesian2[]` \| `Float32Array` \| `number[]` |

All coordinates use the **local coordinate system** (relative to the Entity origin). The geometry moves, rotates, and scales together with its Entity.

## Basic Usage

```typescript
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

const feature = new Daisy.FreeGeometryFeature({
    geometry: {
        positions: [0, 0, 0, 100, 0, 0, 0, 100, 0, 50, 50, 100],
        indices: [0, 1, 2, 0, 1, 3, 1, 2, 3, 2, 0, 3],
    },
    material: Daisy.Color.CORAL.withAlpha(0.8),
    doubleSided: true,
    outline: true,
    outlineColor: Daisy.Color.WHITE,
})
entity.addFeature(feature)
```

## Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `geometry` | `DaisyGeometryDescriptor` | **Required** | Geometry descriptor |
| `material` | `DMaterial` | — | Material (color / DMaterial / material descriptor) |
| `autoNormals` | `"flat"` \| `"smooth"` \| `false` | `"flat"` | Automatic normal computation mode |
| `wireframe` | `boolean` | `false` | Wireframe mode (renders triangle edges only) |
| `doubleSided` | `boolean` | `false` | Double-sided rendering (disables back-face culling) |
| `closed` | `boolean` | `true` | Whether the geometry is closed (affects lighting) |
| `flat` | `boolean` | `false` | Flat shading (not smooth shading) |
| `translucent` | `boolean` | — | Translucent (inferred from material by default) |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `asynchronous` | `boolean` | `false` | Asynchronous geometry creation |
| `show` | `boolean` | `true` | Visibility |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance-based display condition |

### autoNormals Modes

| Mode | Description |
|------|-------------|
| `"flat"` | Per-face normals (hard-edge effect, sharp edges) |
| `"smooth"` | Smooth normals (averaged over adjacent faces, curved-surface effect) |
| `false` | No auto-computation; use raw `geometry.normals` data |

## Custom Geometry Examples

### Regular Icosahedron

```typescript
function generateIcosahedron(r: number) {
    const phi = (1 + Math.sqrt(5)) / 2
    const raw = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ]
    const positions: number[] = []
    for (const v of raw) {
        const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2])
        positions.push(v[0]/len*r, v[1]/len*r, v[2]/len*r)
    }
    const faces = [
        [0,1,5],[0,5,11],[0,11,10],[0,10,7],[0,7,1],
        [1,7,8],[1,8,9],[1,9,5],[2,3,6],[2,6,8],
        [2,8,7],[2,7,10],[2,10,11],[2,11,3],[3,11,5],
        [3,5,9],[3,9,4],[3,4,6],[4,9,8],[4,8,6]
    ]
    const indices: number[] = []
    for (const f of faces) indices.push(f[0], f[1], f[2])
    return { positions, indices }
}

entity.addFeature(new Daisy.FreeGeometryFeature({
    geometry: generateIcosahedron(160000),
    material: Daisy.Color.fromCssColorString("#F4A261").withAlpha(0.85),
    outline: true,
    outlineColor: "#E76F51",
}))
```

### Diamond Star (Bipyramid)

```typescript
function generateDiamond(r: number) {
    const h = r * 1.5
    const baseR = r * 0.55
    const segs = 8
    const positions: number[] = [0, h, 0, 0, -h, 0]
    const indices: number[] = []
    for (let i = 0; i < segs; i++) {
        const a = i * 2 * Math.PI / segs
        positions.push(baseR * Math.cos(a), 0, baseR * Math.sin(a))
    }
    for (let i = 0; i < segs; i++) {
        indices.push(0, 2 + i, 2 + (i + 1) % segs)
        indices.push(1, 2 + (i + 1) % segs, 2 + i)
    }
    return { positions, indices }
}

entity.addFeature(new Daisy.FreeGeometryFeature({
    geometry: generateDiamond(130000),
    material: Daisy.Color.fromCssColorString("#7B68EE").withAlpha(0.80),
    outline: true,
    outlineColor: "#E0B0FF",
}))
```

### UV Sphere

```typescript
function uvSphere(cx: number, cy: number, cz: number, r: number, lat: number, lon: number) {
    const positions: number[] = []
    const indices: number[] = []
    for (let i = 0; i <= lat; i++) {
        const theta = i * Math.PI / lat
        const st = Math.sin(theta), ct = Math.cos(theta)
        for (let j = 0; j <= lon; j++) {
            const phi = j * 2 * Math.PI / lon
            const sp = Math.sin(phi), cp = Math.cos(phi)
            positions.push(cx + r * st * cp, cy + r * ct, cz + r * st * sp)
        }
    }
    for (let i = 0; i < lat; i++) {
        for (let j = 0; j < lon; j++) {
            const a = i * (lon + 1) + j
            const b = a + lon + 1
            indices.push(a, b, a + 1, b, b + 1, a + 1)
        }
    }
    return { positions, indices }
}

entity.addFeature(new Daisy.FreeGeometryFeature({
    geometry: uvSphere(0, 0, 0, 100000, 16, 16),
    material: Daisy.Color.SKYBLUE.withAlpha(0.7),
    doubleSided: true,
}))
```

## Toggling Wireframe Mode

When `wireframe` is `true`, the geometry is rendered in wireframe mode, showing only triangle edges. Toggle it at runtime by updating `options` and calling `reCreate()`:

```typescript
function toggleWireframe(feature: Daisy.FreeGeometryFeature, entity: Daisy.Entity) {
    feature.options = { ...feature.options, wireframe: !feature.options.wireframe }
    feature.reCreate(entity)
}
```

## Merging Geometries

Multiple geometries can be concatenated into a single descriptor by offsetting their indices — for example, combining UV spheres into a compound shape:

```typescript
function mergeShapes(shapes: Array<{ positions: number[]; indices: number[] }>) {
    const positions: number[] = []
    const indices: number[] = []
    let offset = 0
    for (const s of shapes) {
        for (const v of s.positions) positions.push(v)
        for (const idx of s.indices) indices.push(idx + offset)
        offset += s.positions.length / 3
    }
    return { positions, indices }
}
```

---

> **Related API**: [FreeGeometryFeature](/en/api/classes/FreeGeometryFeature)
