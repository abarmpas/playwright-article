import { defineConfig, devices, expect } from '@playwright/test';
import { matchers } from 'expect-playwright';
import * as dotenv from 'dotenv';
import * as path from 'path';

const getEnvFile = () => {
  const envFile = '.env';
  return `${envFile}.${process.env.TEST_ENVIRONMENT}`
};

dotenv.config({
  path: path.resolve(__dirname, getEnvFile()),
});

expect.extend(matchers);

const getWebServers = () => {
  return [
    {
      command: `npm run ${process.env.TEST_ENVIRONMENT || 'dev'}`,
      url: 'http://localhost:3000/home',
      timeout: 180 * 1000,
      reuseExistingServer: !process.env.CI,
    },
  ];
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright/tests/e2e',
  /* Maximum time one test can run for. */
  timeout: 180 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html',
      { outputFolder: 'playwright/reports/test-reports', open: 'never' },
    ],
    ['list'],
    // [
    //   'allure-playwright',
    //   {
    //     detail: false,
    //     outputFolder: 'playwright/reports/allure-results',
    //     suiteTitle: false,
    //   },
    // ],
    process.env.CI
      ? ['blob']
      : [
          'junit',
          { outputFile: 'playwright/reports/test-reports/junit-results.xml' },
        ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    /*extraHTTPHeaders: {
      Accept: 'application/json',
    },*/
    // Timezone of the context
    timezoneId: 'Europe/London',
    // User locale
    locale: 'en-GB',
    // Toggles bypassing Content-Security-Policy. Useful when CSP includes the production origin.
    bypassCSP: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },

    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './playwright',
      testMatch: '*.setup.ts',
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], browserName: 'chromium' },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'playwright/reports/artifacts/',

  /*
  Run your local dev server before starting the tests
  If app is started in another process, this config is automatically ignored due to "reuseExistingServer"
*/
  webServer: process.env.REMOTE_ENV === 'true' ? [] : getWebServers(),
});
