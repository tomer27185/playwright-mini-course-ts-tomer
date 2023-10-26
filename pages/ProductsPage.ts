import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class ProductPage extends BasePage {
  protected page: Page;
  private pageTitleElement: Locator;


  constructor(page: Page) {
          super(page);
          this.page = page;
          this.pageTitleElement = page.locator('.title')
  }

  public async validateTitle(title: string){
          await this.validateElementText(this.pageTitleElement, title);
  }
}
