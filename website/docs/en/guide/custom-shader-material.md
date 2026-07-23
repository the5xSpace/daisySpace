# Custom Shaders and Materials

Daisy custom materials use Daisy GLSL consistently. Pass the source string directly to `MaterialFactory.Custom()` or assign it to `Shader.glsl`; the SDK identifies, validates, and converts it automatically without extra wrapping.

## Daisy GLSL

Daisy GLSL retains standard GLSL expressiveness while simplifying the material entry point, built-in variables, and input-parameter names.

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

`MaterialFactory.Custom()` automatically identifies `daisy_*` identifiers in the source. When the material is created, Daisy validates the dialect and converts it to executable GLSL; unknown identifiers produce errors with line and column numbers.

## Input Parameters

The material entry point always receives `daisy_materialInput inParams`. `uv`, `u`, and `uvw` are Daisy semantic names mapped to actual texture coordinates during compilation.

| Parameter | Type | Meaning |
|---|---|---|
| `inParams.u` | `float` | One-dimensional texture coordinate |
| `inParams.uv` | `vec2` | Two-dimensional UV, most commonly used |
| `inParams.uvw` | `vec3` | Three-dimensional texture coordinate |
| `inParams.normalEC` | `vec3` | Surface normal in view coordinates |
| `inParams.positionToEyeEC` | `vec3` | View-coordinate vector from the current fragment to the camera |
| `inParams.tangentToEyeMatrix` | `mat3` | Matrix converting tangent space to view space |
| `inParams.height` | `float` | Surface height, available only to specific terrain materials |
| `inParams.slope` | `float` | Surface slope, available only to specific terrain materials |
| `inParams.aspect` | `float` | Surface aspect, available only to specific terrain materials |
| `inParams.waterMask` | `float` | Surface-water mask, available only to specific terrain materials |

## Material Output

Start with `daisy_getDefaultMaterial(inParams)` and override only the fields required by the effect.

| Field | Type | Meaning |
|---|---|---|
| `material.diffuse` | `vec3` | Diffuse color |
| `material.specular` | `float` | Specular intensity |
| `material.shininess` | `float` | Highlight sharpness |
| `material.normal` | `vec3` | Material normal in view coordinates |
| `material.emission` | `vec3` | Emissive color |
| `material.alpha` | `float` | Opacity, from 0 to 1 |

## Built-In Variables and Constants

| Daisy GLSL | Type | Meaning |
|---|---|---|
| `daisy_frameNumber` | `float` | Current render-frame number; not equivalent to elapsed seconds |
| `daisy_cameraPositionWC` | `vec3` | Camera position in world coordinates |
| `daisy_sunPositionWC` | `vec3` | Sun position in world coordinates |
| `daisy_sunDirectionWC` | `vec3` | Sun direction in world coordinates |
| `daisy_sunDirectionEC` | `vec3` | Sun direction in view coordinates |
| `daisy_pi` | `float` | π |
| `daisy_twoPi` | `float` | 2π |
| `daisy_halfPi` | `float` | π/2 |
| `daisy_radiansPerDegree` | `float` | Degrees-to-radians factor |
| `daisy_degreesPerRadian` | `float` | Radians-to-degrees factor |

Daisy also provides two coordinate helper functions:

```glsl
vec3 targetEC = daisy_worldToEyePosition(targetPositionWC);
vec3 directionEC = daisy_directionTo(inParams, targetPositionWC);
```

`daisy_directionTo()` computes the direction from the current fragment to an ECEF world-coordinate target. It is useful for point lights, moving targets, scan centers, and gravitational sources. This helper currently applies only to 3D scenes; for 2D and Columbus View, provide the direction in the corresponding scene coordinate system yourself.

## Dynamic ShaderParams

Ordinary uniforms are static values. `ShaderParams` can expose an Entity or simulation time as a live uniform, so you do not need to monitor every frame manually.

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

`entityPosition()` retains the last valid value by default when the target temporarily has no position. You can specify behavior with `unavailable: "fallback"` or `unavailable: "zero"`.

Use the generic dynamic parameter for application state:

```typescript
const strength = Daisy.ShaderParams.dynamic(
    "float",
    () => applicationState.effectStrength,
    { fallback: 0 },
)
```

`dynamic()` validates that the fallback and live return value match the declared GLSL type. When the resolver returns `undefined`, the fallback is used; if the resolver throws or returns the wrong type, an error is reported immediately instead of silently uploading an invalid value to the GPU.

## Registering Reusable Shaders

When the same material is used by multiple Features, let `Shader` store the Daisy GLSL string and create instances through `MaterialFactory.Registered()`.

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

Shaders registered before Engine creation are bootstrapped automatically during initialization. When registering at runtime, call `Daisy.shaderManager.boot()` once more.

## Usage Constraints

- Custom surface materials are suitable for Features with normals and texture coordinates. When UVs are required, use a vertex format that includes `st`.
- GLSL `texture()` calls must be inside the material entry function.
- Use uniform names directly in GLSL; `inParams` represents only the current fragment input and does not contain uniforms.
- `WC` denotes world coordinates and `EC` denotes view coordinates. For moving targets in 3D scenes, upload ECEF world coordinates and convert them with `daisy_directionTo()`.

> **Related API**: [MaterialFactory](/en/api/classes/MaterialFactory) · [Shader](/en/api/classes/Shader) · [shaderManager](/en/api/variables/shaderManager)
