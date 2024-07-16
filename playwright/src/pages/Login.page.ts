import { expect } from '@playwright/test';
import { ArticleBasePage } from './base/ArticleBase.page';
export class LoginPage extends ArticleBasePage {
  _url = '/home';

  usernameInput = this.page.locator('#email');
  passwordInput = this.page.locator('#password');
  signInButton = this.page.locator('#login-btn');
  logoutButton = this.page.locator('#sign-out');
  failedLoginMessage = this.page.getByText('Invalid username or password');

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}