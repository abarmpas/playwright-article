import { expect, test } from '../../src/fixtures/base.fixture';
import { verifyIsVisible } from '../../src/utils/verifications';
import { resetStorageState } from '../../src/utils/loginUtils';

test.describe('User login', () => {
  resetStorageState();

  test.beforeEach(async ({ loginPage }) => {
    await test.step('GIVEN: I open the application', async () => {
      await loginPage.open();
    });
  });

  test('should land on Home Page, after logging in', async ({
    loginPage,
    users,
  }) => {
    await test.step('WHEN: I attempt to login with valid credentials', async () => {
      await loginPage.login(users.username, users.password);
      await expect(loginPage.usernameInput).toBeEmpty();
      await loginPage.goToHome();
    });

    await test.step('THEN: I land on Login page', async () => {
      await verifyIsVisible(loginPage.logoutButton);
    });
  });

  test('should not login with invalid credentials', async ({
    loginPage,
  }) => {
    await test.step('WHEN: I attempt to login with invalid credentials', async () => {
      const invalidUsername = 'invalid-user';
      const invalidPassword = 'invalid-password';
      await loginPage.login(invalidUsername, invalidPassword);
    });

    await test.step('THEN: I cannot navigate to other pages', async () => {
      await loginPage.goToHome();
    });

    await test.step('AND: I remain in login page', async () => {
      await verifyIsVisible(loginPage.signInButton);
    });
  });
});