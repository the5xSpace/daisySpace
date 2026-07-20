[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CapsuleParticleFrameMetadata

# Interface: CapsuleParticleFrameMetadata

## Properties

### contentRect

> **contentRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

The actual content bounding box with alpha for this frame, in sourceSize pixel coordinates.

***

### cropRect

> **cropRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

The actual crop region, in sourceSize pixel coordinates. For animation stability, the current batch of frames shares a union crop.

***

### logicalRect

> **logicalRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

The original logical drawing region. length/radius are still based on this region.

***

### playRect

> **playRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

The local playback rectangle corresponding to the cropped sprite.

x/width runs along the plume length direction, where 0 is the nozzle and 1 is the length end; y/height runs along the transverse width direction, where -1 to 1 maps to the full radius range.

***

### sourceSize

> **sourceSize**: [`CapsuleParticleFrameSize`](CapsuleParticleFrameSize.md)

The size of the large canvas where particles are actually generated, in px.

***

### spriteSize

> **spriteSize**: [`CapsuleParticleFrameSize`](CapsuleParticleFrameSize.md)

The sprite size actually fed into the material for playback after cropping, in px.
