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

  fetchPartners(): Partner[] {
    return [];
  }
}

interface Partner {
  partnerName: string;
}
