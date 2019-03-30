/**
 * Common variables
 */

'use strict';

import { Primitive, Wrapper, AccessorFn } from 'typing';

/** @ignore */
export const SYMBOL_IS_SUPPORTED: boolean =
  ((typeof Symbol === 'function') &&
   (typeof Symbol.toStringTag === 'symbol'));

 /**
  * Class definition so we can call
  * object[Symbol.toPrimitive] without compiler error.
  * @ignore
  */
 class ES6Object {
   [Symbol.hasInstance]?: (instance: object) => string;
   [Symbol.isConcatSpreadable]?: boolean;
   [Symbol.iterator]?: Function;
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

/**
 * Method to evaluate a source data of any type to a [[Primitive]].
 *
 * Returns the source data unchanged if it is already primitive.
 *
 * If the source data is a function, executes the function and evaluates
 * the returned data. If the returned data is another function, returns
 * `undefined`.
 *
 * ```JavaScript
 * primitify(function(){return 'hi'}); // 'hi'
 * primitify(function(){return true}); // true
 * ```
 *
 * If the source data (or the returned data of the previous function
 * execution) is an object, evaluates the object according to the preferred
 * data type. If the object can be evaluated successfully, returns the
 * evaluated result. Otherwise, returns `undefined`.
 *
 * ```JavaScript
 * const date = new Date(2019);
 * primitify(date,'string'); // "Tue, 01 Jan 2019 00:00:00 GMT"
 * primitify(date,'number'); // 1546300800000
 * ```
 *
 * @Param source
 *    Source data to be evaluated
 * @Param preferredType
 *    The preferred data type (`'string'` (default) or `'number'`) when
 *    when the source data is an object or a function returning an object.
 *    Note `primitify` will not coerce (typecast) the object to the
 *    preferred data type.
 */
export function primitify(
  source: Primitive|Wrapper|AccessorFn,
  preferredType?: 'string'|'number'
):Primitive {
  function isBNS(value: Primitive):boolean {
    const t = typeof value;
    if ((t==='boolean')||(t==='number')||(t==='string')) {
      return true;
    }
    return false;
  }

  if (typeof source === 'function') {
    try {
      source = (source as AccessorFn)();
    } catch(e) {
      return undefined; // Execution error!
    }
  }

  if (source === null) return null; // typeof null === 'object';

  switch (typeof source) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined': return source;
    case 'object': break;
    case 'symbol': return undefined; // Symbol cannot be typecasted
    default: return undefined; // A newer, shinier data type?
  }

  preferredType = (preferredType === 'number') ? 'number' : 'string';

  if (SYMBOL_IS_SUPPORTED) {
    const toPrimitive = (source as ES6Object)[Symbol.toPrimitive];
    if (typeof toPrimitive === 'function') {
      try {
        const result = toPrimitive(preferredType);
        // Only accept boolean, number, string, or null
        if (isBNS(result)||result===null) { return result; }
      } catch(e) {
        // Ignore error and try .valueOf() and .toString() instead
      }
    }
  }

  let objectValue: Primitive = undefined;  // tslint:disable-line:no-any
  let objectString: Primitive = undefined; // tslint:disable-line:no-any

  if (typeof source.valueOf === 'function') {
    try { objectValue = source.valueOf() as Primitive; } catch(e) {}
  }

  if ((typeof source.toString === 'function') && (source.toString !== Object.prototype.toString)) {
    try { objectString = source.toString(); } catch(e) {}
  }

  // .valueOf takes precedence unless string is the preferred type
  if (preferredType === 'string') {
    if (typeof objectString === 'string') return objectString;
    if (isBNS(objectValue)) return objectValue;
    if (isBNS(objectString)) return objectString;
  } else {
    if (isBNS(objectValue)) return objectValue;
    if (isBNS(objectString)) return objectString;
  }

  if ((objectString === null)||(objectValue === null)) {
    return null;
  }
  return undefined;
}
