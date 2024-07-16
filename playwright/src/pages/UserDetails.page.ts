import { expect } from '@playwright/test';
import { ArticleBasePage } from './base/ArticleBase.page';
import { UserTable } from '@/app/types/userTable';
import { verifyIsVisible } from '../utils/verifications';

export class UserDetailsPage extends ArticleBasePage {
  userNameField = this.page.locator('#username-text');
  userEmailField = this.page.locator('#email-text');

//   async backToEmployees() {
//     await this.backToEmployeesButton.click();
//   }

  async userDetailsValidation(user: UserTable) {
    // Adding wait due to the lack of speed in BE response
    await this.page.waitForResponse((resp) =>
      resp.url().includes(`/api/users/${user.id}`),
    );
    await expect(this.userNameField).toMatchText(`${user.name}`);

    await expect(this.userEmailField).toContainText(`${user.email}`);
    }
}