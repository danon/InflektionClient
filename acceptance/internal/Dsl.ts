import {Driver} from "./Driver";

export class Dsl {
  private testInput: object;

  constructor(private driver: Driver) {
    this.testInput = {};
  }

  async beforeEach(): Promise<void> {
    await this.driver.loadApplication({});
  }

  async testPartnersListPopulate(partners: Partner[]): Promise<void> {
    this.testInput = {partners};
  }

  async testPartnersListUnavailable(): Promise<void> {
    this.testInput = {partnersAvailable: false};
  }

  async requestPartners(): Promise<void> {
    await this.driver.loadApplication(this.testInput);
  }

  async fetchPartners(): Promise<Partner[]> {
    const names = await this.driver.findPartnerNames();
    const conversions = await this.driver.findPartnerConversions();
    return zip(names, conversions).map(([name, conversion]) => ({
      partnerName: name,
      partnerConversions: conversion,
    }));
  }

  async partnersListAvailable(): Promise<boolean> {
    return await this.driver.partnersListAvailable();
  }
}

interface Partner {
  partnerName?: string;
  partnerConversions?: number;
}

function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][] {
  return array1.map((element: T1, index: number) => [element, array2[index]]);
}
