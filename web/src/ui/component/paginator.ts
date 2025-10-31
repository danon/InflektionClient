import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'paginator',
  template: `
    <div class="flex">
      @for (pageIndex of pages(); track pageIndex) {
        <button (click)="changePage(pageIndex+1)">
          {{pageIndex + 1}}
        </button>
      }
    </div>
  `,
})
export class TablePaginator {
  public count = input.required<number>();

  @Output()
  private change = new EventEmitter<number>();

  protected changePage(pageNumber: number): void {
    this.change.emit(pageNumber);
  }

  protected pages(): number[] {
    return [...Array(this.count()).keys()];
  }
}
