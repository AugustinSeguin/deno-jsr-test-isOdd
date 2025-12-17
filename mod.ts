/**
 * Mini test framework for Deno with describe/test/expect/run.
 *
 * Exports:
 * - describe: Define a test suite.
 * - test: Define a test case within the current suite.
 * - expect: Simple assertions API (toBe).
 * - run: Execute all registered suites and tests, prints a summary and exits with status code.
 *
 * @example
 * ```ts
 * import { describe, test, expect, run } from "jsr:@augustinseg/isodd-test";
 *
 * describe("Arithmetic", () => {
 *   test("adds", () => {
 *     expect(2 + 3).toBe(5);
 *   });
 * });
 *
 * await run();
 * ```
 *
 * @module
 */

export type TestFn = () => void | Promise<void>;

export interface TestCase {
  name: string;
  fn: TestFn;
}

export interface Suite {
  name: string;
  tests: TestCase[];
}

const suites: Suite[] = [];
const suiteStack: Suite[] = [];

/**
 * Define a group of related tests.
 *
 * @param name Name of the test suite.
 * @param fn Callback that registers tests via `test(...)`.
 */
export function describe(name: string, fn: () => void): void {
  const suite: Suite = { name, tests: [] };
  suites.push(suite);
  suiteStack.push(suite);
  try {
    fn();
  } finally {
    suiteStack.pop();
  }
}

/**
 * Register a single test case in the current suite.
 *
 * @param name Name of the test case.
 * @param fn Test function, may be async.
 */
export function test(name: string, fn: TestFn): void {
  const current = suiteStack.at(-1);
  if (!current) {
    throw new Error("test() must be called inside a describe() block");
  }
  current.tests.push({ name, fn });
}

/**
 * Assertion builder for a given actual value.
 *
 * Example:
 * expect(2 + 3).toBe(5)
 */
export interface Expectation<T> {
  /**
   * Assert strict equality using `Object.is`.
   * @param expected The expected value.
   */
  toBe(expected: T): void;
}

export function expect<T>(actual: T): Expectation<T> {
  return {
    toBe(expected: T): void {
      if (!Object.is(actual, expected)) {
        throw new Error(`Expected ${String(actual)} to be ${String(expected)}`);
      }
    },
  };
}

/**
 * Execute all suites and tests, printing a minimal report.
 * Exits the Deno process with code 0 on success or 1 on failure.
 */
export async function run(): Promise<void> {
  let passed = 0;
  let failed = 0;

  for (const suite of suites) {
    console.log(`\nSuite: ${suite.name}`);
    for (const t of suite.tests) {
      try {
        await t.fn();
        passed++;
        console.log(`  ✓ ${t.name}`);
      } catch (err) {
        failed++;
        console.error(`  ✗ ${t.name}`);
        console.error(`${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  const total = passed + failed;
  console.log(`\nSummary: ${passed}/${total} passed, ${failed} failed.`);
  if (failed > 0) {
    // Deno specific: fail the process for CI
    // deno-lint-ignore no-explicit-any
    (globalThis as any).Deno?.exit?.(1);
  }
}

export { assertIntegerNumber, isEven, isOdd } from "./src/isOdd.ts";
