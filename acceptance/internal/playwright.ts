import {expect, test as playwrightTest} from '@playwright/test';
import {Driver} from "./Driver";
import {Dsl} from "./Dsl";
import {WebDriver} from './WebDriver';

export const describe = playwrightTest.describe;

export function test(title: string, test: Test): void {
  playwrightTest(title, async function ({page}): Promise<void> {
    await test(new Dsl(new Driver(new WebDriver(page))));
  });
}

type Test = (dsl: Dsl) => Promise<void>;

export function beforeEach(block: (dsl: Dsl) => Promise<void>): void {
  playwrightTest.beforeEach(({page}) => block(
    new Dsl(new Driver(new WebDriver(page)))),
  );
}

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}
