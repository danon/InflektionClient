import {Component, Inject} from '@angular/core';
import {ApiClient} from '../../core/ApiClient';
import {Partner} from '../../core/Partner';
import {PartnersTable} from './partners-table';
import {Sidebar} from './sidebar';
import {SkeletonTable} from './skeleton-table';

@Component({
  selector: 'app-root',
  imports: [PartnersTable, Sidebar, SkeletonTable],
  template: `
    <main>
      <sidebar/>
      <section>
        <div class="flex">
          <div>
            <h1>Power Plate</h1>
            <h2>Dashboard</h2>
          </div>
          <div class="auth">
            <span class="avatar">HD</span>
            <div>
              <div class="text1">TEST</div>
              <div class="username">User</div>
            </div>
          </div>
        </div>
        <div>
          <button>
            Choose Columns
            <span class="icon choose-columns"></span>
          </button>
          <button>
            Message Partners
            <span class="icon message-partners"></span>
          </button>
          <button>
            Export List
            <span class="icon export-list"></span>
          </button>
        </div>
        @if (state === 'available') {
          <partners-table [partners]="partners!"/>
        } @else if (state === 'notAvailable') {
          <skeleton-table [fields]="partnerFields">
            Failed to load partners.
          </skeleton-table>
        } @else {
          <skeleton-table [fields]="partnerFields">
            Loading partners...
          </skeleton-table>
        }
      </section>
    </main>
  `,
})
export class App {
  protected state: PartnerState = 'pending';
  protected partnerFields = ['ID', 'Name', 'Type', 'Contract', 'Gross Sales', 'Commissions', 'Conversions', ''];
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
