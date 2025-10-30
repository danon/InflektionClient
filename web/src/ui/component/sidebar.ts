import {NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'sidebar',
  imports: [NgOptimizedImage],
  template: `
    <aside>
      <img ngSrc="../asset/logo.svg" alt="Inflektion" height="27" width="164"/>
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
