import {provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {Partner} from '../core/Partner';
import {App} from './app';

export function createUserInterface(partner: Partner): void {
  bootstrapApplication(App, {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZoneChangeDetection({eventCoalescing: true}),
      {provide: 'partner', useValue: partner},
    ],
  })
    .catch(error => {
      throw error;
    });
}
