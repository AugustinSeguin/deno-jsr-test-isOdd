/**
 * Assert that a value is a finite integer number.
 * Throws a TypeError if the value is not a finite integer.
 *
 * @param value The value to validate.
 */
export function assertIntegerNumber(value: unknown): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    !Number.isInteger(value)
    /**
     * isOdd/isEven utilities with strict integer validation.
     *
     * Exports:
     * - assertIntegerNumber: runtime guard that ensures a finite integer number.
     * - isEven: returns true for even integers, false otherwise.
     * - isOdd: returns true for odd integers, false otherwise.
     *
     * Example:
     * ```ts
     * import { isOdd, isEven } from "jsr:@augustinseg/isodd-test/isOdd";
     *
     * isEven(2); // true
     * isOdd(3);  // true
     *
     * // throws TypeError (not an integer)
     * isOdd(1.5);
     * ```
     */
  ) {
    throw new TypeError("Expected a finite integer number");
  }
}

/**
 * Determine whether a number is even.
 *
 * Returns true if the provided value is an even integer, otherwise false.
 * Throws a TypeError when the input is not a finite integer.
 *
 * @param n Integer number to check.
 */
export function isEven(n: unknown): boolean {
  assertIntegerNumber(n);
  return n % 2 === 0;
}

/**
 * Determine whether a number is odd.
 *
 * Returns true if the provided value is an odd integer, otherwise false.
 * Throws a TypeError when the input is not a finite integer.
 *
 * @param n Integer number to check.
 */
export function isOdd(n: unknown): boolean {
  assertIntegerNumber(n);
  return Math.abs(n % 2) === 1;
}
