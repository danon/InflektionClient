import {Partner} from '../src/core/Partner';
import {PartnerService} from '../src/core/PartnerService';
import {assertEquals, beforeEach, describe, test} from './vitest';

describe('Partners are presented to the user.', () => {
  let service: PartnerService;
  beforeEach(() => {
    service = new PartnerService([partner('John Smith')]);
  });
  test('Single partner name', () => {
    const partner = service.findPartner();
    assertEquals('John Smith', partner.partnerName);
  });
});

function partner(partnerName: string): Partner {
  return {
    partnerId: 0,
    partnerName: partnerName,
    partnerConversions: 0,
    partnerType: null,
    partnerContract: '',
    partnerCommissions: 0,
    partnerGrossSales: 0,
  };
}
