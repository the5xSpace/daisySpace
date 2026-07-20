# 自定义 Shader 与 Material

Daisy 自定义材质统一使用 Daisy GLSL。将源码字符串直接传给 `MaterialFactory.Custom()`，或赋值给 `Shader.glsl`；SDK 会自动识别、校验并转换，不需要额外包装。

## Daisy GLSL

Daisy GLSL 保留标准 GLSL 的表达能力，只简化材质入口、内置变量和输入参数命名。

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const pulseSource = `
daisy_material daisy_getMaterial(daisy_materialInput inParams)
{
    daisy_material material = daisy_getDefaultMaterial(inParams);
    vec2 uv = inParams.uv - vec2(0.5);
    float distanceToCenter = length(uv);
    float phase = fract(daisy_frameNumber / 90.0);
    float wave = smoothstep(0.18, 0.0, abs(phase - distanceToCenter));

    material.diffuse = mix(baseColor.rgb, pulseColor.rgb, wave);
    material.emission = pulseColor.rgb * wave * 0.35;
    material.alpha = opacity * (0.35 + wave * 0.65);
    return material;
}
`

const entity = engine.createEntity("CustomMaterialDemo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 0)
entity.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 160000,
    semiMinorAxis: 160000,
    height: 3000,
    material: Daisy.MaterialFactory.Custom("DaisyUserPulse", {
        baseColor: Daisy.Color.BLUE.withAlpha(0.42),
        pulseColor: Daisy.Color.CYAN,
        opacity: 0.86,
    }, pulseSource),
}))
```

`MaterialFactory.Custom()` 会自动识别源码中的 `daisy_*` 标识符。材质创建时，Daisy 会校验方言并转换为可执行 GLSL；未知标识符会提供带行列号的错误。

## 输入参数

材质入口固定接收 `daisy_materialInput inParams`。`uv`、`u`、`uvw` 是 Daisy 提供的语义名称，编译时会映射到实际纹理坐标。

| 参数 | 类型 | 含义 |
|---|---|---|
| `inParams.u` | `float` | 一维纹理坐标 |
| `inParams.uv` | `vec2` | 二维 UV，最常用 |
| `inParams.uvw` | `vec3` | 三维纹理坐标 |
| `inParams.normalEC` | `vec3` | 视图坐标系中的表面法线 |
| `inParams.positionToEyeEC` | `vec3` | 当前片元指向相机的视图坐标向量 |
| `inParams.tangentToEyeMatrix` | `mat3` | 切线空间到视图空间的转换矩阵 |
| `inParams.height` | `float` | 地表高度，仅特定地表材质可用 |
| `inParams.slope` | `float` | 地表坡度，仅特定地表材质可用 |
| `inParams.aspect` | `float` | 地表坡向，仅特定地表材质可用 |
| `inParams.waterMask` | `float` | 地表水体掩膜，仅特定地表材质可用 |

## 材质输出

从 `daisy_getDefaultMaterial(inParams)` 开始，只覆盖效果需要的字段。

| 字段 | 类型 | 含义 |
|---|---|---|
| `material.diffuse` | `vec3` | 漫反射颜色 |
| `material.specular` | `float` | 镜面反射强度 |
| `material.shininess` | `float` | 高光锐度 |
| `material.normal` | `vec3` | 视图坐标系中的材质法线 |
| `material.emission` | `vec3` | 自发光颜色 |
| `material.alpha` | `float` | 透明度，范围 0 到 1 |

## 内置变量与常量

| Daisy GLSL | 类型 | 含义 |
|---|---|---|
| `daisy_frameNumber` | `float` | 当前渲染帧序号，不等同于经过秒数 |
| `daisy_cameraPositionWC` | `vec3` | 相机世界坐标位置 |
| `daisy_sunPositionWC` | `vec3` | 太阳世界坐标位置 |
| `daisy_sunDirectionWC` | `vec3` | 世界坐标系太阳方向 |
| `daisy_sunDirectionEC` | `vec3` | 视图坐标系太阳方向 |
| `daisy_pi` | `float` | π |
| `daisy_twoPi` | `float` | 2π |
| `daisy_halfPi` | `float` | π/2 |
| `daisy_radiansPerDegree` | `float` | 角度转弧度系数 |
| `daisy_degreesPerRadian` | `float` | 弧度转角度系数 |

Daisy 还提供两个坐标辅助函数：

```glsl
vec3 targetEC = daisy_worldToEyePosition(targetPositionWC);
vec3 directionEC = daisy_directionTo(inParams, targetPositionWC);
```

`daisy_directionTo()` 会从当前片元计算指向 ECEF 世界坐标目标的方向，适合点光源、移动目标、扫描中心和引力源等效果。当前该辅助函数仅适用于 3D 场景；2D 和 Columbus View 请自行传入对应场景坐标系的方向。

## 动态 ShaderParams

普通 uniform 是静态值。`ShaderParams` 可以把 Entity 或仿真时间托举成实时 uniform，用户不需要手动监听每一帧。

```typescript
const target = engine.createEntity("MovingTarget")
target.position = Daisy.Cartesian3.fromDegrees(116.8, 40.1, 30000)

const source = `
daisy_material daisy_getMaterial(daisy_materialInput inParams)
{
    daisy_material material = daisy_getDefaultMaterial(inParams);
    vec3 directionEC = daisy_directionTo(inParams, targetPosition);
    float lighting = max(dot(inParams.normalEC, directionEC), 0.0);
    float pulse = 0.5 + 0.5 * sin(elapsedSeconds * speed);

    material.diffuse = mix(baseColor.rgb, targetColor.rgb, lighting);
    material.emission = targetColor.rgb * lighting * pulse;
    material.alpha = opacity;
    return material;
}
`

const material = Daisy.MaterialFactory.Custom("TrackTarget", {
    targetPosition: Daisy.ShaderParams.entityPosition(target),
    elapsedSeconds: Daisy.ShaderParams.timeSeconds(engine),
    baseColor: Daisy.Color.BLUE,
    targetColor: Daisy.Color.YELLOW,
    speed: 2.0,
    opacity: 0.85,
}, source)
```

`entityPosition()` 默认在目标暂时无位置时保持最后一次有效值。也可以通过 `unavailable: "fallback"` 或 `unavailable: "zero"` 指定行为。

业务状态可使用通用动态参数：

```typescript
const strength = Daisy.ShaderParams.dynamic(
    "float",
    () => applicationState.effectStrength,
    { fallback: 0 },
)
```

`dynamic()` 会校验 fallback 和实时返回值是否匹配声明的 GLSL 类型。resolver 返回 `undefined` 时使用 fallback；resolver 抛错或返回错误类型时会直接报告异常，避免把无效值静默上传到 GPU。

## 注册可复用 Shader

同一种材质需要被多个 Feature 使用时，可以让 `Shader` 保存 Daisy GLSL 字符串，再通过 `MaterialFactory.Registered()` 创建实例。

```typescript
class PatrolSweepShader extends Daisy.Shader {
    type = "PatrolSweep"
    uniforms = {
        baseColor: Daisy.Color.BLUE,
        sweepColor: Daisy.Color.ORANGE,
        opacity: 0.82,
    }
    glsl = `
daisy_material daisy_getMaterial(daisy_materialInput inParams)
{
    daisy_material material = daisy_getDefaultMaterial(inParams);
    float angle = atan(inParams.uv.y - 0.5, inParams.uv.x - 0.5);
    float scan = fract(daisy_frameNumber / 120.0);
    float normalizedAngle = fract(angle / daisy_twoPi + 1.0);
    float beam = smoothstep(0.16, 0.0, abs(normalizedAngle - scan));

    material.diffuse = mix(baseColor.rgb, sweepColor.rgb, beam);
    material.emission = sweepColor.rgb * beam * 0.45;
    material.alpha = opacity;
    return material;
}
`
}

Daisy.shaderManager.registerShader(new PatrolSweepShader())
Daisy.shaderManager.boot()

const material = Daisy.MaterialFactory.Registered("PatrolSweep", {
    sweepColor: Daisy.Color.YELLOW,
})
```

引擎创建前注册的 Shader 会在初始化时自动引导。运行中注册时，再调用一次 `Daisy.shaderManager.boot()`。

## 使用约束

- 自定义面材质适合带法线和纹理坐标的 Feature。依赖 UV 时应使用包含 `st` 的顶点格式。
- GLSL 的 `texture()` 调用必须位于材质入口函数内部。
- uniform 在 GLSL 中直接使用其名称；`inParams` 只表示当前片元输入，不包含 uniforms。
- `WC` 表示世界坐标，`EC` 表示视图坐标。3D 场景中的移动目标建议上传 ECEF 世界坐标，再使用 `daisy_directionTo()` 转换。

> **相关 API**：[MaterialFactory](/en/api/classes/MaterialFactory) · [Shader](/en/api/classes/Shader) · [shaderManager](/en/api/variables/shaderManager)
