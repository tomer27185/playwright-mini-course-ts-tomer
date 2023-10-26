import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ApplicationURL from '../../helpers/ApplicationURL';
import ProductsPage from '../../pages/ProductsPage';

test('demo test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication();
  await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
  const productPage = new ProductsPage(page)
  await productPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)
  await productPage.validateTitle("Products")
});