import { test as base } from '@playwright/test';
import { users } from '../utils/credentials';
import { Issue } from '../models/Issue';

type UtilsFixtures = {
  users:
    {
      username: string;
      password: string;
      name?: string;
      email?: string;
      contactName?: string;
    }
  issue: Issue;
};

export const test = base.extend<UtilsFixtures>({
  users: async ({ page }, use) => {
    await use(users.dev.adminUser);
  },

  issue: async ({}, use) => {
    const issue = new Issue();
    await use(issue);
  },
});