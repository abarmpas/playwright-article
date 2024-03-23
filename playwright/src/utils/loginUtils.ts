import { test } from '../fixtures/base.fixture';

export const loginAsAdmin = () => {
    test.use({ locale: 'en-US' });
};

export const resetStorageState = () => {
  test.use({ storageState: { cookies: [], origins: [] } });
};