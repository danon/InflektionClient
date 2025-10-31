import {ApiClient} from '../src/core/ApiClient';
import {Partner} from '../src/core/Partner';
import {numberOfPages, PartnerService} from '../src/core/PartnerService';
import {assertEquals, assertThrows, beforeEach, describe, test} from './vitest';

describe('Partners are presented to the user.', () => {
  let service: PartnerService;
  let apiClient: TestApiClient;
  beforeEach(() => {
    apiClient = new TestApiClient();
    service = new PartnerService(apiClient);
  });
  test('Lists partners.', async () => {
    apiClient.setPartners([makePartner('John Smith')]);
    const [partner] = await service.listPartners(1, 1);
    assertEquals('John Smith', partner.partnerName);
  });
  test('First page only contains page size items.', async () => {
    apiClient.setPartners([
      makePartner('John Smith'),
      makePartner('Mark Doe')]);
    const partners = await service.listPartners(1, 1);
    assertEquals(1, partners.length);
  });
  test('Second page contains the next item.', async () => {
    apiClient.setPartners([
      makePartner('John Smith'),
      makePartner('Mark Doe')]);
    const [partner] = await service.listPartners(1, 2);
    assertEquals('Mark Doe', partner.partnerName);
  });
  test('Page 0 is invalid', () => {
    assertThrows(() => {
      service.listPartners(1, 0);
    });
  });
  test('Second page has the third item.', async () => {
    apiClient.setPartners([
      makePartner('John Smith'),
      makePartner('Mark Doe'),
      makePartner('Steve Johnson')]);
    const [partner] = await service.listPartners(2, 2);
    assertEquals('Steve Johnson', partner.partnerName);
  });
  test('Calls api client to fetch partners.', async () => {
    const apiClient = new CountingCallsApiClient();
    const service = new PartnerService(apiClient);
    service.listPartners(1, 1);
    assertEquals(1, apiClient.calls);
  });
  test('Listing items multiple times does not call endpoint multiple times', async () => {
    const apiClient = new CountingCallsApiClient();
    const service = new PartnerService(apiClient);
    await service.listPartners(1, 1);
    await service.listPartners(1, 1);
    assertEquals(1, apiClient.calls);
  });
  test('Listing items again, returns previous fetched partners.', async () => {
    apiClient.setPartners([makePartner('John Smith')]);
    await service.listPartners(1, 1);
    const [partner] = await service.listPartners(1, 1);
    assertEquals('John Smith', partner.partnerName);
  });
  test('Inform about number of pages.', async () => {
    apiClient.setPartners([
      makePartner('John Smith'),
      makePartner('John Smith'),
      makePartner('John Smith'),
      makePartner('John Smith'),
      makePartner('John Smith'),
    ]);
    const result = await service.listPartnersWithPageNumber(2, 1);
    assertEquals(3, result.pageCount);
  });
  describe('Page amount', () => {
    test('Given 0 partners, there is one page', () => {
      assertEquals(1, numberOfPages(0, 10));
    });
    test('Given max partners, there is one page', () => {
      assertEquals(1, numberOfPages(10, 10));
    });
    test('Given 11 partners on a 10 sized page, there are 2 pages', () => {
      assertEquals(2, numberOfPages(11, 10));
    });
    test('Given 3 partners on a 1 sized page, there are 3 pages', () => {
      assertEquals(3, numberOfPages(3, 1));
    });
    test('Page size of 0 is invalid', () => {
      assertThrows(() => numberOfPages(0, 0));
    });
    test('Negative page size is invalid', () => {
      assertThrows(() => numberOfPages(0, -1));
    });
  });
});

class TestApiClient implements ApiClient {
  private partners: Partner[] = [];

  async loadPartners(): Promise<Partner[]> {
    return this.partners;
  }

  setPartners(partners: Partner[]): void {
    this.partners = partners;
  }
}

class CountingCallsApiClient implements ApiClient {
  public calls: number = 0;

  loadPartners(): Promise<Partner[]> {
    this.calls += 1;
    return Promise.resolve([]);
  }
}

function makePartner(partnerName: string): Partner {
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
