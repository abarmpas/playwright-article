import { test as base } from '@playwright/test';
import { users } from '../utils/credentials';

type UtilsFixtures = {
  users:
    {
      username: string;
      password: string;
      name?: string;
      email?: string;
      contactName?: string;
    }
};

export const test = base.extend<UtilsFixtures>({
  users: async ({ page }, use) => {
    await use(users.dev.adminUser);
  },
});