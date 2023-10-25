import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';

test('demo test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication();
});