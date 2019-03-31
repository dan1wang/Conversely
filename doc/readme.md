# Documentation

Conversely is a lightweight, platform-independent library of functions for
evaluating a primitive, object, or function and converting it to either a
primitive or `null`.

**Example**
```JavaScript
const Convr = require('conversely');

// Converting a primitive
Convr.numberify(true); // Returns 1

// Converting a function
const TOSS_UP = function() {
  return (Math.random() < 0.5)?0:1;
};
Convr.booleanify(TOSS_UP); // Returns true or false randomly

// Converting an object
const johnDoe = {
  fName: 'John',
  lName: 'Doe',
  valueOf: function() { return this.fName + ' ' + this.lName; },
};
Convr.stringify(johnDoe); // Returns 'John Doe'
```

## Installation

(Placeholder. NPM not published yet.)

## Functions

The library contains two sets of functions for evaluating and converting
any value, object, or function to a primitive value or null.

## Primitive-to-primitive conversion

If a value is known to be a [primitive](primitive.md) (number, string, or
boolean), then the following functions can be used:

* [`Conversely.number(value)`](fn-number.md)
* [`Conversely.string(value)`](fn-string.md)
* [`Conversely.boolean(value)`](fn-boolean.md)

<details>
<summary>
**NOTE:** A variable declared by `new Number(v)`, `new String()`,
or `new Boolean()` is not a primitive!
</summary>
A variable defined by `new Number('1')` is an Number object, not a
number primitive. When in doubt, always use the evaluative conversion
functions. See [discussion](primitive#discussion) on primitives.
</details>

## Evaluative conversion

If a value is an object, a function, or of an unknown type, then the
following functions can be used:

```JavaScript
Conversely.numberify(value)
Conversely.stringify(value)
Conversely.booleanify(value)
```

These function will try to evaluate the input value and convert it to
the appropriate primitive.

## Evaluation rule
