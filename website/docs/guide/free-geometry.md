# 自由几何体

`FreeGeometryFeature` 允许用户传入自定义顶点和索引数据，渲染任意三维几何体，不依赖内置几何类型。适用于数学多面体、自定义模型、程序化生成几何等场景。

## 几何描述

核心输入是 `DaisyGeometryDescriptor` 对象：

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

### 数据类型

| 字段 | 支持类型 |
|------|----------|
| `positions` | `Cartesian3[]` \| `Float64Array` \| `Float32Array` \| `number[]` |
| `indices` | `Uint16Array` \| `Uint32Array` \| `number[]` |
| `normals` | `Cartesian3[]` \| `Float32Array` \| `number[]` |
| `uvs` | `Cartesian2[]` \| `Float32Array` \| `number[]` |

所有坐标均为**局部坐标系**（相对于 Entity 原点）。几何体随 Entity 移动、旋转和缩放。

## 基础用法

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

## 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `geometry` | `DaisyGeometryDescriptor` | **必填** | 几何描述 |
| `material` | `DMaterial` | — | 材质（颜色/DMaterial/材质描述） |
| `autoNormals` | `"flat"` \| `"smooth"` \| `false` | `"flat"` | 法线自动计算模式 |
| `wireframe` | `boolean` | `false` | 线框模式（仅渲染三角形边） |
| `doubleSided` | `boolean` | `false` | 双面渲染（禁用背面剔除） |
| `closed` | `boolean` | `true` | 几何体是否封闭（影响光照） |
| `flat` | `boolean` | `false` | 平面着色（非平滑着色） |
| `translucent` | `boolean` | — | 半透明（默认由材质推断） |
| `outline` | `boolean` | `false` | 轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓色 |
| `asynchronous` | `boolean` | `false` | 异步创建几何 |
| `show` | `boolean` | `true` | 可见性 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 视距显示条件 |

### autoNormals 模式

| 模式 | 说明 |
|------|------|
| `"flat"` | 逐面法线（硬边效果，棱角分明） |
| `"smooth"` | 平滑法线（基于邻接面平均，曲面效果） |
| `false` | 不自动计算，使用 `geometry.normals` 原始数据 |

## 自定义几何体示例

### 正二十面体

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

### 钻石星（双锥体）

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

### UV 球体

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

## 线框模式切换

`wireframe` 为 `true` 时，几何体以线框模式渲染，仅显示三角形边线。可在运行时通过更新 `options` 并调用 `reCreate()` 切换：

```typescript
function toggleWireframe(feature: Daisy.FreeGeometryFeature, entity: Daisy.Entity) {
    feature.options = { ...feature.options, wireframe: !feature.options.wireframe }
    feature.reCreate(entity)
}
```

## 合并几何体

多个几何体可通过偏移索引拼接为单一描述符，例如用 UV 球体组合成复合形状：

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

> **相关 API**：[FreeGeometryFeature](/api/classes/FreeGeometryFeature)
