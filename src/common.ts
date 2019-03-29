/**
 * Common variables
 */

import { Primitive, Wrapper, ES6Object } from 'typing';

// type PrimitiveFn = {(hint: string): Primitive|undefined};

export const SYMBOL_IS_SUPPORTED: boolean =
  ((typeof Symbol === 'function') &&
   (typeof Symbol.toStringTag === 'symbol'));

export function primitify(srcObj: Wrapper, preferredType?: string):Primitive {
  switch (preferredType) {
    case 'string': break;
    case 'number': break;
    case 'boolean': break;
    default: preferredType = 'string';
  }

  if (typeof srcObj !== 'object') return null;

  if (SYMBOL_IS_SUPPORTED) {
    const fn = (srcObj as ES6Object)[Symbol.toPrimitive];
    if (typeof fn === 'function') {
      try {
        return fn((preferredType !== 'boolean') ? preferredType : 'default');
      } catch {
        // ignore error
      }
    }
  }

  let objectValue: any = null;   // tslint:disable-line:no-any
  let objectString: any = null;  // tslint:disable-line:no-any

  if (typeof srcObj.valueOf === 'function') {
    try { objectValue = srcObj.valueOf(); } catch {}
  }

  if ( (typeof srcObj.toString === 'function') && (srcObj.toString !== Object.prototype.toString)) {
    try { objectString = srcObj.toString(); } catch {}
  }

  if (preferredType === 'string') {
    if (typeof objectString === 'string') return objectString;
    if (typeof objectValue !== 'object')  return objectValue;
  } else {
    if (typeof objectValue !== 'object')  return objectValue;
    if (typeof objectString === 'string') return objectString;
  }
  return undefined;
}
