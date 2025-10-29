import {PartnerService} from '../src/core/PartnerService';
import {assertEquals, beforeEach, describe, test} from './vitest';

describe('Partners are presented to the user.', () => {
  let service: PartnerService;
  beforeEach(() => {
    service = new PartnerService([
      {partnerName: 'John Smith', partnerConversions: 0},
    ]);
  });
  test('Single partner name', () => {
    const partner = service.findPartner();
    assertEquals('John Smith', partner.partnerName);
  });
});
