import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import { ErrorMessages } from '../../helpers/ErrorMessages';
import ApplicationURL from '../../helpers/ApplicationURL';

test.describe('Negative Login Scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
  });

  test('Login with locked_out_user', async () => {
    await loginPage.loginToApplication(process.env.LOCKED_OUT_USER, process.env.CORRECT_PASSWORD);
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test('Login with incorrect username', async () => {
    await loginPage.loginToApplication('incorrect_user', process.env.CORRECT_PASSWORD);
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test('Login with incorrect password', async () => {
    await loginPage.loginToApplication(process.env.STANDART_USER, '12345');
    await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });
});
