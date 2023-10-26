import { Locator, Page, expect } from '@playwright/test';
import ApplicationURL from '../helpers/ApplicationURL';
import UserCredentials from '../helpers/UserCredentials';
import { ErrorMessages } from '../helpers/ErrorMessages';
import { BasePage } from './BasePage';

export default class LoginPage extends BasePage {
  protected page: Page;

  private usernameFieldElement: Locator;
  private passwordFieldElement: Locator;
  private loginButtonElement: Locator;
  private errorMessageElement: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.usernameFieldElement = this.page.locator('[data-test="username"]');
    this.passwordFieldElement = this.page.locator('[data-test="password"]');
    this.loginButtonElement = this.page.locator('[data-test="login-button"]');
    this.errorMessageElement = this.page.locator('[data-test="error"]');
  }

  public async loginToApplication(
    username = UserCredentials.STANDART_USER,
    password = UserCredentials.SECRET_SAUCE,
    url = ApplicationURL.BASE_URL
  ) {
    await this.page.goto(url);
    await this.validatePageUrl(ApplicationURL.BASE_URL);
    await this.usernameFieldElement.fill(username);
    await this.passwordFieldElement.fill(password);
    await this.loginButtonElement.click();
  }

  public async validateErrorMessage(errorMessage: ErrorMessages) {
    await this.validateElementText(this.errorMessageElement, errorMessage.valueOf());
  }
}
