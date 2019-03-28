/*
 * Options
 */

'use strict';

/**
 * Options for controlling the behavior of
 * [`Conversely.number()`](../classes/conversely.html#number) and
 * [`Conversely.numberify()`](../classes/conversely.html#number)
 */
interface NumberOptions {
  /**
   * Options for specifying how to handle special cases
   * (`null`, `undefined`, `NaN`, infinite number, and blank string).
   */
  valueOf: {
    /**
     * Specify what
     * [`number()`](../classes/conversely.html#number) and
     * [`numberify()`](../classes/conversely.html#number)
     * should return if the source data evaluates as `null`.
     * ```JavaScript
     * const testValue = null;
     * const testFn = function() {return null};
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns NaN
     * //
     * // Conversely typecasting
     * const convr = conversely;
     * convr.numberOptions.valueOf.null = null; // default
     * convr.number(testValue); // returns null
     * convr.numberify(testFn); // returns null
     * convr.numberOptions.valueOf.null = 0; // overriding the default
     * convr.number(testValue); // returns 0 (zero)
     * convr.numberify(testFn); // returns 0 (zero)
     * ```
     * Setting this option to `NaN` is
     * **[not recommended](../globals.html#not_a_number)**.
     */
    null: null|number;

    /**
     * Specify what
     * [`number()`](../classes/conversely.html#number) and
     * [`numberify()`](../classes/conversely.html#number)
     * should return if the source data evaluates as `undefined`.
     * ```JavaScript
     * var testValue;
     * const testFn = function() {};
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns NaN
     * //
     * // Conversely typecasting
     * const convr = conversely;
     * convr.numberOptions.valueOf.undefined = null; // default
     * convr.number(testValue); // returns null
     * convr.numberify(testFn); // returns null
     * convr.numberOptions.valueOf.undefined = 0; // overriding the default
     * convr.number(testValue); // returns 0 (zero)
     * convr.numberify(testFn); // returns 0 (zero)
     * ```
     * Setting this option to `NaN` is
     * **[not recommended](../globals.html#not_a_number)**.
     */
    undefined: null|number;

    /**
     * Specify what
     * [`number()`](../classes/conversely.html#number) and
     * [`numberify()`](../classes/conversely.html#number)
     * should return if the source data evaluates as
     * `Infinity` or `Number.NEGATIVE_INFINITY`
     * ```JavaScript
     * const INF = Infinity;
     * const NEG_INF = function() {return -INF};
     * //
     * // Native JavaScript typecasting
     * Number(INF);  // returns Infinity
     * Number(-INF);  // returns -Infinity
     * //
     * // Conversely typecasting
     * const convr = conversely;
     * convr.numberOptions.valueOf.Infinity = null; // default
     * convr.number(INF); // returns null
     * convr.numberify(NEG_INF); // returns null
     * convr.numberOptions.valueOf.Infinity = Infinity; // overriding the default
     * convr.number(INF); // returns Infinity
     * convr.numberify(NEG_INF); // returns -Infinity
     * ```
     */
    Infinity: null|number;

    /**
     * Specify what
     * [`number()`](../classes/conversely.html#number) and
     * [`numberify()`](../classes/conversely.html#number)
     * should return if the source data cannot be evaluated
     * and converted to a number.
     * ```JavaScript
     * const testValue = NaN;
     * const testFn = function() {return NaN};
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns NaN
     * //
     * // Conversely typecasting
     * const convr = conversely;
     * convr.numberOptions.valueOf.NaN = null; // default
     * convr.number(testValue); // returns null
     * convr.numberify(testFn); // returns null
     * convr.numberOptions.valueOf.NaN = 0; // overriding the default
     * convr.number(testValue); // returns 0 (zero)
     * convr.numberify(testFn); // returns 0 (zero)
     * ```
     * Setting this option to `NaN` is
     * **[not recommended](../globals.html#not_a_number)**.
     */
    NaN: null|number;

    /**
     * Specify what
     * [`number()`](../classes/conversely.html#number) and
     * [`numberify()`](../classes/conversely.html#number)
     * should return if the source data evaluates as a blank string.
     * ```JavaScript
     * const testValue = '';
     * const testFn = function() {return '   '};
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 0 (zero)
     * //
     * // Conversely typecasting
     * const convr = conversely;
     * convr.numberOptions.valueOf.blank = null; // default
     * convr.number(testValue); // returns null
     * convr.numberify(testFn); // returns null
     * convr.numberOptions.valueOf.blank = 0; // overriding the default
     * convr.number(testValue); // returns 0 (zero)
     * convr.numberify(testFn); // returns 0 (zero)
     * ```
     */
    blank: null|number;
  };
  /**
   * JavaScript recognizes some rather esoteric string representation of
   * number. These options allows for turning off the behavior.
   */
  recognize: {
    hex: boolean;
    /**
     * Specify if hexidecimal representation should be recognized. If `true`,
     * `number()` and `numberify()` would return the interpreted value. If
     *  `false`, `number()` and `numberify()` would interpret the source data
     * as not-a-number and return an error value specified by
     * `Conversely.numberOptions.valueOf.NaN` (`null` by default).
     * ```JavaScript
     * // Glaring mistake
     * const testValue = "0XABCD";
     * //
     * // Native JavaScript typecasting
     * Number(testValue);  // returns 43981
     * //
     * // Conversely typecasting
     * const convr = conversely;
     * convr.numberOptions.recognize.hex = false; // default
     * convr.number(testValue); // returns null
     * convr.numberOptions.recognize.hex = true; // overriding the default
     * convr.number(testValue); // returns 43981
     * ```
     */
    bin: boolean;
    octal: boolean;
    exp: boolean;
  };
  noLeadingZero: boolean;
}


/*

numberOptions.valueOf.null
numberOptions.valueOf.undefined (null|0|NaN)
numberOptions.valueOf.Infinity (null|0|NaN)
numberOptions.valueOf.NaN (null|0|NaN)
numberOptions.valueOf.blank (null|0|NaN)
numberOptions.trimString
numberOptions.recognize.infinity
numberOptions.recognize.hex
numberOptions.recognize.bin
numberOptions.recognize.octal
numberOptions.recognize.exp
numberOptions.noLeadingZero

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
