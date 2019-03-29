/**
 * Type definitions
 */
declare module 'typing' {

  /** A primitive data type. */
  export type Primitive = boolean|number|string|null|undefined;

  // *********************** Parameterless Functions **********************

  // Note: we can't actually test if a function is parameterless.
  // We could check if foo.length === 0 if a function is written like
  //    function foo(...args) {}
  // or
  //    function foo(x=null) {}
  // However, default parameter and rest parameter are ES6 features, which are
  // not well supported (e.g. in IE and Google Apps Script); and most functions
  // aren't written that way anyway.

  /**
   * A parameterless function that returns a boolean.
   *
   * ```JavaScript
   * // no parameter
   * coinToss = function() {return (Math.random() < 0.5) ? false : true;};
   * // b is not a required parameter
   * function opposite(b) { return (typeof b === 'boolean') ? (!b) : false; }
   * ```
   */
  export type BooleanFn = () => boolean;

  /**
   * A parameterless function that returns a number.
   *
   * ```JavaScript
   * // no parameter
   * function rand() { return Math.random() };
   * // n is not a required parameter
   * function addOne(n) { return (typeof n === 'number') ? n+1 : 1; }
   * ```
   */
  export type NumberFn = () => number;

  /**
   * A parameterless function that returns a string.
   *
   * ```JavaScript
   * // no parameter
   * hello = function() {return 'Hello, World.' };
   * // s is not a required parameter
   * hola = function(s) {return `Hola ${(typeof s === 'string') ? s : 'Mundo'}.`};
   * ```
   */
  export type StringFn = () => string;

  /**
   * A parameterless function which returns a number, a string, a boolean,
   * or a [[Wrapper]] (wrapper object).
   */
  export type WrapperFn = NumberFn|StringFn|BooleanFn|(() => Wrapper);

  // ******************** Parameterless Array Functions *******************

  // export type BooleanArrayFn = () => boolean[];
  // export type NumberArrayFn = () => number[];
  // export type StringArrayFn = () => string[];
  // export type WrapperArrayFn = BooleanArrayFn|NumberArrayFn|StringArrayFn|(() => Wrapper[]);

  // ************************** Wrapper Objects  **************************

  /**
   * A wrapper object with a `valueOf()` method which returns a number,
   * a string, or a boolean.
   *
   * ```JavaScript
   * // This is a wrapper object
   * range = {min: 0, max: 5, valueOf: function() {return this.max-this.min;}};
   * // This is NOT a wrapper object
   * range2 = {min: 0, max: 5 }; // range2.valueOf() returns reference to range2
   * ```
   */
  type WrapperOfValue = {
    [key: string]: any, // tslint:disable-line:no-any
    valueOf: NumberFn|StringFn|BooleanFn;
  };

  /**
   * A wrapper object with a `toString()` method which returns a string.
   * Built-in objects all have `toString()` method, so any object is a
   * WrapperOfString by default.
   *
   * ```JavaScript
   * person = {
   *   fName: 'John',
   *   lName: 'Doe',
   *   toString: function() {return `${this.fName} ${this.lName}`;}
   * };
   * ```
   */
  type WrapperOfString = {
    [key: string]: any, // tslint:disable-line:no-any
    toString: NumberFn|StringFn|BooleanFn
  };

  /**
   * A wrapper object with either a `valueOf()` or a `toString()` method
   * which returns a [[Primitive]]
   *
   * ```JavaScript
   * // A wrapper that evaluates as a boolean.
   * equal = {a: 1, b: 2, valueOf: function() {return a===b}};
   * // A wrapper that evaluates as a number.
   * range = {min: 0, max: 5, valueOf: function() {return this.max-this.min;}};
   * ```
   */
  export type Wrapper = WrapperOfValue|WrapperOfString;

  /**
   * When typecasting a data to a number and an error is encountered,
   * JavaScript would natively return `NaN`, which confusingly is
   * a "number" meaning "not a number":
   *
   * ```JavaScript
   * var test = Number('?'); // returns NaN (not-a-number)
   * typeof test; // returns "number"
   * ```
   *
   * `NaN` has special properties that can lead to unexpected results:
   * ```JavaScript
   * test = Number('?');
   * //
   * // Regular comparison logic doesn't work on NaN
   * test > 0; // returns false
   * test < 0; // returns false
   * test == NaN; // returns false
   * test === NaN; // returns false
   * //
   * // Special syntax is needed to check for NaN
   * isNaN(test); // returns true
   * Number.isNaN(test); // returns true (not supported by IE/GAS)
   * test !== test; // returns true
   * ```
   *
   * By default, [[Numberifier]] converts `NaN` and `undefined` to `null`
   * to simplify downstream error checking. Overriding this behavior is
   * possible but **not recommended**.
   *
   */
  export const NaN: number; // tslint:disable-line:variable-name
/*
  export module Symbol {
      const hasInstance: Symbol;
      const isConcatSpreadable: Symbol;
      const isRegExp: Symbol;
      const iterator: symbol;
      const toPrimitive: symbol;
      const toStringTag: symbol;
      const unscopables: Symbol;
  }
*/

  type iterator = () => null;
  export class ES6Object {
    [Symbol.hasInstance]?: (instance: object) => string;
    [Symbol.isConcatSpreadable]?: boolean;
    [Symbol.iterator]?: iterator;
    [Symbol.match]?: boolean;
    //[Symbol.matchAll]?: Function;
    [Symbol.replace]?: Function;
    [Symbol.search]?: Function;
    [Symbol.species]?: Function;
    [Symbol.split]?: Function;
    [Symbol.toPrimitive]?: (hint?: string) => Primitive;
    [Symbol.toStringTag]?: string;
    [Symbol.unscopables]?: object;
  }
}
