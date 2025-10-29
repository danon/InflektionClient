import {WebDriver} from './WebDriver';

export class Driver {
  constructor(private web: WebDriver) {}

  async loadApplication(): Promise<void> {
    await this.web.navigate('/');
  }

  async findPartnerNames(): Promise<string[]> {
    return await this.web.findTextAll('partnerName');
  }
}
