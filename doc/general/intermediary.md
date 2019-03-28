[Documentation](README.md) >
Intermediary property object

# Intermediary property object
Conversely allows for seamless object-to-primitive conversion, as the
following example show:

```JavaScript
const Convr = require('conversely');

const distance = {
  start: 9,
  end: 109,
  valueOf: function() {return this.end - this.start;}
};

Convr.numberify(distance); // returns 109
```

## Mechanism of evaluation

Conversely evaluates an object by attempting to call its `valueOf()` and
`toString()` methods.

By default, all JavaScript have two such functions. For example,
for the `Date` object, [`valueOf()`][date.valueof] returns a number and
[`toString()`][date.tostring] returns a formatted string of the date.

[date.valueof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf
[date.tostring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString

Generally, `object.valueOf()` is preferred over `object.toString()`.

If conversion fails for any reason, `null` is returned.

#### No chain evaluation

By default, `object.valueOf()` returns a reference to itself. If we try to
evaluates the reference, we would get an infinite loop. As a precaution,
Conversely would not perform chain evaluation on an object and would
return `null` instead.

#### String evaluation

By default, `object.toString()` would return '`[object Object]`'. If
the behavior of `object.toString()` is overridden, then `stringify()` would
return its result. Otherwise, `stringify()` would use the result of
`object.valueOf()`.

For details, read [spec/stringify](spec/stringify).

## Dynamic evaluation

Object conversion is especially useful for data validation or similar
application where you need to pass a parameter that is dynamically updated.
The following illustrates this concept:

```JavaScript
const Convr = require('conversely');

// Intermediary property object
function IProperty(value) { this.value = value; }
IProperty.prototype.valueOf = function() { return this.value; }

// Storage of properties
function Properties() { this.__props = {}; }
Properties.prototype.define = function (name, value) {
  const prop = new IProperty(value);
  this.__props[name] = prop;
  Object.defineProperty(this, name, {
    get: function() { return prop.value; },
    set: function(val) { prop.value = val; }
  });
}
Properties.prototype.ref = function (name) {
  return this.__properties[name];
}

const props = new Properties();
props.define('max',100);

// static_max is assigned the current value of props.max to
const static_max = props.max;
// dynamic_max is a reference of props.max
const dynamic_max = props.ref('max');

props.max = 200;

console.log(Convr.numberify(static_max)); // 100, the old data
console.log(Convr.numberify(dynamic_max)); // 200, the new data
```

By using Conversely, your validation rule can accept dynamically defined
parameters without a string parser.

Instead of:
```JavaScript
props.define('max').as('number');
props.define('min').as('number');
props.define('length').as('number');
props.length.accept({max:'max'}).and( {min:'min'});
// while the code looks succinct, underneath there needs to be a full-fledged
// syntax parser.

// :

props.length.validate();
```
Implement like this:
```JavaScript
props.define('max').as('number');
props.define('min').as('number');
props.define('length').as('number');
props.length.accept({max:props.ref('max')}).and({min:props.ref('min')});
// Regular JavaScript. No syntax parser.

// :
props.length.validate();

```
