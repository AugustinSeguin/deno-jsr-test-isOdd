import { describe, expect, run, test } from "../mod.ts";
import { isEven, isOdd } from "../src/isOdd.ts";

describe("Arithmetic Operations", () => {
  test("should add two numbers correctly", () => {
    const result = 2 + 3;
    expect(result).toBe(5);
  });

  test("should multiply two numbers correctly", () => {
    const result = 4 * 4;
    expect(result).toBe(16);
  });
});

describe("String Operations", () => {
  test("should concatenate strings", () => {
    const str = "Hello " + "World";
    expect(str).toBe("Hello World");
  });
});

describe("isOdd/isEven", () => {
  test("isEven returns true for even integers", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  test("isOdd returns true for odd integers", () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(-3)).toBe(true);
  });

  test("isEven returns false for odd integers", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(-3)).toBe(false);
  });

  test("isOdd returns false for even integers", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(-4)).toBe(false);
  });

  test("non-integer throws TypeError", () => {
    const badValues: unknown[] = [
      Number.NaN,
      Infinity,
      -Infinity,
      1.5,
      "3",
      null,
      undefined,
      {},
    ];
    for (const v of badValues) {
      let threw = false;
      try {
        // deno-lint-ignore no-explicit-any
        (isOdd as any)(v);
      } catch (error_) {
        // Ensure the error is captured for lint satisfaction
        if (!(error_ instanceof Error)) {
          // Normalize non-Error throws
          // deno-lint-ignore no-unused-vars
          const _ignored = String(error_);
        }
        threw = true;
      }
      expect(threw).toBe(true);
    }
  });
});

await run();
