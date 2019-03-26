[Documentation](README.md) >
Spec >
Conversely.stringify()

# `Conversely.stringify()`

## Object-to-string conversion

In JavaScript, object-to-string conversion can be messy.

By default, all JavaScript objects have `toString()` method, but the
behavior can vary widely. The following illustrates some default behaviors:
```JavaScript
// By default, object.toString() returns "[object Object]"
(new Object()).toString(); // "[object Object]"

// But not always...
(new String('ab+c')).toString(); // "ab+c"
(new Number(1)).toString(); // "1"
(new Boolean(true)).toString(); // "true"
(new Date()).toString(); // a string representing current time
(new RegExp('ab+c')).toString(); // "/ab+c/"
```
`stringify()` would first check if the `toString()` has been overridden
and, if so, return its result.
```JavaScript
// Internally, Conversely uses this logic
if ((typeof obj.toString === 'function') &&
   (obj.toString !== Object.prototype.toString)) {
   //
}
```

#### Example: object with default behavior:
```JavaScript
function Person(fName, lName) {
  this.firstName = fName;
  this.lastName = lName
}
var johnDoe = new Person('John','Doe');
johnDoe.toString(); // return "[object Object]"
Convr.stringify(johnDoe); // returns null
```

#### Example: object with custom `toString()` method:
```JavaScript
function Person(fName, lName) {
  this.firstName = fName;
  this.lastName = lName
}
// Overriding the default behavior
Person.prototype.toString = function() {
  return `${this.firstName} ${this.lastName}`;
}
// Trolling. Will stringify() break?
var naughtyProfessor = new Person('[object','Object]');
// Nope. Instead of checking if toString() returns "[object Object]",
// Conversely checks if toString() is overridden.
naughtyProfessor.toString(); // return "[object Object]"
Convr.stringify(naughtyProfessor); // return "[object Object]"
```

#### Example: object with custom `toString()` and `valueOf` methods:
```JavaScript
function Person(fName, lName, age) {
  this.firstName = fName;
  this.lastName = lName;
  this.age = age;
}
Person.prototype.toString = function() {
  return `${this.firstName} ${this.lastName}`;
}
Person.prototype.valueOf = function() {
  return (this.age>=18)?'adult':'child';
}
var littleJohn = new Person('Little','John',4);
littleJohn.valueOf(); // returns "child"
littleJohn.toString(); // returns "Little John"
Convr.stringify(littleJohn); // returns "Little John"
```
