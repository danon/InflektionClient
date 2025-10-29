import {Component, Inject} from '@angular/core';
import {PartnerContainer} from '../core/Partner';

@Component({
  selector: 'app-root',
  template: `
      @if (container.state === 'available') {
          <span data-testid="partnerName">{{container.partner!.partnerName}}</span>
          <span data-testid="partnerConversion">{{container.partner!.partnerConversions}}</span>
      } @else {
          <span>Failed to load partners.</span>
      }
  `,
})
export class App {
  constructor(
    @Inject('partner')
    protected readonly container: PartnerContainer,
  ) {}
}
