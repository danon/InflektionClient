import {Component} from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `
    <aside>
      <div class="logo"></div>
      <ul>
        <li class="selected">
          <div class="icon dashboard"></div>
          Dashboard
        </li>
        <li>
          <div class="icon partners"></div>
          Partners
        </li>
        <li>
          <div class="icon approvals"></div>
          Approvals
        </li>
      </ul>
    </aside>
  `,
})
export class Sidebar {}
