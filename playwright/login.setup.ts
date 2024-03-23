import { test as setup } from './src/fixtures/base.fixture';
import { verifyIsVisible } from './src/utils/verifications';
import { users } from './src/utils/credentials';

const loginData = [
  { user: users.dev.adminUser },
];

for (const { user } of loginData) {
  const userType =
    user === users.dev.adminUser ? 'admin' : 'user';
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
        },
    );
}