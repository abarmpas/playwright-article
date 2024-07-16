import { TableComponent } from '../tables/table.component';
import { Page } from '@playwright/test';

export type AvailableUsersTestIds =
  | 'name'
  | 'email';

export class UsersTableComponent extends TableComponent {
  constructor(page: Page) {
    super(page, 'users');
  }

  async getUserByValue(
    value: string,
    column: AvailableUsersTestIds,
  ) {
    return (await this.getRowByValue(value, column)).getByRole('link', { name: value, exact: true });
  }
}