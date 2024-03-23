import { TableComponent } from '../tables/table.component';
import { Page } from '@playwright/test';

export type AvailableUsersTestIds =
  | 'name'
  | 'email';

export class UsersTableComponent extends TableComponent {
  constructor(page: Page) {
    super(page, 'users');
  }

  getValueFromEmployeeCell(cell: AvailableUsersTestIds, rowIndex: number) {
    /* Use like:
        - assignedShiftsPage.assignedShiftsTable.getValueFor('shiftId', 0);
    */

    return this.getCellByTestId(rowIndex, cell as string);
  }

  async getUserByValue(
    value: string,
    column: AvailableUsersTestIds,
  ) {
    return (await this.getRowByValue(value, column)).getByRole('link', { name: value, exact: true });
  }
}