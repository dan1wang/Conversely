[Documentation](README.md) >
Spec

# Conversely specification

## Methods
### [`Conversely.number(value)`](fn-number.md)
Convert a primitive to either a **number** or `null`.

### [`Conversely.string(value)`](fn-string.md)
Convert a primitive to either a **string** or `null`.

### [`Conversely.boolean(value)`](fn-boolean.md)
Convert a primitive to either a **boolean** or `null`.

### [`Conversely.numberify(value)`](fn-numberify.md)
Evaluate a primitive, object, or function and convert it to either a
**number** or `null`.

### [`Conversely.stringify(value)`](fn-stringify.md)
Evaluate a primitive, object, or function and convert it to either a
**string** or `null`.

### [`Conversely.booleanify(value)`](fn-booleanify.md)
Evaluate a primitive, object, or function and convert it to either a
**boolean** or `null`.

## Properties

### [`Conversely.convert.null.toNumber`](opt-number.md#null2number)
Specify if `null` should be converted to `0` (if true) or `null` (if false).

Default: **false**.

### [`Conversely.convert.NaN.toNumber`](opt-number.md#nan2number)
Specify if `NaN` should be converted to `NaN` (if true) or `null` (if false).
Changing this option is **not recommended**.

Default: **false**.

### [`Conversely.convert.Infinity.toNumber`](opt-number.md#infinity2number)
Specify if `POSITIVE_INFINITY` or `NEGATIVE_INFINITY` should be converted to
number (if true) or `null` (if false).

Default: **false**.

### [`Conversely.convert.Infinity.toString`](opt-string.md#infinity2string)
Specify if `POSITIVE_INFINITY` or `NEGATIVE_INFINITY` should be converted to
string (if true) or `null` (if false).

Default: **false**.
