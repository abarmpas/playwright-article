import { test } from '../fixtures/base.fixture';

export const adminStorageState = 'playwright/auth/adminStorageState.json';

export const loginAsAdmin = () => {
  test.use({ storageState: adminStorageState });
};

export const resetStorageState = () => {
  test.use({ storageState: { cookies: [], origins: [] } });
};