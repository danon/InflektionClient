import {Component, Inject} from '@angular/core';
import {Partner} from '../../core/Partner';
import {PartnerService} from '../../core/PartnerService';
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
        <div class="flex justify-between">
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
        <div class="flex space-x-17.5">
          <button class="header-button">
            Choose Columns
            <span class="icon choose-columns"></span>
          </button>
          <button class="header-button">
            Message Partners
            <span class="icon message-partners"></span>
          </button>
          <button class="header-button">
            Export List
            <span class="icon export-list"></span>
          </button>
        </div>
        @if (state === 'available') {
          <partners-table [partners]="partners!"/>
          <button (click)="changePage(1)">1</button>
          <button (click)="changePage(2)">2</button>
          <button (click)="changePage(3)">3</button>
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
    @Inject(PartnerService)
    protected readonly partnerService: PartnerService,
  ) {
    this.listPartners(1);
  }

  protected changePage(pageNumber: number): void {
    this.listPartners(pageNumber);
  }

  private listPartners(pageNumber: number): void {
    this.partnerService.listPartners(14, pageNumber)
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
