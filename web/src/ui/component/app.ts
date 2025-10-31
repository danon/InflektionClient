import {Component, Inject} from '@angular/core';
import {ApiClient} from '../../core/ApiClient';
import {Partner} from '../../core/Partner';
import {PartnersTable} from './partners-table';
import {Sidebar} from './sidebar';

@Component({
  selector: 'app-root',
  imports: [PartnersTable, Sidebar],
  styleUrl: '../style.css',
  template: `
    <main>
      <sidebar/>
      <section>
        <div>
          <span>HD</span>
          TEST User
        </div>
        <div>
          <h1>Power Plate</h1>
          <h2>Dashboard</h2>
          <button>Choose Columns</button>
          <button>Message Partners</button>
          <button>Export List</button>
        </div>
        @if (state === 'available') {
          <partners-table [partners]="partners!"/>
        } @else if (state === 'notAvailable') {
          <span>Failed to load partners.</span>
        } @else {
          <span>Loading...</span>
        }
      </section>
    </main>
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
