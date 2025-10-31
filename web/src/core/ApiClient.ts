import {Partner} from './Partner';

export interface ApiClient {
  loadPartners(): Promise<Partner[]>;
}

export class TestModeClient implements ApiClient {
  constructor(private partners: Partner[]) {}

  loadPartners(): Promise<Partner[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.partners), 50);
    });
  }
}

export class TestErrorClient implements ApiClient {
  loadPartners(): Promise<Partner[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(), 50);
    });
  }
}

export class ProductionClient implements ApiClient {
  loadPartners(): Promise<Partner[]> {
    return fetch('https://analyze.inflektion.ai/partners.php')
      .then(response => response.json())
      .then(partners => {
        return (partners as Record<string, unknown>[])
          .map((value): Partner => ({
            partnerId: value.id as number,
            partnerName: value.partnerName as string,
            partnerType: value.partnerType as string,
            partnerConversions: value.conversions as number,
            partnerCommissions: value.commissions as number,
            partnerGrossSales: value.grosssales as number,
            partnerContract: value.contract as string,
          }));
      });
  }
}
