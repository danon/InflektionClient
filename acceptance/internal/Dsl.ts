import {Driver} from "./Driver";

export class Dsl {
  constructor(private driver: Driver) {}

  async beforeEach(): Promise<void> {
    await this.driver.loadApplication();
  }

  async populateTestPartnersList(partners: Partner[]): Promise<void> {
  }

  async requestPartners(): Promise<void> {
    await this.driver.loadApplication();
  }

  async fetchPartners(): Promise<Partner[]> {
    const names = await this.driver.findPartnerNames();
    return names.map(name => ({partnerName: name}));
  }
}

interface Partner {
  partnerName: string;
}
