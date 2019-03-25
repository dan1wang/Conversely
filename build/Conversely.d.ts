/**
 * A library of functions for strict convertion to primitive values
 */
/**
 * A parameterless function that returns a number.
 * @ignore
 * The following can be assigned to NumberFn:
 * ```
 * fn = () => Math.random();
 * fn = (n?:number) => (n===undefined)?1:n+1;
 * ```
 * The following cannot be assigned to NumberFn:
 * ```
 * fn = (n?:number) => (Number(n)>0); // returns a boolean
 * fn = (n:number) => n+1; // requires one parameter
 * ```
 */
declare type NumberFn = () => number;
/** A parameterless function that returns a string. See [[NumberFn]]. */
declare type StringFn = () => string;
/** A parameterless function that returns a boolean. See [[NumberFn]]. */
declare type BooleanFn = () => boolean;
/** A parameterless function that returns an object. See [[NumberFn]]. */
/** A parameterless function that returns an array. See [[NumberFn]]. */
declare type ConvertibleFn = NumberFn | StringFn | BooleanFn | (() => ConvertibleObj);
declare type ConvertibleObj = {
    [key: string]: any;
    valueOf: NumberFn | StringFn | BooleanFn;
} | {
    [key: string]: any;
    toString: NumberFn | StringFn | BooleanFn;
};
/**
 * Strictly convert a string to either a finite number or null.
 * ```
 * numberify('2 '); // returns 2
 * numberify('2a'); // returns null
 * ```
 */
declare function numberify(src: string): number | null;
/**
 * Strictly convert a number to either a finite number or null.
 * ```
 * numberify(Math.PI); // returns 3.141592653589793
 * numberify(NaN); // returns null
 * numberify(Infinity); // returns null
 * ```
 */
declare function numberify(src: number): number | null;
/**
 * Strictly convert a boolean to 1 (true) or 0 (false).
 */
declare function numberify(src: boolean): number | null;
/**
 * Strictly convert an object to either a finite number or null. An object is
 * convertible if it has a `valueOf()` or `toString()` method that returns
 * a finite number, a string of a number, or a boolean.
 * ```
 * var range = {min: 0, max: 5};
 * numberify(range); // returns null
 * range.valueOf = function() {return this.max-this.min;};
 * numberify(range); // returns 5
 * ```
 */
declare function numberify(src: object): number | null;
/**
 * Execute a function and strictly convert the returned value to
 * either a finite number or null.
 * ```
 * var PI = function() {return Math.PI;};
 * var ONE = function() {return '1';};
 * var TRUE = function() {return true;};
 * var NOW = function() {return new Date();};
 * numberify(PI); // returns 3.141592653589793
 * numberify(ONE); // returns 1
 * numberify(TRUE); // returns 1
 * numberify(NOW); // returns (new Date()).valueOf(), which is a number
 * ```
 */
declare function numberify(src: Function): number | null;
/**
 * Strictly convert a string to either a boolean or null.
 * ```
 * booleanify('1'); // returns true
 * booleanify('0'); // returns false
 * booleanify('2'); // returns null
 * ```
 */
declare function booleanify(src: string): boolean | null;
/**
 * Strictly convert a number to either a boolean or null.
 * ```
 * booleanify(1); // returns true
 * booleanify(0); // returns false
 * booleanify(NaN); // returns null
 * ```
 */
declare function booleanify(src: number): boolean | null;
/**
 * Strictly convert a boolean to, well, a boolean.
 */
declare function booleanify(src: boolean): boolean;
/**
 * Strictly convert an object to either a boolean or null. An object is
 * convertible if it has a `valueOf()` or `toString()` method that
 * returns 1, 0, "1", "0", or a boolean.
 * ```
 * var equal = {a: 1, b: 2};
 * booleanify(equal); // returns null
 * equal.valueOf = function() {return this.a==this.b;};
 * booleanify(equal); // returns true
 * ```
 */
declare function booleanify(src: object): boolean | null;
/**
 * Execute a function and strictly convert the returned value to
 * either a boolean or null.
 * ```
 * var TOSS_UP = function() {return (Math.random() < 0.5)?0:1;};
 * var ONE = function() {return '1';};
 * var TRUE = function() {return true;};
 * booleanify(TOSS_UP); // returns true or false randomly
 * booleanify(ONE); // returns true
 * booleanify(TRUE); // returns true
 * ```
 */
declare function booleanify(src: Function): boolean | null;
/**
 * A function with a return value that may be convertible to a string.
 * A function is convertible if its return value is a finite number,
 * a string, a boolean, or a [[StringableObj]].
 */
declare type StringableFn = ConvertibleFn;
/**
 * An object that may be convertible to a string. An object is convertible
 * if it has a valueOf() or toString() method that returns a finite number,
 * a string that is not "[object Object]", or a boolean.
 * Example:
 * ```
 * person = {
 *   fName: 'John',
 *   lName: 'Doe',
 *   valueOf: function() {return this.fName + ' ' + this.lName;}
 * };
 * ```
 */
declare type StringableObj = ConvertibleObj;
/**
 * A number, string, boolean, object, or function that may be convertible
 * to a number.
 */
declare type Stringable = number | string | boolean | StringableFn | StringableObj;
/** Evaluate a value and convert it to either a string or null */
declare function stringify(src: Stringable): string | null;
declare const _default: {
    numberify: typeof numberify;
    stringify: typeof stringify;
    booleanify: typeof booleanify;
};
export = _default;
