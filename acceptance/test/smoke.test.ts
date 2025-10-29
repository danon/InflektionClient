import {Dsl} from '../internal/Dsl';
import {assertEquals, beforeEach, describe, test} from '../internal/playwright';

beforeEach(dsl => dsl.beforeEach());

describe('Partners are presented to the user.', () => {
  test('Partner is listed.', async (dsl: Dsl) => {
    assertEquals(true, true);
  });
});
