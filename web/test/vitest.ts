import {expect} from "vitest";

export {describe, beforeEach, test} from "vitest";

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}
