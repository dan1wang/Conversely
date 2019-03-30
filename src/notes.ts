/**
 * TypeDoc hack: put warning message about uses of NaN
 */

/**
 * When typecasting a data to a number and an error is encountered,
 * JavaScript would return `NaN` by default. `NaN` means "not a number"
 * but confusingly is also a `number`:
 * ```JavaScript
 * Number('not a number'); // returns NaN, so it's not a number.
 * typeof NaN; // returns "number", so it's a number.
 * ```
 *
 * `NaN` has special properties that can lead to unexpected results:
 * ```JavaScript
 * NaN > 0; // returns false
 * NaN < 0; // returns false
 * NaN == NaN; // returns false
 * NaN === NaN; // returns false
 * ```
 *
 * `NaN` cannot be compared and requires special checking:
 * ```JavaScript
 * n = Number('not a number');
 * isNaN(n); // returns true
 * Number.isNaN(n); // returns true (not supported by IE/GAS)
 * n !== n; // returns true
 * ```
 *
 * By default,
 * [`number()`](classes/conversely.html#number) and
 * [`numberify()`](classes/conversely.html#number)
 * converts `NaN` to `null` to simplify downstream error checking.
 * Overriding this behavior is possible but **not recommended**.
 *
 */
export const NOT_A_NUMBER = NaN;
