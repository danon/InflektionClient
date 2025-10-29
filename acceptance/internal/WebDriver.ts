import {Page} from '@playwright/test';

export class WebDriver {
  constructor(private page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
