[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / localFrameToFixedFrameGenerator

# Function: localFrameToFixedFrameGenerator()

> **localFrameToFixedFrameGenerator**(`firstAxis`, `secondAxis`): [`LocalFrameToFixedFrame`](../types/Daisy.Transforms.LocalFrameToFixedFrame.md)

Generates a function that computes a 4x4 transformation matrix from a reference frame
centered at the provided origin to the provided ellipsoid's fixed reference frame.

## Parameters

### firstAxis

`string`

name of the first axis of the local reference frame. Must be
 'east', 'north', 'up', 'west', 'south' or 'down'.

### secondAxis

`string`

name of the second axis of the local reference frame. Must be
 'east', 'north', 'up', 'west', 'south' or 'down'.

## Returns

[`LocalFrameToFixedFrame`](../types/Daisy.Transforms.LocalFrameToFixedFrame.md)

The function that will computes a
4x4 transformation matrix from a reference frame, with first axis and second axis compliant with the parameters,
