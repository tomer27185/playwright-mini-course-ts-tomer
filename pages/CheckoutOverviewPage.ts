import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class CheckoutOverviewPage extends BasePage {
  protected page: Page;

  private finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.finishButton = this.page.locator('[data-test="finish"]');
  }

  public async clickFinishButton() {
    await this.clickElement(this.finishButton);
  }
}
