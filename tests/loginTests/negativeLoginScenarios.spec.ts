import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import UserCredentials from '../../helpers/UserCredentials';
import { ErrorMessages } from '../../helpers/ErrorMessages';
import ApplicationURL from '../../helpers/ApplicationURL';

test.describe('Negative Login Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
  });

  test('Login with locked_out_user', async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.LOCKED_OUT_USER, UserCredentials.SECRET_SAUCE);
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test('Login with incorrect username', async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.INCORRECT_USER, UserCredentials.SECRET_SAUCE);
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test('Login with incorrect password', async ({ page }) => {
    await loginPage.loginToApplication(UserCredentials.STANDART_USER, UserCredentials.INCORRECT_PASSWORD);
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });
});
