import {Component, Inject} from '@angular/core';
import {Partner} from '../../core/Partner';
import {PartnerService} from '../../core/PartnerService';
import {TablePaginator} from './paginator';
import {PartnersTable} from './partners-table';
import {Sidebar} from './sidebar';
import {SkeletonTable} from './skeleton-table';

@Component({
  selector: 'app-root',
  imports: [PartnersTable, Sidebar, SkeletonTable, TablePaginator],
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
          <partners-table [partners]="partners"/>
          <paginator
              [count]="pageCount"
              [current]="currentPage"
              (change)="changePage($event)"/>
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
  protected partners: Partner[] = [];
  protected pageCount: number = 1;
  protected currentPage: number = 1;

  constructor(
    @Inject(PartnerService)
    protected readonly partnerService: PartnerService,
  ) {
    this.listPartners(1);
  }

  protected changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.listPartners(pageNumber);
  }

  private listPartners(pageNumber: number): void {
    this.partnerService
      .listPartnersWithPageNumber(14, pageNumber)
      .then(result => {
        this.state = 'available';
        this.partners = result.partners;
        this.pageCount = result.pageCount;
      })
      .catch(() => {
        this.state = 'notAvailable';
      });
  }
}

type PartnerState = 'pending'|'available'|'notAvailable';
