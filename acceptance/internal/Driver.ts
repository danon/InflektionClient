import {WebDriver} from './WebDriver';

export class Driver {
  constructor(private web: WebDriver) {}

  async loadApplication(testInput: object): Promise<void> {
    await this.web.navigate('/?testInput=' + urlEncode(jsonEncode(testInput)));
  }

  async findPartnerNames(): Promise<string[]> {
    await this.web.waitPartnerListFinishedLoading();
    return await this.web.findTextAll('partnerName');
  }

  async findPartnerConversions(): Promise<number[]> {
    await this.web.waitPartnerListFinishedLoading();
    const conversions = await this.web.findTextAll('partnerConversion');
    return conversions.map(conversion => parseInt(conversion));
  }

  async partnersListAvailable(): Promise<boolean> {
    await this.web.waitPartnerListFinishedLoading();
    return !await this.web.textVisible('Failed to load partners.');
  }
}

function jsonEncode(input: object): string {
  return JSON.stringify(input);
}

function urlEncode(input: string): string {
  return encodeURIComponent(input);
}
