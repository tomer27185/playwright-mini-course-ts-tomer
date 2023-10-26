import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class ProductPage extends BasePage {
  protected page: Page;
  private pageTitleElement: Locator;
  private itemElement: Locator;
  private shoppingCartElement: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.itemElement = this.page.locator('.inventory_item');
    this.shoppingCartElement = this.page.locator('a[class^="shopping_cart_link"]');
  }

  public async chooseProductByTitle(expectedProductTitle: string) {
          await this.clickElement(await this.itemElement
                    .filter({ hasText: expectedProductTitle })
                    .locator('button'));
    
  }

  public async validateNumberOfItems(numberOfItems: string){
          await this.validateElementText(this.shoppingCartElement, numberOfItems);
  }

  public async goToCart(){
          await this.clickElement(this.shoppingCartElement)
  }
}
