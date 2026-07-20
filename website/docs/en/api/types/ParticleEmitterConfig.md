[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ParticleEmitterConfig

# Type Alias: ParticleEmitterConfig

> **ParticleEmitterConfig** = \{ `arc?`: `number`; `direction?`: `Daisy.Cartesian3`; `emitFrom?`: [`ParticleEmitFrom`](ParticleEmitFrom.md); `radius?`: `number`; `radiusThickness?`: `number`; `type`: `"circle"`; \} \| \{ `dimensions?`: `Daisy.Cartesian3`; `direction?`: `Daisy.Cartesian3`; `emitFrom?`: [`ParticleEmitFrom`](ParticleEmitFrom.md); `scale?`: `Daisy.Cartesian3`; `type`: `"box"`; \} \| \{ `angle?`: `number`; `arc?`: `number`; `direction?`: `Daisy.Cartesian3`; `emitFrom?`: [`ParticleEmitFrom`](ParticleEmitFrom.md); `height?`: `number`; `radius?`: `number`; `radiusThickness?`: `number`; `type`: `"cone"`; \} \| \{ `arc?`: `number`; `emitFrom?`: [`ParticleEmitFrom`](ParticleEmitFrom.md); `radius?`: `number`; `radiusThickness?`: `number`; `type`: `"sphere"`; \} \| \{ `direction?`: `Daisy.Cartesian3`; `type`: `"point"`; \} \| \{ `axis?`: `"x"` \| `"y"` \| `"z"`; `direction?`: `Daisy.Cartesian3`; `length?`: `number`; `type`: `"line"`; \} \| \{ `direction?`: `Daisy.Cartesian3`; `height?`: `number`; `rotation?`: `Daisy.Cartesian3`; `scale?`: `Daisy.Cartesian3`; `type`: `"rectangle"`; `width?`: `number`; \} \| \{ `direction?`: `Daisy.Cartesian3`; `emitFrom?`: [`ParticleEmitFrom`](ParticleEmitFrom.md); `height?`: `number`; `rotation?`: `number`; `type`: `"diamond"`; `width?`: `number`; \} \| \{ `direction?`: `Daisy.Cartesian3`; `innerRadius?`: `number`; `outerRadius?`: `number`; `type`: `"ring"`; \} \| \{ `height?`: `number`; `radius?`: `number`; `type`: `"cylinder"`; \} \| \{ `direction?`: `Daisy.Cartesian3`; `radius?`: `number`; `type`: `"hemisphere"`; \} \| \{ `majorRadius?`: `number`; `tubeRadius?`: `number`; `type`: `"torus"`; \} \| \{ `height?`: `number`; `radius?`: `number`; `turns?`: `number`; `type`: `"spiral"`; \} \| \{ `height?`: `number`; `radius?`: `number`; `type`: `"crown"`; \} \| \{ `amplitude?`: `number`; `direction?`: `Daisy.Cartesian3`; `frequency?`: `number`; `length?`: `number`; `phase?`: `number`; `phaseStep?`: `number`; `type`: `"wave"`; `width?`: `number`; \} \| \{ `amplitude?`: `number`; `axis?`: [`ParticleEmitterAxis`](ParticleEmitterAxis.md); `direction?`: `Daisy.Cartesian3`; `phase?`: `number`; `phaseStep?`: `number`; `radius?`: `number`; `type`: `"vibration"`; \} \| \{ `clockwise?`: `boolean`; `direction?`: `Daisy.Cartesian3`; `height?`: `number`; `phase?`: `number`; `phaseStep?`: `number`; `radius?`: `number`; `type`: `"orbit"`; \}

Particle emitter configuration.

Supports 17 emitter types: circle, box, cone, sphere, point, line, rectangle,
diamond, ring, cylinder, hemisphere, torus, spiral, crown, wave, vibration, orbit.

## Example

```ts
// 圆形发射器
const emitter: ParticleEmitterConfig = { type: "circle", radius: 5, arc: Math.PI };

// 锥形发射器
const emitter: ParticleEmitterConfig = { type: "cone", angle: 30, radius: 2 };
```
