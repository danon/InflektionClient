import {WebDriver} from './WebDriver';

export class Driver {
  constructor(private web: WebDriver) {}

  async loadApplication(testInput: object): Promise<void> {
    await this.web.navigate('/?testInput=' + urlEncode(jsonEncode(testInput)));
  }

  async findPartnerNames(): Promise<string[]> {
    return await this.web.findTextAll('partnerName');
  }

  async findPartnerConversions(): Promise<number[]> {
    const conversions = await this.web.findTextAll('partnerConversion');
    return conversions.map(conversion => parseInt(conversion));
  }
}

function jsonEncode(input: object): string {
  return JSON.stringify(input);
}

function urlEncode(input: string): string {
  return encodeURIComponent(input);
}
