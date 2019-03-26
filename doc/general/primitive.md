
# Primitive

JavaScript have five primitive data types: *string*, *number*, *boolean*,
*null*, and *undefined*. ECMAScript 2015 (ES6) or above has a sixth
primitive type, *symbol*, which this library does not support.

## Number

A primitive number can be a finite number, infinity, or `NaN` (not-a-number).
By default, this library treats only finite numbers as numbers and other
values as `null`.

## Dicusssion

#### Number() ≠ new Number()

Consider the following:
```JavaScript
Zero = new Number('0');
zero = Number('0');
zer0 = 0;
```
`Zero`, `zero`, and `zer0` are all zeros (0). On surface, they are
the same. In reality, `Zero` is an object while `zero` and `zer0` are
primitives.

Such difference could lead to a surprising behavior, as illustrated below:
```JavaScript
// loose comparison
isEqual = (Zero == zero); // true (Zero is converted to 0 before comparison)

// strict comparison
isEqual = (Zero === zero); // false (Zero is object, and zero is primitive)
isEqual = (Zero === 0);    // false (Zero is object, and 0 is primitive)
```
Even worse:
```JavaScript
// true or false
function true_or_false(v) {
  if (v) {
    return true;
  } else {
    return false;
  }
}
true_or_false(1);    // true (non-zero is true)
true_or_false(0);    // false (zero is false)
true_or_false(zero); // false (zero is false)
true_or_false(Zero); // true! (😮)
                     // because Zero is an object,
                     // and object evaluates as true)
notTrue = false;
NotTrue = new Boolean(false);
true_or_false(notTrue);  // false
true_or_false(NotTrue);  // true (😮)

```

The difference also leads to inconsistent behavior with this library:
```JavaScript
Convr.number(Zero); // null, because number() only accepts primitive
Convr.numberify(Zero); // 0, because Zero.valueOf() returns 0
```

To avoid surprises, never use new Number

use code analysis tools such as
[JSLint](https://jshint.com/),
[ESLint](https://eslint.org/), or
[TSLint](https://palantir.github.io/tslint/)
which will alert you to common JavaScript code problems.

**References**
* Ruzicka, V. (2018, Jan 31). Javascript Primitives Guide.
[Web log post] Retrieved from:
https://www.vojtechruzicka.com/javascript-primitives/
* Croll, A. (2010, Sept 27). The Secret Life of JavaScript Primitives.
[Web log post] Retrieved from:
Retrieved from
https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/
