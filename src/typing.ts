/**
 * Type definitions
 */
declare module 'typing' {
  /** A primitive data type. */
  export type Primitive = boolean|number|string|null|undefined;

  // Note: we can't actually test if a function is parameterless.
  // We could check if foo.length === 0 if a function is written like
  //    function foo(...args) {}
  // or
  //    function foo(x=null) {}
  // However, default parameter and rest parameter are ES6 features, which are
  // not well supported (e.g. in IE and Google Apps Script); and most functions
  // aren't written that way anyway.

  /**
   * A function which has no _required_ parameter and returns a value or object.
   *
   * ```JavaScript
   * // All of the following are accessor functions:
   * hola = function(s) {return `Hola ${(typeof s === 'string') ? s :
   * 'Mundo'}.`}; coinToss = function() {return (Math.random() < 0.5) ? false :
   * true;}; whatsTheTime = function() {return new Date()};
   * ```
   */
  export type AccessorFn = () => boolean|number|string|object;

  // ******************** Parameterless Array Functions *******************

  // export type BooleanArrayFn = () => boolean[];
  // export type NumberArrayFn = () => number[];
  // export type StringArrayFn = () => string[];
  // export type WrapperArrayFn = BooleanArrayFn|NumberArrayFn|StringArrayFn|(()
  // => Wrapper[]);

  // ************************** Wrapper Objects  **************************

  /**
   * An object with a `valueOf()` method which returns a [[Primitive]].
   *
   * ```JavaScript
   * // Built-in object
   * t = document.createTextNode('Hello World.');
   * t.valueOf(); // Returns "Hello World."
   *
   * // Custom object
   * range = {
   *   min: 1,
   *   max: 10,
   *   valueOf: function() {return this.max-this.min;}
   * };
   * ```
   */
  type WrapperOfValue = {
    [key: string]: any,  // tslint:disable-line:no-any
    valueOf: () => Primitive;
  };

  /**
   * An object with a `toString()` method which returns a string.
   * Built-in objects all have `toString()` method, so any object is a
   * `WrapperOfString` by default.
   *
   * ```JavaScript
   * // Built-in object
   * re = /abc?/;
   * re.toString(); // Returns "/abc?/"
   *
   * // Custom object
   * person = {
   *   fName: 'John',
   *   lName: 'Doe',
   *   toString: function() {return `${this.fName} ${this.lName}`;}
   * };
   * ```
   */
  type WrapperOfString = {
    [key: string]: any,  // tslint:disable-line:no-any
    toString: () => Primitive;
  };

  /**
   * An object with a `[Symbol.toPrimitive]()` method which returns
   * a [[Primitive]]. Note `Symbol` is an ES6 feature and not supported in
   * every environment (e.g. Google Apps Script and Internet Explorer).
   *
   * ```JavaScript
   * // Built-in object
   * const date = new Date(2019);
   * String(date);
   *      // Implicitly calls date[Symbol.toPrimitive]('string')
   *      // Returns "Tue, 01 Jan 2019 00:00:00 GMT"
   * Number(date);
   *      // Implicitly calls date[Symbol.toPrimitive]('number')
   *      // Returns 1546300800000
   *
   * // Custom object
   * function Employee(id, name) {
   *   this.id = id;
   *   this.name = name;
   * }
   *
   * Employee.prototype[Symbol.toPrimitive] = function(hint) {
   *   if (hint === 'number') return this.id;
   *   return this.name;
   * }
   *
   * jDoe = new Employee(10999, 'John Doe');
   *
   * Number(jDoe); // Returns 10999
   * String(jDoe); // Returns "John Doe"
   * ```
   */
  type WrapperOfPrimitive = {
    [key: string]: any,  // tslint:disable-line:no-any
    [Symbol.toPrimitive]: (hint?: string) => Primitive;
  };

  /**
   * A wrapper object with either a `valueOf()`, `toString()`,
   * or `[Symbol.toPrimitive]()` method which returns a [[Primitive]].
   */
  export type Wrapper = WrapperOfValue|WrapperOfString|WrapperOfPrimitive;
}
