import { test as base } from '@playwright/test';
// import { EmployeesPage } from '@pages/Employees.page';
import { LoginPage } from '../pages/Login.page';
// import { EmployeeDetailsPage } from '@pages/EmployeeDetails.page';
import { ArticleBasePage } from '../pages/base/ArticleBase.page';
import { UsersPage } from '../pages/Users.page';
import { UserDetailsPage } from '../pages/UserDetails.page';
import { IssuesPage } from '../pages/Issues.page';

type PageFixtures = {
  loginPage: LoginPage;
  usersPage: UsersPage;
  userDetailsPage: UserDetailsPage;
  basePage: ArticleBasePage;
  issuesPage: IssuesPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  userDetailsPage: async ({ page }, use) => {
    await use(new UserDetailsPage(page));
  },

  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },

  issuesPage: async ({ page }, use) => {
    await use(new IssuesPage(page));
  },

  basePage: async ({ page }, use) => {
    await use(new ArticleBasePage(page));
  },
});