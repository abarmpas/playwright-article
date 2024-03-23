import { test as setup } from './src/fixtures/base.fixture';
import { verifyIsVisible } from './src/utils/verifications';
import { users } from './src/utils/credentials';
import { adminStorageState } from './src/utils/loginUtils';
import * as fs from 'fs';

const loginData = [
  { file: adminStorageState, user: users.dev.adminUser },
];

for (const { file, user } of loginData) {
  const userType =
    user === users.dev.adminUser ? 'admin' : 'user';
    // If storageState exists and is later than 600sec, then skip login
  const threshold = 600 * 1000;
  const minutes = threshold / 60000;
  const stats = fs.existsSync(file) ? fs.statSync(file) : null;
  if (stats && stats.mtimeMs > new Date().getTime() - threshold) {
    // eslint-disable-next-line no-console
    console.log(
      `Skipping login for ${userType}: earlier than ${minutes} minutes`,
    );
  } else { 
    setup(
      `login as ${userType}`,
      async ({ page, baseURL, loginPage, basePage }) => {
        await page.goto('/home');

        const { username, password } = user;
        console.log(`LoginSetup (${userType}): Performing UI login`);
        await loginPage.login(username, password);
        await loginPage.goToHome();
        // await verifyIsVisible(basePage.sideMenu.welcomeMessage);

        await page
            .context()
            .addCookies([
            { name: 'devtools_ignore', value: 'true', url: baseURL },
            ]);
        await page.context().storageState({ path: file });
        },
    );
  }
}