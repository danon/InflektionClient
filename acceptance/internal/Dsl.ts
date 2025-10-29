import {Driver} from "./Driver";

export class Dsl {
  private testInput: object;

  constructor(private driver: Driver) {
    this.testInput = {};
  }

  async beforeEach(): Promise<void> {
    await this.driver.loadApplication({});
  }

  async populateTestPartnersList(partners: Partner[]): Promise<void> {
    this.testInput = {partners};
  }

  async requestPartners(): Promise<void> {
    await this.driver.loadApplication(this.testInput);
  }

  async fetchPartners(): Promise<Partner[]> {
    const names = await this.driver.findPartnerNames();
    return names.map(name => ({
      partnerName: name,
      partnerConversions: -1,
    }));
  }
}

interface Partner {
  partnerName?: string;
  partnerConversions?: number;
}
