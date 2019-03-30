/*
 * Numberifier: a toolkit for evaluating any data (primitive, object,
 * function) and converting the data to a number or `null`.
 */

'use strict';

import { Primitive, Wrapper, AccessorFn } from 'typing';
import { SYMBOL_IS_SUPPORTED } from './primitify';

/**
 * The **`Numberifier`** object contains methods for evaluating any data to
 * a number or `null`.
 */
export class Numberifier {
    readonly [Symbol.toStringTag]: string = 'Numberifier';

   /**
    * Options for controlling primitive-to-number conversion.
    *
    * The "valueOf*Value*" options control handling of special cases. By default,
    * `Numberifier` would convert `NaN` and `undefined` to `null` instead of
    * the problematic [[NaN]]; and `Numberifier` would convert `null`,
    * `Infinity`, and blank string to `null`.
    *
    * The "ignore*Format*" options control handling of non-decimial numerical
    * notation. By default, `Numberifier` only recognizes decimal notation and
    * ignore binary, hexidecimal, octal, and exponential notations.
    *
    * Default:
    * ```JavaScript
    * numberifier.options = {
    *   valueOfNaN: null,
    *   valueOfNull: null,
    *   valueOfBlank: null,
    *   valueOfInfinity: null,
    *   ignoreBin: true,
    *   ignoreExp: true,
    *   ignoreHex: true,
    *   ignoreOctal: true,
    *   ignoreInfinity: true,
    *   noLeadingZero: false,
    * };
    * ```
    */
  options: {
    /**
     * Specify how `Numberifier` should evaluate `null`.
     *
     * Default: `null`
     *
     * ```JavaScript
     * const testValue = null;
     * const testFn = function() {return null};
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 0 (zero)
     * //
     * // Numberifier typecasting
     * numberifier.options.valueOfNull = null; // default
     * numberifier.number(testValue); // returns null
     * numberifier.numberify(testFn); // returns null
     * numberifier.options.valueOfNull = 0; // overriding the default
     * numberifier.number(testValue); // returns 0 (zero)
     * numberifier.numberify(testFn); // returns 0 (zero)
     * ```
     */
    valueOfNull: null|number;

    /**
     * Specify how `Numberifier` should evaluate `Infinity` and `-Infinity`.
     *
     * Default: `null`
     *
     * ```JavaScript
     * const INF = Infinity;
     * const NEG_INF = function() {return Number.NEGATIVE_INFINITY};
     * //
     * // Native JavaScript typecasting
     * Number(INF);  // returns Infinity
     * Number(-INF);  // returns -Infinity
     * //
     * // Numberifier typecasting
     * numberifier.options.valueOfInfinity = null; // default
     * numberifier.number(INF); // returns null
     * numberifier.numberify(NEG_INF); // returns null
     * numberifier.options.valueOfInfinity = Infinity; // overriding the default
     * numberifier.number(INF); // returns Infinity
     * numberifier.numberify(NEG_INF); // returns -Infinity
     * ```
     */
    valueOfInfinity: null|number;

    /**
     * Specify how `Numberifier` should evaluate `NaN` and `Undefined`.
     *
     * Default: `null`
     *
     * ```JavaScript
     * // Native JavaScript typecasting
     * Number(undefined);  // returns NaN
     * Number(NaN);  // returns NaN
     * //
     * // Numberifier typecasting
     * let testValue = undefined;
     * const testFn = function() {return NaN};
     * numberifier.options.valueOfNaN = null; // default
     * numberifier.number(testValue); // returns null
     * numberifier.numberify(testFn); // returns null
     * numberifier.options.valueOfNaN = 0; // overriding the default
     * numberifier.number(testValue); // returns 0 (zero)
     * numberifier.numberify(testFn); // returns 0 (zero)
     * ```
     * Setting this option to [[NaN]] is  **not recommended**.
     */
    valueOfNaN: null|number;

    /**
     * Specify how `Numberifier` should evaluate an empty string ("")
     * or a string containing only spaces ("`   `").
     *
     * Default: `null`
     *
     * ```JavaScript
     * const testValue = '';
     * const testFn = function() {return '   '};
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 0 (zero)
     * //
     * // Numberifier typecasting
     * numberifier.options.valueOfBlank = null; // default
     * numberifier.number(testValue); // returns null
     * numberifier.numberify(testFn); // returns null
     * numberifier.options.valueOfBlank = 0; // overriding the default
     * numberifier.number(testValue); // returns 0 (zero)
     * numberifier.numberify(testFn); // returns 0 (zero)
     * ```
     */
    valueOfBlank: null|number;

    /**
     * Specify if `Numberifier` should recognize the hexidecimal notation. If
     * `true`, `Numberifier` would evaluates a hexidecimal notation as undefined
     * and return the error value specified by the `valueOfNaN` option.
     *
     * Default: `true`
     *
     * ```JavaScript
     * // Glaring mistake
     * const testValue = "0XABCD";
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 43981
     * //
     * // Numberifier typecasting
     * numberifier.options.ignoreHex = true; // default
     * numberifier.number(testValue); // returns null
     * numberifier.options.ignoreHex = false; // overriding the default
     * numberifier.number(testValue); // returns 43981
     * ```
     */
    ignoreHex: boolean;

    /**
     * Specify if `Numberifier` should recognize the binary notation. If
     * `true`, `Numberifier` would evaluates a binary notation as undefined
     * and return the error value specified by the `valueOfNaN` option.
     *
     * Default: `true`
     *
     * ```JavaScript
     * // Typo of 0811?
     * const testValue = "0B11";
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 3
     * //
     * // Numberifier typecasting
     * numberifier.options.ignoreBin = true; // default
     * numberifier.number(testValue); // returns null
     * numberifier.options.ignoreBin = false; // overriding the default
     * numberifier.number(testValue); // returns 3
     * ```
     */
    ignoreBin: boolean;

    /**
     * Specify if `Numberifier` should recognize the octal notation. If
     * `true`, `Numberifier` would evaluates a octal notation as undefined
     * and return the error value specified by the `valueOfNaN` option.
     *
     * Default: `true`
     *
     * ```JavaScript
     * const testValue = "0o77";
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 63
     * //
     * // Numberifier typecasting
     * numberifier.options.ignoreOctal = true; // default
     * numberifier.number(testValue); // returns null
     * numberifier.options.ignoreOctal = false; // overriding the default
     * numberifier.number(testValue); // returns 63
     * ```
     */
    ignoreOctal: boolean;

    /**
     * Specify if `Numberifier` should recognize the
     * [exponential notation](https://en.wikipedia.org/wiki/Scientific_notation#E-notation). If
     * If `true`, `Numberifier` would evaluates an exponential notation as
     * undefined and return the error value specified by the `valueOfNaN` option.
     *
     * Default: `true`
     *
     * ```JavaScript
     * // 1 × 10⁵
     * const testValue = "1e5";
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 100,000
     * //
     * // Numberifier typecasting
     * numberifier.options.ignoreExp = true; // default
     * numberifier.number(testValue); // returns null
     * numberifier.options.ignoreExp = false; // overriding the default
     * numberifier.number(testValue); // returns 100,000
     * ```
     */
    ignoreExp: boolean;

    /**
     * Specify if `Numberifier` should recognize "`Infinity`" as valid string.
     * If `false`, `Numberifier` would evaluates "`Infinity`" and "`-Infinity`"
     * according to the value specified by the `valueOfInfinity` option.
     *
     * Default: `true`
     *
     * ```JavaScript
     * // Native JavaScript typecasting
     * Number('Infinity');  // returns Infinity
     * Number('-Infinity');  // returns -Infinity
     * Number('infinity');  // returns NaN
     * //
     * // Numberifier typecasting
     * numberifier.options.valueOfInfinity = null; // default
     * numberifier.options.ignoreInfinity = true; // default
     * numberifier.number('Infinity'); // returns null
     * numberifier.number('-Infinity'); // returns null
     * numberifier.options.valueOfInfinity = Infinity; // overriding the default
     * numberifier.options.ignoreInfinity = false; // overriding the default
     * numberifier.number('Infinity'); // returns Infinity
     * numberifier.number('-Infinity'); // returns -Infinity
     * ```
     */
    ignoreInfinity: boolean;

    /**
     * Specify if `Numberifier` should reject a decimal notation with superfluous
     * leading zero(s). If `true`, `Numberifier` would evaluates decimal notation
     * with superfluous leading zero(s) as undefined and return the error value
     * specified by the `valueOfNaN` option.
     *
     * Default: `false`
     *
     * ```JavaScript
     * const testValue = "0100";
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 100
     * //
     * // Numberifier typecasting
     * numberifier.numberOptions.noLeadingZero = false; // default
     * numberifier.number(testValue); // returns 100
     * numberifier.numberOptions.noLeadingZero = true; // overriding the default
     * numberifier.number(testValue); // returns null
     * ```
     */
    noLeadingZero: boolean;
  };

  /**
   * @ignore
   */
  constructor() {
    if (SYMBOL_IS_SUPPORTED ) this [Symbol.toStringTag] = 'Numberifier';

    this.options = {
      valueOfNaN: null,
      valueOfNull: null,
      valueOfBlank: null,
      valueOfInfinity: null,
      ignoreBin: true,
      ignoreExp: true,
      ignoreHex: true,
      ignoreOctal: true,
      ignoreInfinity: true,
      noLeadingZero: false,
    };
  }

  /**
   * Convert a boolean to zero or one.
   * ```JavaScript
   * numberifier.numberify(true); // returns 1
   * numberifier.numberify(false); // returns 0
   * ```
   */
  number(src: boolean): number|null;

  /**
   * Convert a number to either a number or `null`.
   * ```JavaScript
   * numberifier.numberify(Math.PI); // returns 3.141592653589793
   * numberifier.numberify(NaN); // returns null
   * numberifier.numberify(Infinity); // returns null
   * ```
   * Conversion of special cases are controlled by
   * * <code>[[Numberifier.options]].valueOfNaN</code>
   * * `Numberifier.options.valueOfInfinity`
   */
  number(src: number):number|null;

  /**
   * Convert a string to either a number or `null`.
   * ```JavaScript
   * conversely.numberify('2 '); // returns 2
   * conversely.numberify('2a'); // returns null
   * ```
   * Conversion of special cases are controlled by
   * * <code>[[Numberifier.options]].valueOfBlank</code>
   * * `Numberifier.options.noLeadingZero`
   * * `Numberifier.options.ignoreBin`
   * * `Numberifier.options.ignoreExp`
   * * `Numberifier.options.ignoreHex`
   * * `Numberifier.options.ignoreExp`
   * * `Numberifier.options.ignoreInfinity`
   */
  number(src: string): number|null;

  /**
   * Convert `null` to the value specified by
   * <code>[[Numberifier.options]].valueOfNull</code> (`null` by default).
   */
  number(src: null): number|null;

  /**
   * Convert `undefined` to the value specified by
   * <code>[[Numberifier.options]].valueOfNaN</code> (`null` by default).
   */
  number(src: undefined): number|null;

  number(v: Primitive): number|null {
    switch (typeof v) {
      case 'number':
        // Use isFinite() instead of Number.isFinite() to target GAS
        return isFinite(v) ? v : null;
      case 'string':
        // parseFloat() is not used because it can return inaccurate result
        // e.g. Number.parseFloat('1.2a') returns 1.2
        v = Number(v);
        return isNaN(v) ? null : v;
      case 'boolean':
        return v ? 1 : 0;
      default:
        return null;
    }
  }


  /**
   * Convert a primitive to either a number or `null`. Returns the same
   * result as [[Numberifier.number]].
   * ```JavaScript
   * numberifier.numberify('2 '); // returns 2
   * numberifier.numberify('2a'); // returns null
   * ```
   */
  numberify(src: Primitive): number|null;

  /**
   * Strictly convert an object to either a finite number or null. An object is
   * convertible if it has a `valueOf()` or `toString()` method that returns
   * a finite number, a string of a number, or a boolean.
   * ```
   * var range = {min: 0, max: 5};
   * numberifier.numberify(range); // returns null
   * range.valueOf = function() {return this.max-this.min;};
   * numberifier.numberify(range); // returns 5
   * ```
   */
  numberify(src: Wrapper): number|null;

  /**
   * Execute a function and strictly convert the returned value to
   * either a finite number or null.
   * ```
   * var PI = function() {return Math.PI;};
   * var ONE = function() {return '1';};
   * var TRUE = function() {return true;};
   * var NOW = function() {return new Date();};
   * numberifier.numberify(PI); // returns 3.141592653589793
   * numberifier.numberify(ONE); // returns 1
   * numberifier.numberify(TRUE); // returns 1
   * numberifier.numberify(NOW); // returns (new Date()).valueOf(), which is a number
   * ```
   */
  numberify(src: AccessorFn): number|null;

  numberify(src: Primitive|Wrapper|AccessorFn): number|null {
    if (typeof src === 'function') {
      src = (src as AccessorFn)();
    }

    if ((src === null) || (src === undefined)) return null;

    if (typeof src === 'object') {
      let objectValue: number|null = null;

      if (typeof src.valueOf === 'function') {
        objectValue = this.number(src.valueOf() as number);
      }

      if ((objectValue === null) && (typeof src.toString === 'function')) {
        objectValue = this.number(src.toString() as string);
      }

      return objectValue;
    }

    return this.number(src as number);
  }

}

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
const NaN: number = Number.NaN; // tslint:disable-line:variable-name


/*

stringOptions.valueOf.null
stringOptions.valueOf.undefined
stringOptions.valueOf.infinity
stringOptions.valueOf.NaN
stringOptions.valueOf.false
stringOptions.valueOf.true
stringOptions.trimString

booleanOptions.valueOf.null
booleanOptions.valueOf.undefined
booleanOptions.valueOf.infinity
booleanOptions.valueOf.NaN
booleanOptions.valueOf.blank
booleanOptions.oneTrueNumber
booleanOptions.truthyStrings
booleanOptions.falsyStrings
booleanOptions.trimString

const DEFAULT_CONVERSION_OPTIONS: ConversionOptions = { };
DEFAULT_CONVERSION_OPTIONS.convert = {};
DEFAULT_CONVERSION_OPTIONS.convert.NaN = {};
DEFAULT_CONVERSION_OPTIONS.convert.NaN.toNaN = false;
DEFAULT_CONVERSION_OPTIONS.convert.NaN.toFalse = false;
DEFAULT_CONVERSION_OPTIONS.convert.NaN.toBlank = false;
Object.freeze(DEFAULT_CONVERSION_OPTIONS);
*/

export const numberifier = new Numberifier();
