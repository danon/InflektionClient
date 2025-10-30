import {expect, Page} from '@playwright/test';

export class WebDriver {
  constructor(private page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async findTextAll(testId: string): Promise<string[]> {
    const strings = await this.page.getByTestId(testId).allTextContents();
    return strings.map(string => string.trim());
  }

  async textVisible(textContent: string): Promise<boolean> {
    return await this.page.getByText(textContent).isVisible();
  }

  async waitPartnerListFinishedLoading():Promise<void> {
    await expect(this.page.getByText('Loading...')).not.toBeVisible();
  }
}
