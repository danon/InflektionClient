import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'paginator',
  template: `
    <div class="paginator">
      <button
          class="page-button"
          [class.disabled]="!canChangePrev()"
          (click)="changePagePrev()">
        &lt;
      </button>
      @for (pageIndex of pages(); track pageIndex) {
        <button
            class="page-button"
            [class.selected]="pageIndex+1 == current()"
            (click)="changePage(pageIndex+1)">
          {{pageIndex + 1}}
        </button>
      }
      <button
          class="page-button"
          [class.disabled]="!canChangeNext()"
          (click)="changePageNext()">
        &gt;
      </button>
    </div>
  `,
})
export class TablePaginator {
  public count = input.required<number>();
  public current = input.required<number>();

  @Output()
  private change = new EventEmitter<number>();

  protected changePage(pageNumber: number): void {
    this.change.emit(pageNumber);
  }

  protected pages(): number[] {
    return [...Array(this.count()).keys()];
  }

  protected canChangePrev(): boolean {
    return this.current() > 1;
  }

  protected canChangeNext(): boolean {
    return this.current() < this.count();
  }

  protected changePagePrev(): void {
    if (this.canChangePrev()) {
      this.changePage(this.current() - 1);
    }
  }

  protected changePageNext(): void {
    if (this.canChangeNext()) {
      this.changePage(this.current() + 1);
    }
  }
}
