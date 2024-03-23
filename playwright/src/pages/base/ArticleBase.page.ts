import { expect, Locator } from '@playwright/test';
import { BasePage } from './Base.page';
// import { SideMenuComponent } from '@components/sidemenu/sideMenu.component';

export class ArticleBasePage extends BasePage {
//   sideMenu = new SideMenuComponent(this.page);

//   async navigateToHomePage() {
//     await this.sideMenu.navigateFromSideMenu({
//       section: 'Employee',
//       choice: appPath('/'),
//     });
//     await expect(this.page).toHaveURL(appPath('/'));
//   }

//   async logout() {
//     await this.header.logOutButton.click();
//     await expect(this.header.logOutButton).toBeHidden();
//   }
}