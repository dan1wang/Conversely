# Intermediary Property
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
## Application

Object conversion is especially useful for data validation or similar
application where you need to pass a parameter that is dynamically updated.
The following illustrates this concept:

```JavaScript
const Convr = require('conversely');

// Intermediary Property object
function IProperty(value) { this.value = value; }
IProperty.prototype.get = function() {return this.value; }
IProperty.prototype.set = function(value) { this.value = value; }
IProperty.prototype.valueOf = function() { return this.value; }

// Storage of properties
function Properties() { this.__properties = {}; }
Properties.prototype.define = function (name, value) {
  const prop = new IProperty(value);
  this.__properties[name] = prop;
  Object.defineProperty(this, name, {
    get: function() { return prop.get(); },
    set: function(val) { prop.set(val); }
  });
}
Properties.prototype.ref = function (name) {
  return this.__properties[name];
}

const props = new Properties();
props.define('max',100);

const static_max = props.max;
const dynamic_max = props.ref('max');

props.max = 200; // update max

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
