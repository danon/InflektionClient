import {Dsl} from '../internal/Dsl';
import {assertEquals, beforeEach, describe, test} from '../internal/playwright';

beforeEach(dsl => dsl.beforeEach());

describe('Partners are presented to the user.', () => {
  test('Partner is listed.', async (dsl: Dsl) => {
    // given a faked partners list
    await dsl.testPartnersListPopulate([{
      partnerName: 'Green Living',
    }]);
    // when user requests the list of partners
    await dsl.requestPartners();
    // then the partners are presented
    const [partner] = await dsl.fetchPartners();
    assertEquals('Green Living', partner.partnerName);
  });

  test('Partner has attribute conversions', async (dsl: Dsl) => {
    // given a faked partners list
    await dsl.testPartnersListPopulate([{
      partnerConversions: 7,
    }]);
    // when user requests the list of partners
    await dsl.requestPartners();
    // then the partners are presented
    const [partner] = await dsl.fetchPartners();
    assertEquals(7, partner.partnerConversions);
  });

  test('Partners list is unavailable', async (dsl: Dsl) => {
    // given partners list is not available
    await dsl.testPartnersListUnavailable();
    // when user requests the list of partners
    await dsl.requestPartners();
    // then the response informs about list being not available
    assertEquals(false, await dsl.partnersListAvailable());
  });
});
