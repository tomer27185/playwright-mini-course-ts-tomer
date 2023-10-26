import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ApplicationURL from '../../helpers/ApplicationURL';
import ProductsPage from '../../pages/ProductsPage';
import YourCartPage from '../../pages/YourCartPage';

test('Sanity test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductsPage(page);
  const yourCartPage = new YourCartPage(page);
  await loginPage.loginToApplication();
  await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  await productPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  await productPage.validateTitle('Products');
  await productPage.chooseProductByTitle('Sauce Labs Bolt T-Shirt');
  await productPage.chooseProductByTitle('Sauce Labs Onesie');
  await productPage.validateNumberOfItems('2');
  await productPage.goToCart();
  await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
  await yourCartPage.validateTitle('Your Cart');
});
