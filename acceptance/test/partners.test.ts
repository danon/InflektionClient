import {Dsl} from '../internal/Dsl';
import {assertEquals, beforeEach, describe, test} from '../internal/playwright';

beforeEach(dsl => dsl.beforeEach());

describe('Partners are presented to the user.', () => {
  test('Partner is listed.', async (dsl: Dsl) => {
    // given a faked partners list
    await dsl.populateTestPartnersList([{
      partnerName: 'Green Living',
    }]);
    // when user requests the list of partners
    await dsl.requestPartners();
    // then the partners are presented
    const [partner] = dsl.fetchPartners();
    assertEquals('Green Living', partner.partnerName);
  });
});
