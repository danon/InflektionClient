import {Component, input} from '@angular/core';
import {Partner} from '../core/Partner';

@Component({
  selector: 'partners-table',
  template: `
      @for (partner of partners(); track $index) {
          <span data-testid="partnerName">{{partner.partnerName}}</span>
          <span data-testid="partnerConversion">{{partner.partnerConversions}}</span>
      }
  `,
})
export class PartnersTable {
  public partners = input.required<Partner[]>();
}
