import { UserTable } from '@/app/types/userTable';
import { test } from '../../src/fixtures/base.fixture';
import { loginAsAdmin } from '@/playwright/src/utils/loginUtils';

test.describe('User Details', () => {
  loginAsAdmin();

  let user: UserTable;

  test.beforeEach(async ({ usersPage }) => {
    await test.step('GIVEN: I navigate to Users page', async () => {
      user = await usersPage.openAndKeepUsersData();
    });
  });

  test('Should be able to view User personal details', async ({
    usersPage,
    userDetailsPage
  }) => {
    await test.step('WHEN: I navigate to a User', async () => {
      await usersPage.navigateToUser(user.name);
    });

    await test.step('THEN: Validating correct User`s details', async () => {
      await userDetailsPage.userDetailsValidation(user);
    });

  });
});