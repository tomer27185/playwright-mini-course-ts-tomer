import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import ApplicationURL from '../../helpers/ApplicationURL';
import ProductPage from '../../pages/ProductsPage';
import PageTitles from '../../helpers/PageTitles';

test.describe('Positive Login Scenarios', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
  });

  test.afterEach(async () => {
    await productPage.validateTitle(PageTitles.INVENTORY_PAGE);
  });

  test('Login with standard_user', async () => {
    await loginPage.loginToApplication(
      process.env.STANDARD_USER,
      process.env.CORRECT_PASSWORD
    );
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });

  test('Login with problem_user', async () => {
    await loginPage.loginToApplication(process.env.PROBLEM_USER);
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });

  test('Login with performance_glitch_user', async () => {
    await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });
});
