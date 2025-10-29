import {provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {PartnerContainer} from '../core/Partner';
import {App} from './app';

export function createUserInterface(partner: PartnerContainer): void {
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
