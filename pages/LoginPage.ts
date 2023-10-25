import { Locator, Page, expect } from '@playwright/test';
import ApplicationURL from '../helpers/ApplicationURL';
import UserCredentials from '../helpers/UserCredentials';

export default class LoginPage {
  protected page: Page;

  usernameField: Locator;
  passwordField: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.locator('[data-test="username"]');
    this.passwordField = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  public async loginToApplication(
    username = UserCredentials.STANDART_USER,
    password = UserCredentials.SECRET_SAUCE,
    url = ApplicationURL.BASE_URL
  ) {
    await this.page.goto(url);
    await this.validatePageUrl(ApplicationURL.BASE_URL)
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.validatePageUrl(`${ApplicationURL.BASE_URL}inventory.html`)
  }

  public async validatePageUrl(url: string){
          await expect(this.page).toHaveURL(url);
  }
}
