/*
 * Library for evaluating any data (primitive, object, or function) to
 * a number.
 */

'use strict';

import {Primitive, Wrapper, AccessorFn} from 'typing';
import {SYMBOL_IS_SUPPORTED, primitify} from './primitify';

/**
 * Options for setting data-to-number evaluation rules on
 * construction of the <code>[[Numberifier]]</code> object.
 */
type NumberifierOptions = {
  valueOfNaN?: null|undefined|number,
  valueOfUndefined?: null|undefined|number,
  valueOfNull?: null|undefined|number,
  valueOfBlank?: null|undefined|number,
  valueOfInfinity?: null|undefined|number,
  ignoreBin?: boolean,
  ignoreExp?: boolean,
  ignoreHex?: boolean,
  ignoreOctal?: boolean,
  ignoreInfinity?: boolean,
  noLeadingZero?: boolean,
  [key: string]: any  // tslint:disable-line:no-any
};

/**
 * The **`Numberifier`** object contains methods for evaluating any data to
 * a number.
 *
 * By default, `Numberifier` would evaluate `NaN`, `undefined`, `null`,
 * `Infinity`, and blank string to `undefined` instead of `0` or the
 * problematic <code>[[NaN]]</code>.
 *
 * By default, `Numberifier` only recognizes decimal notations and
 * ignores binary, hexidecimal, octal, and exponential notations.
 */
export class Numberifier {
  /** @ignore */
  [Symbol.toStringTag]?: string;

  /** @ignore */
  static reHex = /0[xX][0-9a-fA-F]+/;

  /** @ignore */
  static reBin = /0[bB][01]+/;

  /** @ignore */
  static reOctal = /0[oO][0-7]+/;

  /** @ignore */
  static reExp = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)/;

   /**
    * Specifies how `Numberifier` should evaluate `undefined`.
    *
    * Default: `undefined`
    *
    * ```JavaScript
    * const testValue = null;
    * const testFn = function() {return null};
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 0 (zero)
    * //
    * // Numberifier typecasting
    * numberifier.options.valueOfNull = undefined; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.numberify(testFn); // Returns undefined
    * numberifier.options.valueOfNull = 0; // overriding the default
    * numberifier.number(testValue); // Returns 0 (zero)
    * numberifier.numberify(testFn); // Returns 0 (zero)
    * ```
    *
    * Note JavaScript natively treats `undefined` and `null` differently:
    * ```JavaScript
    * Number(null); // Returns 0
    * Number(undefined); // Returns NaN
    * ```
    *
    * By default, `Numberifier` treats both `undefined` and `null` as
    * _indetermined_ and returns `undefined`.
    *
    * Setting this option to [[NaN]] is **not recommended**.
    */
   valueOfNull: null|undefined|number = undefined;

   /**
    * Specifies how `Numberifier` should evaluate `Infinity` and `-Infinity`.
    *
    * Default: `undefined`
    *
    * ```JavaScript
    * const INF = Infinity;
    * const NEG_INF = function() {return Number.NEGATIVE_INFINITY};
    * //
    * // Native JavaScript typecasting
    * Number(INF);  // Returns Infinity
    * Number(-INF);  // Returns -Infinity
    * //
    * // Numberifier typecasting
    * numberifier.options.valueOfInfinity = undefined; // default
    * numberifier.number(INF); // Returns undefined
    * numberifier.numberify(NEG_INF); // Returns undefined
    * numberifier.options.valueOfInfinity = Infinity; // overriding the default
    * numberifier.number(INF); // Returns Infinity
    * numberifier.numberify(NEG_INF); // Returns -Infinity
    * ```
    */
   valueOfInfinity: null | undefined | number = undefined;

   /**
    * Specifies how `Numberifier` should evaluate `NaN`.
    *
    * Default: `undefined`
    *
    * ```JavaScript
    * // Native JavaScript typecasting
    * Number(NaN);  // Returns NaN
    * //
    * // Numberifier typecasting
    * let testValue = NaN;
    * const testFn = function() {return NaN};
    * numberifier.options.valueOfNaN = undefined; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.numberify(testFn); // Returns undefined
    * numberifier.options.valueOfNaN = 0; // overriding the default
    * numberifier.number(testValue); // Returns 0 (zero)
    * numberifier.numberify(testFn); // Returns 0 (zero)
    * ```
    * Setting this option to [[NaN]] is **not recommended**.
    */
   valueOfNaN: null | undefined | number = undefined;

   /**
    * Specifies what `Numberifier` should return if the source data is
    * `undefined` or if the source data is a string, function, or object
    * that cannot be evaluated to a number.
    *
    * Default: `undefined`
    *
    * ```JavaScript
    * // Native JavaScript typecasting
    * Number(undefined);  // Returns NaN
    * //
    * // Numberifier typecasting
    * let testValue = undefined;
    * const testFn = function() {return undefined};
    * numberifier.options.valueOfUndefined = undefined; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.numberify(testFn); // Returns undefined
    * numberifier.options.valueOfUndefined = 0; // overriding the default
    * numberifier.number(testValue); // Returns 0 (zero)
    * numberifier.numberify(testFn); // Returns 0 (zero)
    * ```
    *
    * Note JavaScript natively treats `undefined` and `null` differently:
    * ```JavaScript
    * Number(null); // Returns 0
    * Number(undefined); // Returns NaN
    * ```
    *
    * By default, `Numberifier` treats both `undefined` and `null` as
    * _indetermined_ and returns `undefined`.
    *
    * Setting this option to [[NaN]] is **not recommended**.
    */
   valueOfUndefined: null | undefined | number = undefined;

   /**
    * Specifies how `Numberifier` should evaluate an empty string (`""`)
    * or a string containing only spaces (`"   "`).
    *
    * Default: `undefined`
    *
    * ```JavaScript
    * const testValue = '';
    * const testFn = function() {return '   '};
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 0 (zero)
    * //
    * // Numberifier typecasting
    * numberifier.options.valueOfBlank = undefined; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.numberify(testFn); // Returns undefined
    * numberifier.options.valueOfBlank = 0; // overriding the default
    * numberifier.number(testValue); // Returns 0 (zero)
    * numberifier.numberify(testFn); // Returns 0 (zero)
    * ```
    */
   valueOfBlank: null | undefined | number = undefined;

   /**
    * Specifies if `Numberifier` should ignore the hexidecimal notation. If
    * `true` (default), `Numberifier` would evaluate a hexidecimal notation as
    * _indetermined_ and return the error value specified by the `valueOfNaN`
    * option.
    *
    * Default: `true`
    *
    * ```JavaScript
    * // Glaring mistake
    * const testValue = "0XABCD";
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 43981
    * //
    * // Numberifier typecasting
    * numberifier.options.ignoreHex = true; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.options.ignoreHex = false; // overriding the default
    * numberifier.number(testValue); // Returns 43981
    * ```
    */
   readonly ignoreHex: boolean = true;

   /**
    * Specifies if `Numberifier` should ignore the binary notation. If
    * `true` (default), `Numberifier` would evaluate a binary notation as
    * _indetermined_ and return the error value specified by the `valueOfNaN`
    * option.
    *
    * Default: `true`
    *
    * ```JavaScript
    * // Typo of 0811?
    * const testValue = "0B11";
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 3
    * //
    * // Numberifier typecasting
    * numberifier.options.ignoreBin = true; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.options.ignoreBin = false; // overriding the default
    * numberifier.number(testValue); // Returns 3
    * ```
    */
   readonly ignoreBin: boolean = true;

   /**
    * Specifies if `Numberifier` should ignore the octal notation. If
    * `true` (default), `Numberifier` would evaluate a octal notation as
    * _indetermined_ and return the error value specified by the `valueOfNaN`
    * option.
    *
    * Default: `true`
    *
    * ```JavaScript
    * const testValue = "0o77";
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 63
    * //
    * // Numberifier typecasting
    * numberifier.options.ignoreOctal = true; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.options.ignoreOctal = false; // overriding the default
    * numberifier.number(testValue); // Returns 63
    * ```
    */
   readonly ignoreOctal: boolean = true;

   /**
    * Specifies if `Numberifier` should ignore the
    * [exponential
    * notation](https://en.wikipedia.org/wiki/Scientific_notation#E-notation).
    * If If `true` (default), `Numberifier` would evaluate an exponential
    * notation as _indetermined_ and return the error value specified by the
    * `valueOfNaN` option.
    *
    * Default: `true`
    *
    * ```JavaScript
    * // 1 × 10⁵
    * const testValue = "1e5";
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 100,000
    * //
    * // Numberifier typecasting
    * numberifier.options.ignoreExp = true; // default
    * numberifier.number(testValue); // Returns undefined
    * numberifier.options.ignoreExp = false; // overriding the default
    * numberifier.number(testValue); // Returns 100,000
    * ```
    */
   readonly ignoreExp: boolean = true;

   /**
    * Specifies if `Numberifier` should ignore `"Infinity"` or
    * `"-Infinity"`. If `true` (default), `Numberifier` would evaluate
    * the string as _indetermined_ and return the error value specified by the
    * `valueOfNaN` option. If `false`, `Numberifier` would evaluate the string
    * according to the value specified by the `valueOfInfinity` option.
    *
    * Default: `true`
    *
    * ```JavaScript
    * // Native JavaScript typecasting
    * Number('Infinity');  // Returns Infinity
    * Number('-Infinity');  // Returns -Infinity
    * Number('infinity');  // Returns NaN
    * //
    * // Numberifier typecasting
    * numberifier.options.valueOfInfinity = undefined; // default
    * numberifier.options.ignoreInfinity = true; // default
    * numberifier.number('Infinity'); // Returns undefined
    * numberifier.number('-Infinity'); // Returns undefined
    * numberifier.options.valueOfInfinity = Infinity; // overriding the default
    * numberifier.options.ignoreInfinity = false; // overriding the default
    * numberifier.number('Infinity'); // Returns Infinity
    * numberifier.number('-Infinity'); // Returns -Infinity
    * ```
    */
   readonly ignoreInfinity: boolean = true;

   /**
    * Specifies if `Numberifier` should reject a decimal notation with
    * superfluous leading zero(s). If `true`, `Numberifier` would evaluate
    * decimal notation with superfluous leading zero(s) as _indetermined_ and
    * return the error value specified by the `valueOfNaN` option.
    *
    * Default: `false`
    *
    * ```JavaScript
    * const testValue = "0100";
    * //
    * // Native JavaScript typecasting
    * Number(testValue);  // Returns 100
    * //
    * // Numberifier typecasting
    * numberifier.numberOptions.noLeadingZero = false; // default
    * numberifier.number(testValue); // Returns 100
    * numberifier.numberOptions.noLeadingZero = true; // overriding the default
    * numberifier.number(testValue); // Returns undefined
    * ```
    */
   readonly noLeadingZero: boolean = false;

   /** @ignore */
   [key: string]: any;  // tslint:disable-line:no-any

  /**
   * Creates a new `Numberifier` object.
   * @Param options
   *    Options to set data-to-number evaluation rules of the
   *    `Numberifier` object. The rules cannot not be modified afterward.
   */
  constructor(options?: NumberifierOptions) {
    const THIS = this;

    if (SYMBOL_IS_SUPPORTED) this[Symbol.toStringTag] = 'Numberifier';

    function setOptionValue(key: string) {
      // const o = options as NumberifierOptions;
      // const propCheck = Object.prototype.hasOwnProperty;
      if (Object.prototype.hasOwnProperty.call(options as NumberifierOptions, key)) {
        const p = (options as NumberifierOptions)[key];
        if ((typeof p === 'number')||(p === null)||(p === undefined)) {
          THIS[key] = p;
        }
      }
    }

    function setOptionCtrl(key: string) {
      const p = (options as NumberifierOptions)[key];
      if ((p === 0)||(p === false)) {
        THIS[key] = false;
      } else if ((p === 1)||(p === true)) {
        THIS[key] = true;
      }
    }

    if (typeof options === 'undefined') {
      setOptionValue('valueOfNaN');
      setOptionValue('valueOfUndefined');
      setOptionValue('valueOfBlank');
      setOptionValue('valueOfInfinity');
      setOptionCtrl('ignoreBin');
      setOptionCtrl('ignoreExp');
      setOptionCtrl('ignoreHex');
      setOptionCtrl('ignoreOctal');
      setOptionCtrl('ignoreInfinity');
      setOptionCtrl('noLeadingZero');
    }

    Object.freeze(this);
  }

  /**
   * Evaluates a boolean to zero or one.
   * ```JavaScript
   * numberifier.numberify(true); // Returns 1
   * numberifier.numberify(false); // Returns 0
   * ```
   */
  number(src: boolean): 1|0;

  /**
   * Evaluates a number to a number.
   * ```JavaScript
   * numberifier.numberify(Math.PI); // Returns 3.141592653589793
   * numberifier.numberify(NaN); // Returns undefined
   * numberifier.numberify(Infinity); // Returns undefined
   * ```
   * Evaluation of special cases are controlled by
   * * <code>[[Numberifier.options]].valueOfNaN</code>
   * * `Numberifier.options.valueOfInfinity`
   */
  number(src: number): number|null|undefined;

  /**
   * Evaluates a string to a number.
   * ```JavaScript
   * numberifier.umberify('2 '); // Returns 2
   * numberifier.numberify('2a'); // Returns undefined
   * ```
   * Evaluation of special cases are controlled by
   * * <code>[[Numberifier.options]].valueOfBlank</code>
   * * `Numberifier.options.noLeadingZero`
   * * `Numberifier.options.ignoreBin`
   * * `Numberifier.options.ignoreExp`
   * * `Numberifier.options.ignoreHex`
   * * `Numberifier.options.ignoreExp`
   * * `Numberifier.options.ignoreInfinity`
   */
  number(src: string): number|null|undefined;

  /**
   * Evaluates `null` to the value specified by
   * <code>[[Numberifier.options]].valueOfNull</code>
   * (`undefined` by default).
   */
  number(src: null): number|null|undefined;

  /**
   * Evaluates `undefined` to the value specified by
   * <code>[[Numberifier.options]].valueOfUndefined</code>
   * (`undefined` by default).
   */
  number(src: undefined): number|null|undefined;

  number(src: Primitive): number|null|undefined {
    const THIS = this;
    const NAN_VALUE = this.options.valueOfNaN;
    const INF_VALUE = this.options.valueOfInfinity;

    function evalNumber(src: number): number|null|undefined {
      if (isFinite(src)) return src;

      if (src !== src) return NAN_VALUE;

      if (src === Number.POSITIVE_INFINITY) {
        return INF_VALUE;
      } else /* -Infinity */ {
        // Something to think about: +0 and -0 aren't exactly the same.
        return (typeof INF_VALUE === 'number') ? -INF_VALUE : INF_VALUE;
      }
    }

    function evalString(src: string): number|null|undefined {
      src = src.trim();
      if (Numberifier.reHex.test(src) && (THIS.options.ignoreHex)) {
        return NAN_VALUE;
      }
      if (Numberifier.reBin.test(src) && (THIS.options.ignoreBin)) {
        return NAN_VALUE;
      }
      if (Numberifier.reOctal.test(src) && (THIS.options.ignoreOctal)) {
        return NAN_VALUE;
      }
      if ((src === 'Infinity') || (src === '-Infinity')) {
        if (THIS.options.ignoreInfinity) {
          return NAN_VALUE;
        } else {
          if (src === 'Infinity') {
            return INF_VALUE;
          } else {
            return (typeof INF_VALUE === 'number') ? -INF_VALUE : INF_VALUE;
          }
        }
      }
      return Number(src);
    }

    switch (typeof src) {
      case 'number':
        return evalNumber(src);
      case 'string':
        return evalString(src);
      case 'boolean':
        return src ? 1 : 0;
      default:
        return null;
    }
  }


  /**
   * Evaluates a primitive to either a number or `undefined`. Returns the same
   * result as [[Numberifier.number]].
   * ```JavaScript
   * numberifier.numberify('2 '); // Returns 2
   * numberifier.numberify('2a'); // Returns undefined
   * ```
   */
  numberify(src: Primitive): number|null|undefined;

  /**
   * Evaluates an object to either a finite number or null. An object is
   * evaluable if it has a `valueOf()` or `toString()` method that returns
   * a finite number, a string of a number, or a boolean.
   * ```
   * var range = {min: 0, max: 5};
   * numberifier.numberify(range); // Returns undefined
   * range.valueOf = function() {return this.max-this.min;};
   * numberifier.numberify(range); // Returns 5
   * ```
   */
  numberify(src: Wrapper): number|null|undefined;

  /**
   * Execute a function and evaluate the returned value to
   * either a finite number or null.
   * ```
   * var PI = function() {return Math.PI;};
   * var ONE = function() {return '1';};
   * var TRUE = function() {return true;};
   * var NOW = function() {return new Date();};
   * numberifier.numberify(PI); // Returns 3.141592653589793
   * numberifier.numberify(ONE); // Returns 1
   * numberifier.numberify(TRUE); // Returns 1
   * numberifier.numberify(NOW); // Returns (new Date()).valueOf(), which is a
   * number
   * ```
   */
  numberify(src: AccessorFn): number|null|undefined;

  numberify(src: Primitive|Wrapper|AccessorFn): number|null|undefined {
    const val = primitify(src, 'number') as number;
    return this.number( val );
  }
}

/**
 * When typecasting a data to a number and an error is encountered,
 * JavaScript would natively return `NaN`, which confusingly is
 * a "number" meaning "not a number":
 *
 * ```JavaScript
 * var test = Number('?'); // Returns NaN (not-a-number)
 * typeof test; // Returns "number"
 * ```
 *
 * `NaN` has special properties that can lead to unexpected results:
 * ```JavaScript
 * test = Number('?');
 *
 * // Regular comparison logic doesn't work on NaN
 * test > 0; // Returns false
 * test < 0; // Returns false
 * test == NaN; // Returns false
 * test === NaN; // Returns false
 *
 * // Special syntax is needed to check for NaN
 * isNaN(test); // Returns true
 * Number.isNaN(test); // Returns true (not supported by IE/GAS)
 * test !== test; // Returns true
 * ```
 *
 * By default, [[Numberifier]] evaluates `NaN` and `undefined` to `undefined`
 * to simplify downstream error checking. Overriding this behavior is
 * possible but **not recommended**.
 *
 */
declare const NaN: number;  // tslint:disable-line:variable-name


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
