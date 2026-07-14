[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / sinh

# Function: sinh()

> **sinh**(`value`): `number`

Returns the hyperbolic sine of a number.
The hyperbolic sine of <em>value</em> is defined to be
(<em>e<sup>x</sup>&nbsp;-&nbsp;e<sup>-x</sup></em>)/2.0
where <i>e</i> is Euler's number, approximately 2.71828183.

Special cases:
 
- If the argument is NaN, then the result is NaN.
 <li>If the argument is infinite, then the result is an infinity
 with the same sign as the argument.</li>

 <li>If the argument is zero, then the result is a zero with the
 same sign as the argument.</li>
 


## Parameters

### value

`number`

The number whose hyperbolic sine is to be returned.

## Returns

`number`

The hyperbolic sine of `value`.
