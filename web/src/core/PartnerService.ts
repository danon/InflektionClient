import {Partner} from './Partner';

export class PartnerService {
  constructor(private partners: Partner[]) {}

  findPartner(): Partner {
    return this.partners[0];
  }
}
