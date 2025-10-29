import {Component, Inject} from '@angular/core';
import {ApiClient} from '../core/ApiClient';
import {Partner} from '../core/Partner';

@Component({
  selector: 'app-root',
  template: `
      @if (state === 'available') {
          @for (partner of partners; track $index) {
              <span data-testid="partnerName">{{partner.partnerName}}</span>
              <span data-testid="partnerConversion">{{partner.partnerConversions}}</span>
          }
      } @else if (state === 'notAvailable') {
          <span>Failed to load partners.</span>
      } @else {
          <span>Loading...</span>
      }
  `,
})
export class App {
  protected state: PartnerState = 'pending';
  protected partners: Partner[]|null = null;

  constructor(
    @Inject('ApiClient')
    protected readonly apiClient: ApiClient,
  ) {
    this.apiClient.loadPartners()
      .then(partners => {
        this.state = 'available';
        this.partners = partners;
      })
      .catch(() => {
        this.state = 'notAvailable';
      });
  }
}

type PartnerState = 'pending'|'available'|'notAvailable';
