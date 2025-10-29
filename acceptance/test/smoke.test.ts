import {assertEquals, beforeEach, test} from '../internal/playwright';

beforeEach(dsl => dsl.beforeEach());

test('Application is running.', async () => {
  assertEquals(true, true);
});
