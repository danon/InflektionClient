import {provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {PartnerService} from '../core/PartnerService';
import {App} from './component/app';

export function createUserInterface(partnerService: PartnerService): void {
  bootstrapApplication(App, {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZoneChangeDetection({eventCoalescing: true}),
      {provide: PartnerService, useValue: partnerService},
    ],
  })
    .catch(error => {
      throw error;
    });
}
