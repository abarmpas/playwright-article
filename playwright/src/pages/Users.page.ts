import { UserTable } from '@/app/types/userTable';
import { ArticleBasePage } from './base/ArticleBase.page';
import { UsersTableComponent } from '../components/tables/usersTable.component';

export class UsersPage extends ArticleBasePage {
  _url = '/users';
  usersTable = new UsersTableComponent(this.page);

  async openAndKeepUsersData(): Promise<UserTable> {
    const getUsersPromise = this.page.waitForResponse((resp) =>
      resp.url().includes('/api/users'),
    );

    await this.open();

    const responseJson = await (await getUsersPromise).json();
    return responseJson[0];
  }

  async navigateToUser(userId: string) {
    await (
      await this.usersTable.getUserByValue(userId, 'name')
    ).click();
  }

  async navigateToUserByEmail(email: string) {
    await (
      await this.usersTable.getUserByValue(email, 'email')
    ).click();
  }
}