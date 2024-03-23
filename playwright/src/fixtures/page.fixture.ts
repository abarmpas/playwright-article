import { test as base } from '@playwright/test';
// import { EmployeesPage } from '@pages/Employees.page';
import { LoginPage } from '../pages/Login.page';
// import { EmployeeDetailsPage } from '@pages/EmployeeDetails.page';
import { ArticleBasePage } from '../pages/base/ArticleBase.page';

type PageFixtures = {
  loginPage: LoginPage;
//   employeesPage: EmployeesPage;
//   employeeDetailsPage: EmployeeDetailsPage;
  basePage: ArticleBasePage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

//   employeeDetailsPage: async ({ page }, use) => {
//     await use(new EmployeeDetailsPage(page));
//   },

//   employeesPage: async ({ page }, use) => {
//     await use(new EmployeesPage(page));
//   },

  basePage: async ({ page }, use) => {
    await use(new ArticleBasePage(page));
  },
});