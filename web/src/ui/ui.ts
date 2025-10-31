import {provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {ApiClient} from '../core/ApiClient';
import {App} from './component/app';

export function createUserInterface(apiClient: ApiClient): void {
  bootstrapApplication(App, {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZoneChangeDetection({eventCoalescing: true}),
      {provide: 'ApiClient', useValue: apiClient},
    ],
  })
    .catch(error => {
      throw error;
    });
}
