'use strict';

import { Primitive, Wrapper, WrapperFn } from 'typing';
// import { SYMBOL_IS_SUPPORTED } from './common';

/**
 * Main object
 */
export class Conversely {
  // constructor() {}

  /** Version number in [semver](https://semver.org/) format */
  static version = '0.1.0';

  /**
   * Evaluate a primitive and convert it to either a boolean or null.
   * Return `true`
   * if the value evaluates to 1, "1", or true. Conversely, return `false`
   * if the value evaluates to 0, "0", or false. Otherwise, return `null`
   * (either true or false)..
   */
  boolean(v: Primitive): boolean|null {
    switch (v) {
      case '1':
      case 1:
      case true:
        return true;
      case '0':
      case 0:
      case false:
        return false;
      default:
        return null;
    }
  }

  /**
   * Strictly convert a string to either a boolean or null.
   * ```JavaScript
   * booleanify('1'); // returns true
   * booleanify('0'); // returns false
   * booleanify('2'); // returns null
   * ```
   */
  booleanify(src: string): boolean|null;

  /**
   * Strictly convert a number to either a boolean or null.
   * ```JavaScript
   * booleanify(1); // returns true
   * booleanify(0); // returns false
   * booleanify(NaN); // returns null
   * ```
   */
  booleanify(src: number): boolean|null;

  /**
   * Strictly convert a boolean to, well, a boolean.
   */
  booleanify(src: boolean): boolean;

  /**
   * Strictly convert an object to either a boolean or null. An object is
   * convertible if it has a `valueOf()` or `toString()` method that
   * returns 1, 0, "1", "0", or a boolean.
   * ```JavaScript
   * var equal = {a: 1, b: 2};
   * booleanify(equal); // returns null
   * equal.valueOf = function() {return this.a==this.b;};
   * booleanify(equal); // returns true
   * ```
   */
  booleanify(src: Wrapper): boolean|null;

  /**
   * Execute a function and strictly convert the returned value to
   * either a boolean or null.
   * ```JavaScript
   * var TOSS_UP = function() {return (Math.random() < 0.5)?0:1;};
   * var ONE = function() {return '1';};
   * var TRUE = function() {return true;};
   * booleanify(TOSS_UP); // returns true or false randomly
   * booleanify(ONE); // returns true
   * booleanify(TRUE); // returns true
   * ```
   */
  booleanify(src: WrapperFn): boolean|null;

  booleanify(src: Primitive|Wrapper|WrapperFn): boolean|null {
    if (typeof src === 'function') { src = (src as WrapperFn)(); }

    if ((src === null) || (src === undefined)) return null;

    if (typeof src === 'object') {
      let objectValue: boolean|null = null;

      if (typeof src.valueOf === 'function') {
        objectValue = this.boolean(src.valueOf() as Primitive);
      }

      if ((objectValue === null) && (typeof src.toString === 'function')) {
        objectValue = this.boolean(src.toString());
      }

      return objectValue;
    }

    return this.boolean(src as boolean);
  }

  stringify(src: Primitive|Wrapper|WrapperFn): string|null {
    function __stringify(v: any): string|null {  // tslint:disable-line:no-any
      switch (typeof v) {
        case 'number':
          // Do not convert Infinity or NaN
          return isFinite(v) ? String(v) : null;
        case 'string':
          return v;
        case 'boolean':
          return v ? '1' : '0';
        default:
          return null;
      }
    }

    if (typeof src === 'function') { src = (src as WrapperFn)(); }

    if ((src === null) || (src === undefined)) return null;

    if (typeof src === 'object') {
      let objectValue: any = null;   // tslint:disable-line:no-any
      let objectString: any = null;  // tslint:disable-line:no-any

      if (typeof src.valueOf === 'function') {
        objectValue = src.valueOf();
      }

      if (typeof src.toString === 'function') {
        objectString = src.toString();
        if (objectString === '[object Object]') objectString = null;
      }

      // valueOf() takes precedence unless stringify() is a string
      if (typeof objectString === 'string') return objectString;
      if ((objectValue !== null) && (objectValue !== undefined)) {
        return __stringify(objectValue);
      }
      return __stringify(objectString);
    }

    return __stringify(src);
  }

  /** Conversion options */
  // options: ConversionOptions;
}

export const conversely = new Conversely();
