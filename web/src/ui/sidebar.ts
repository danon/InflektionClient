import {NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'sidebar',
  imports: [NgOptimizedImage],
  template: `
    <aside>
      <img ngSrc="asset/logo.svg" alt="Inflektion" height="27" width="164"/>
      <ul>
        <li>Dashboard</li>
        <li>Partners</li>
        <li>Approvals</li>
      </ul>
    </aside>
  `,
})
export class Sidebar {}
