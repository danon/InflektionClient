import {Page} from '@playwright/test';

export class WebDriver {
  constructor(private page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async findTextAll(testId: string): Promise<string[]> {
    const strings = await this.page.getByTestId(testId).allTextContents();
    return strings.map(string => string.trim());
  }
}
