import {expect, test as playwrightTest} from '@playwright/test';

export const describe = playwrightTest.describe;
export const test = playwrightTest;

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}
