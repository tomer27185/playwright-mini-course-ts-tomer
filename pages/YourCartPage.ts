import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class PYourCartPage extends BasePage {
  protected page: Page;
  private cartItem: Locator;
  private cartItemName: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartItem = this.page.locator('.cart_item');
    this.cartItemName = this.page.locator('.inventory_item_name');
    this.checkoutButton = this.page.locator('#checkout')
  }

  public async validateNumberOfItems(expectedNumber: number) {
    await expect(this.cartItem).toHaveCount(expectedNumber);
  }

  public async validateItemExistsInCart(productName: string) {
    await expect(
      this.cartItemName.filter({ hasText: productName })
    ).toBeVisible();
  }

  public async goToCheckout(){
          await this.clickElement(this.checkoutButton);
  }
}
