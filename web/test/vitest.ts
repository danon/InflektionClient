import {expect} from "vitest";

export {describe, beforeEach, test} from "vitest";

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}

export function assertThrows(block: () => void): void {
  try {
    block();
    expect.fail('Failed to assert block threw an error.');
  } catch (error) {
  }
}
