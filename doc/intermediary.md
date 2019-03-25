# Intermediary Property
*Conversely* allows for seamless object-to-primitive conversion, as the
following example show:

```JavaScript
const Conversely = require('conversely');

const distance = {
  start: 9,
  end: 109,
  valueOf: function() {return this.end - this.start;}
};

Conversely.numberify(distance); // returns 109
```
## Application

Object conversion is especially useful for data validation or similar
application where you need to pass a parameter that is dynamically updated.
The following illustrates this concept:

```JavaScript
const Conversely = require('conversely');

// Intermediary Property object
function IProperty(value) {
  this.value = value;
  return this;
}
IProperty.prototype.get = function() {
  return this.value;
}
IProperty.prototype.set = function(value) {
  this.value = value;
}
IProperty.prototype.valueOf = function() {
  return this.value;
}

// Storage of properties
function Properties() {
  this.__properties = {}; // internal storage
  return this;
}
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

const max_by_value = props.max;
const max_by_ref = props.ref('max');

props.max = 200; // update max

console.log(Conversely.numberify(max_by_value)); // 100, the old data
console.log(Conversely.numberify(max_by_ref)); // 200, the new data
```

By using *Conversely*, your validation data can accept dynamically undefined
parameters without using string parser.

Instead of:
```JavaScript
properties.define('max', 100);
properties.define('length').expect( 'max:"max"'); // need a text parser

// :

properties.length.validate();
```
Implement like this:
```JavaScript
properties.define('max', 100);
properties.define('length').expect( {max: properties.max} );

// :
properties.length.validate();

```
