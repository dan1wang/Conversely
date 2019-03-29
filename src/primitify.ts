/**
 * Common variables
 */

'use strict';

import { Primitive, Wrapper, ES6Object } from 'typing';

/** @ignore */
export const SYMBOL_IS_SUPPORTED: boolean =
  ((typeof Symbol === 'function') &&
   (typeof Symbol.toStringTag === 'symbol'));

/**
 * Function to evaluate a source data to a [[Primitive]].
 *
 * If the source data is already primitive, return it unchanged.
 *
 * If the source data is a function, execute the function and evaluate
 * the returned data. If the returned data is another function, return
 * `undefined` instead of executing the second function to prevent
 * circular logic.
 *
 * If the source data (or the returned data of the previous function
 * execution) is an object, attempt to evaluate the object according to
 * the preferred data type.
 *
 * If the object can be evaluated successfully, return the evaluated
 * result. Otherwise, return `undefined`.
 *
 * @Param srcData Source data to be evaluated
 * @Param preferredType The preferred data type ('string' (default) or 'number').
 *                      when `srcData` is an object or a function returning
 *                      an object. Note this function will not coerce (typecast)
 *                      the object to the preferred data type.
 */
export function primitify(srcData: Wrapper, preferredType?: 'string'|'number'):Primitive {
  function isBNS(value):boolean {
    const t = typeof value;
    if ((t==='boolean')||(t==='number')||(t==='string')) {
      return true;
    }
    return false;
  }

  if (typeof srcData === 'function') {
    try {
      srcData = srcData();
    } catch(e) {
      return undefined; // Execution error!
    }
  }

  if (srcData === null) return null; // typeof null === 'object';

  switch (typeof srcData) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined': return srcData;
    case 'object': break;
    case 'symbol': return undefined; // Symbol cannot be typecasted
    default: return undefined; // A newer, shinier data type?
  }

  preferredType = (preferredType === 'number') ? 'number' : 'string';

  if (SYMBOL_IS_SUPPORTED) {
    const toPrimitive = (srcData as ES6Object)[Symbol.toPrimitive];
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

  if (typeof srcData.valueOf === 'function') {
    try { objectValue = srcData.valueOf(); } catch(e) {}
  }

  if ((typeof srcData.toString === 'function') && (srcData.toString !== Object.prototype.toString)) {
    try { objectString = srcData.toString(); } catch(e) {}
  }

  // .valueOf takes precedence unless string is the preferred type
  if (preferredType === 'string') {
    if (typeof objectString === 'string') return objectString;
    if isBNS(objectValue) return objectValue;
    if isBNS(objectString) return objectString;
  } else {
    if isBNS(objectValue) return objectValue;
    if isBNS(objectString) return objectString;
  }

  if ((objectString === null)||(objectValue === null)) {
    return null;
  }
  return undefined;
}
