# Custom Shader and Material

Daisy custom materials all use Daisy GLSL. Pass the source string directly to `MaterialFactory.Custom()`, or assign it to `Shader.glsl`; the SDK automatically recognizes, validates, and converts it — no additional wrapping needed.

## Daisy GLSL

Daisy GLSL preserves the expressive power of standard GLSL, only simplifying the material entry point, built-in variables, and input parameter naming.

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

`MaterialFactory.Custom()` automatically recognizes `daisy_*` identifiers in the source code. When creating the material, Daisy validates the dialect and converts it to executable GLSL; unknown identifiers provide errors with line and column numbers.

## Input Parameters

The material entry point always receives `daisy_materialInput inParams`. `uv`, `u`, `uvw` are semantic names provided by Daisy, which are mapped to actual texture coordinates at compile time.

| Parameter | Type | Meaning |
|-----------|------|---------|
| `inParams.u` | `float` | 1D texture coordinate |
| `inParams.uv` | `vec2` | 2D UV, most commonly used |
| `inParams.uvw` | `vec3` | 3D texture coordinate |
| `inParams.normalEC` | `vec3` | Surface normal in view coordinates |
| `inParams.positionToEyeEC` | `vec3` | View coordinate vector from current fragment to camera |
| `inParams.tangentToEyeMatrix` | `mat3` | Tangent space to view space transformation matrix |
| `inParams.height` | `float` | Surface height, only available for specific surface materials |
| `inParams.slope` | `float` | Surface slope, only available for specific surface materials |
| `inParams.aspect` | `float` | Surface aspect, only available for specific surface materials |
| `inParams.waterMask` | `float` | Surface water mask, only available for specific surface materials |

## Material Output

Start from `daisy_getDefaultMaterial(inParams)` and only override the fields needed for the effect.

| Field | Type | Meaning |
|-------|------|---------|
| `material.diffuse` | `vec3` | Diffuse color |
| `material.specular` | `float` | Specular intensity |
| `material.shininess` | `float` | Highlight sharpness |
| `material.normal` | `vec3` | Material normal in view coordinates |
| `material.emission` | `vec3` | Emission color |
| `material.alpha` | `float` | Alpha, range 0 to 1 |

## Built-in Variables and Constants

| Daisy GLSL | Type | Meaning |
|------------|------|---------|
| `daisy_frameNumber` | `float` | Current render frame number, not equivalent to elapsed seconds |
| `daisy_cameraPositionWC` | `vec3` | Camera world position |
| `daisy_sunPositionWC` | `vec3` | Sun world position |
| `daisy_sunDirectionWC` | `vec3` | Sun direction in world coordinates |
| `daisy_sunDirectionEC` | `vec3` | Sun direction in view coordinates |
| `daisy_pi` | `float` | π |
| `daisy_twoPi` | `float` | 2π |
| `daisy_halfPi` | `float` | π/2 |
| `daisy_radiansPerDegree` | `float` | Degrees to radians coefficient |
| `daisy_degreesPerRadian` | `float` | Radians to degrees coefficient |

Daisy also provides two coordinate helper functions:

```glsl
vec3 targetEC = daisy_worldToEyePosition(targetPositionWC);
vec3 directionEC = daisy_directionTo(inParams, targetPositionWC);
```

`daisy_directionTo()` computes the direction from the current fragment toward an ECEF world coordinate target, suitable for effects like point lights, moving targets, scan centers, and gravity sources. Currently, this helper function is only available for 3D scenes; for 2D and Columbus View, pass the corresponding scene coordinate system's direction manually.

## Dynamic ShaderParams

Regular uniforms are static values. `ShaderParams` can elevate an Entity or simulation time into a real-time uniform, without needing to manually listen to each frame.

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

`entityPosition()` keeps the last valid value when the target temporarily has no position. You can also specify behavior via `unavailable: "fallback"` or `unavailable: "zero"`.

Business state can use generic dynamic parameters:

```typescript
const strength = Daisy.ShaderParams.dynamic(
    "float",
    () => applicationState.effectStrength,
    { fallback: 0 },
)
```

`dynamic()` validates that the fallback and real-time return value match the declared GLSL type. When the resolver returns `undefined`, the fallback is used; when the resolver throws or returns an incorrect type, it directly reports an exception, preventing invalid values from being silently uploaded to the GPU.

## Registering Reusable Shaders

When the same material needs to be used by multiple Features, let `Shader` hold the Daisy GLSL string, then create instances via `MaterialFactory.Registered()`.

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

Shaders registered before engine creation are automatically bootstrapped during initialization. For runtime registration, call `Daisy.shaderManager.boot()` again.

## Usage Constraints

- Custom surface materials are suitable for Features with normals and texture coordinates. When relying on UV, use a vertex format that includes `st`.
- GLSL `texture()` calls must be inside the material entry function.
- Uniforms are directly referenced by name in GLSL; `inParams` only represents the current fragment input, not uniforms.
- `WC` means world coordinates, `EC` means view coordinates. For moving targets in 3D scenes, it's recommended to upload ECEF world coordinates and then use `daisy_directionTo()` for conversion.

> **Related API**: [MaterialFactory](/en/api/classes/MaterialFactory) · [Shader](/en/api/classes/Shader) · [shaderManager](/en/api/variables/shaderManager)
