# Documentation

Conversely contains several functions for evaluating and converting any value,
object, or function to a primitive value or null.

## Primitive to primitive conversion

If a value is known to be a primitive (number, string, boolean, or null), then
the following functions can be used:

```JavaScript
Conversely.number(value)
Conversely.string(value)
Conversely.boolean(value)
```

## Evaluative conversion

If a value can be of any type, then the following functions can be used:

```JavaScript
Conversely.numberify(value)
Conversely.stringify(value)
Conversely.booleanify(value)
```

These function will try to evaluate the input value and convert it to
the appropriate primitive.
