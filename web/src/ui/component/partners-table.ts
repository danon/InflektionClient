import {Component, input} from '@angular/core';
import {Partner} from '../../core/Partner';

@Component({
  selector: 'partners-table',
  template: `
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Contract</th>
        <th>Gross Sales</th>
        <th>Commissions</th>
        <th>Conversions</th>
        <th></th>
      </tr>
      @for (partner of partners(); track partner.partnerId) {
        <tr>
          <td class="small-text">{{partner.partnerId}}</td>
          <td data-testid="partnerName">{{partner.partnerName}}</td>
          <td>{{partner.partnerType}}</td>
          <td>{{partner.partnerContract}}</td>
          <td>{{partner.partnerGrossSales}}</td>
          <td>{{partner.partnerCommissions}}</td>
          <td data-testid="partnerConversion">{{partner.partnerConversions}}</td>
          <td>
            <div class="partner-details">
              <button class="table-button">
                <div class="icon details"></div>
                Details
              </button>
            </div>
          </td>
        </tr>
      }
    </table>
  `,
})
export class PartnersTable {
  public partners = input.required<Partner[]>();
}
