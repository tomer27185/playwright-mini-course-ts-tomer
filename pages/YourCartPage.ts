import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class PYourCartPage extends BasePage {
  protected page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

}
