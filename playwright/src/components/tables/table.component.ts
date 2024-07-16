import { BasePage } from '../../pages/base/Base.page';
import { Page } from '@playwright/test';
import { verifyIsVisible } from '../../utils/verifications';

export class TableComponent extends BasePage {
  private readonly rowsSelector = 'tbody tr';

  component = this.page.locator(`#${this.testId}-table`);
  rows = this.component.locator(this.rowsSelector);

  constructor(page: Page, readonly testId: string) {
    super(page);
  }

  get() {
    return this.component;
  }

  async verifyIsLoaded() {
    await verifyIsVisible(this.component);
  }

  getHeader() {
    return this.component.locator('thead tr');
  }

  getCell(rowIndex: number, cellIndex: number) {
    return this.rows.nth(rowIndex).locator('td').nth(cellIndex);
  }

  getCellByTestId(rowIndex: number, testId: string, hasText?: string | RegExp) {
    return this.rows
      .nth(rowIndex)
      .locator(`td[id="${testId}"]`, { hasText });
  }

  getAllCellsByTestId(testId: string, hasText?: string | RegExp) {
    return this.component.locator(`td[id="${testId}"]`, { hasText });
  }

  async getRowByValue(value: string, columnTestId: string) {
    return this.component.locator(this.rowsSelector, {
      has: this.page.getByRole('cell', { name: `${value}`, exact: true })
    })
  }
}