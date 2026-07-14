[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CapsuleParticleFrameMetadata

# Interface: CapsuleParticleFrameMetadata

## Properties

### contentRect

> **contentRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

本帧真实有 alpha 的内容包围盒，单位：sourceSize 像素坐标。

***

### cropRect

> **cropRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

实际裁剪区域，单位：sourceSize 像素坐标。为了动画稳定，当前同一批帧共用 union crop。

***

### logicalRect

> **logicalRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

原始逻辑绘制区域。length/radius 仍以这个区域作为基准。

***

### playRect

> **playRect**: [`CapsuleParticleFrameRect`](CapsuleParticleFrameRect.md)

裁剪 sprite 对应的局部播放矩形。

x/width 沿喷焰长度方向，0 是喷口，1 是 length 末端；
y/height 沿横向宽度方向，-1 到 1 对应完整 radius 范围。

***

### sourceSize

> **sourceSize**: [`CapsuleParticleFrameSize`](CapsuleParticleFrameSize.md)

粒子实际生成的大画布尺寸，单位：px。

***

### spriteSize

> **spriteSize**: [`CapsuleParticleFrameSize`](CapsuleParticleFrameSize.md)

裁剪后真正送入材质播放的 sprite 尺寸，单位：px。
