import {Component, Inject} from '@angular/core';
import {Partner} from '../core/Partner';

@Component({
  selector: 'app-root',
  template: `
      <span data-testid="partnerName">{{partner.partnerName}}</span>
      <span data-testid="partnerConversion">{{partner.partnerConversions}}</span>`,
})
export class App {
  constructor(
    @Inject('partner')
    protected readonly partner: Partner,
  ) {
  }
}
