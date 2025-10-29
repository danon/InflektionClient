import {Driver} from "./Driver";

export class Dsl {
  constructor(private driver: Driver) {}

  async beforeEach(): Promise<void> {
    await this.driver.loadApplication();
  }
}
