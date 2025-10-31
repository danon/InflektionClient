import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'paginator',
  template: `
    <div class="paginator">
      @for (pageIndex of pages(); track pageIndex) {
        <button
            class="page-button"
            (click)="changePage(pageIndex+1)"
            [class.selected]="pageIndex+1 == current()">
          {{pageIndex + 1}}
        </button>
      }
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
}
