import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class CheckoutCompletePage extends BasePage {
  protected page: Page;

  private backHomeButton: Locator;
  private thankYouMessageElement: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.backHomeButton = this.page.locator("[data-test='back-to-products']");
    this.thankYouMessageElement = this.page.locator('.complete-header');
  }

  public async validateFinalMessage(expectedMessage: string) {
    await this.validateElementText(
      this.thankYouMessageElement,
      expectedMessage
    );
  }

  public async clickBackHome() {
    this.clickElement(this.backHomeButton);
  }
}
