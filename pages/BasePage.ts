import { Locator, Page, expect, test } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async validatePageUrl(url: string) {
    await test.step(`Validate that a correct value of URL is: ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  protected async validateElementText(element: Locator, expectedText: string) {
    await test.step(`Validate that a correct element text is: ${expectedText}`, async () => {
      await expect(element).toContainText(expectedText);
    });
  }

  protected async clickElement(element: Locator) {
    await test.step(`Click the element: ${element}`, async () => {
      await element.click();
    });
  }

  public async validateTitle(title: string) {
    await this.validateElementText(this.page.locator('.title'), title);
  }
}
