import {Component, input} from '@angular/core';

@Component({
  selector: 'skeleton-table',
  template: `
    <table>
      <tr>
        @for (field of fields(); track $index) {
          <th>{{field}}</th>
        }
      </tr>
      <tr>
        <td [attr.colspan]="fields().length.toString()" class="skeleton-content">
          <ng-content/>
        </td>
      </tr>
    </table>
  `,
})
export class SkeletonTable {
  public fields = input.required<string[]>();
}
