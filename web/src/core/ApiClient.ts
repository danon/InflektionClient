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
