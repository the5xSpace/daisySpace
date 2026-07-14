# 天体系统

> **实验性质**：天体系统模块目前处于实验阶段，API 和渲染效果可能在未来版本中发生变动。生产环境请谨慎使用。

DaisySpace-Sdk 支持将仿真场景切换到地球以外的天体（月球、火星等），并提供完整的天体椭球渲染、经纬网格和坐标变换能力。

## 架构

```
CelestialBody（抽象基类）
  ├── Moon   ── 月面材质 + 晨昏线 shader
  └── Mars   ── 火星表面材质 + 大气层渲染
```

每个天体由 `CelestialBody` 子类管理，底层通过 `CelestialEllipsoid` 提供椭球几何体、坐标变换和射线求交。

## PW.Moon — 月球

创建月球椭球体并切换到月球场景：

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("container")
const moon = new Daisy.PW.Moon({
    name: "Moon",
    lockCamera: true,       // 相机锁定到月球相对坐标
})

engine.switchToCelestial(moon)
moon.bindEngine(engine)
```

`switchToCelestial()` 将引擎的主天体切换为月球，后续添加的实体将以月球为参考系。

### 月球独有特性

- **表面重力**：1.62 m/s²
- **椭球坐标系**：`ELLIPSOID.MOON`，支持经纬度到月心坐标的转换
- **晨昏线 shader**：`terminator` 选项启用后，根据太阳方向在月面材质上渲染明暗过渡
- **相机跟踪**：`lockCamera: true` 时相机始终跟随月球，`BodyTrackedCameraController` 按帧修正视角
- **经纬网格**：`grid` 选项控制坐标网格显示

### Moon 构造函数参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `name` | `string` | `"Moon"` | 天体名称 |
| `lockCamera` | `boolean` | — | 是否锁定相机到月球 |
| `ellipsoid` | `false` \| `{ show?, terminator?, shadows? }` | — | 椭球配置，`false` 禁用 |
| `grid` | `false` \| `GridConfig` | — | 经纬网格配置，`false` 禁用 |
| `bodyAxis` | `boolean` \| `BodyAxisOptions` | — | 体轴显示 |
| `arrowPointers` | `ArrowPointerOptions[]` | — | 指向箭头列表 |
| `track` | `boolean` | — | 是否启用相机跟踪 |

## PW.Mars — 火星

```typescript
const mars = new Daisy.PW.Mars({
    name: "Mars",
    lockCamera: true,
    atmosphere: { show: true, intensity: 0 },
})

engine.switchToCelestial(mars)
mars.bindEngine(engine)
```

### 火星独有特性

- **表面重力**：3.71 m/s²
- **大气层渲染**：通过 `CelestialAtmosphereFeature` 实现，支持 Rayleigh/Mie 散射参数
- **大气配置**：`atmosphere` 可为布尔值或详细参数对象，`intensity` 控制大气强度

### Mars 构造函数参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `name` | `string` | `"Mars"` | 天体名称 |
| `lockCamera` | `boolean` | — | 是否锁定相机到火星 |
| `atmosphere` | `boolean` \| `{ show?, intensity? }` | — | 大气层开关与强度 |
| `ellipsoid` | `false` \| `{ show?, terminator?, shadows? }` | — | 椭球配置 |
| `grid` | `false` \| `GridConfig` | — | 经纬网格配置 |
| `bodyAxis` | `boolean` \| `BodyAxisOptions` | — | 体轴显示 |
| `arrowPointers` | `ArrowPointerOptions[]` | — | 指向箭头列表 |
| `track` | `boolean` | — | 是否启用相机跟踪 |

## CelestialEllipsoid — 天体椭球工具

`CelestialEllipsoid` 封装天体椭球几何体及坐标变换。通过静态工厂方法获取预配置的天体实例：

```typescript
// 工厂方法
const earth = Daisy.PW.CelestialEllipsoid.Earth()    // WGS84，原点即地心
const moon = Daisy.PW.CelestialEllipsoid.Moon({      // 动态月球位置（Simon1994 行星星历）
    time: () => engine.getCurrentTime(),
})
const mars = Daisy.PW.CelestialEllipsoid.create({    // 动态火星位置
    ellipsoid: Daisy.ELLIPSOID.MARS,
    time: () => engine.getCurrentTime(),
    position: (time) => Daisy.Utils.getMarsPositionECEF(time),
})
```

### 核心方法

| 方法 | 说明 |
|------|------|
| `getPositionECEF(time?)` | 获取天体中心的 ECEF 坐标 |
| `getBodyToWorldRotation(time?)` | 获取天体自转到世界的旋转矩阵 |
| `localToWorldPoint(local, time?)` | 局部坐标 → ECEF 世界坐标 |
| `worldToLocalPoint(ecef, time?)` | ECEF 世界坐标 → 局部坐标 |
| `rayIntersection(ray, time?)` | 射线与天体椭球求交 |
| `cartesianToCartographic(ecef)` | ECEF → 经纬度（Cartographic） |
| `cartographicToCartesian(carto)` | 经纬度 → ECEF |
| `cameraHeightMeters(camPos, time?)` | 相机距天体表面高度 |
| `isEarth()` | 判断当前椭球是否为地球 |
| `getSurfaceGravity()` | 获取表面重力常量（m/s²） |

### 自定义天体椭球

```typescript
const custom = Daisy.PW.CelestialEllipsoid.create({
    ellipsoid: Daisy.ELLIPSOID.MARS,
    time: () => engine.getCurrentTime(),
    position: (time) => Daisy.Utils.getMarsPositionECEF(time),
    surfaceGravity: 3.71,
})
```

## 引擎场景切换

`Engine` 提供两个方法管理当前天体场景：

| 方法 | 说明 |
|------|------|
| `engine.switchToCelestial(body)` | 切换到指定天体场景 |
| `engine.removeCelestial(body)` | 从场景移除天体 |

切换后引擎将以新天体为中心，后续 `entity.position` 及相关计算将以该天体为参考系。

## lockCamera — 相机锁定

当 `lockCamera: true` 时，相机自动切换到天体相对坐标系：

- Moon：相机定位在赤道上方，自旋轴向上
- Mars：0° 经度/0° 纬度上空，Gram-Schmidt 修正 up 方向

锁定后可通过 `setSuppressLock(true)` 临时暂停（如 flyTo 动画期间），`resumeCameraLock()` 恢复。

## 网格抑制

通过 `setGridSuppressShow(value)` 临时隐藏/显示经纬网格，适用于相机过渡动画：

```typescript
moon.setGridSuppressShow(true)  // 隐藏网格
// ... 相机动画 ...
moon.setGridSuppressShow(false) // 恢复
```

## 完整示例

```typescript
// 1. 创建月球场景
const moon = new Daisy.PW.Moon({
    name: "Moon",
    lockCamera: true,
    grid: { show: true },
    bodyAxis: true,
})

engine.switchToCelestial(moon)
moon.bindEngine(engine)

// 2. 在月球表面添加实体
const entity = engine.createEntity("Lunar-Lander")
entity.position = Daisy.Cartesian3.fromDegrees(0, 0, 1000, Daisy.ELLIPSOID.MOON)
entity.addFeature(new Daisy.PointFeature({
    pixelSize: 8,
    color: Daisy.Color.CYAN,
}))

// 3. 天体标记组件
engine.addWidget(new Daisy.CelestialMarkerWidget({
    sun: true,
    earth: true,
    mars: true,
}))

// 4. 移除天体
engine.removeCelestial(moon)
```

---

> **相关 API**：[PW.Moon](/en/api/classes/PW.Moon) · [PW.Mars](/en/api/classes/PW.Mars) · [PW.CelestialEllipsoid](/en/api/classes/PW.CelestialEllipsoid) · [Engine](/en/api/classes/Engine)
