import { mergeTests } from '@playwright/test';
import { test as pageTest } from './page.fixture';
import { test as utilsTest } from './utils.fixture';
import { test as clientsTest } from './clients.fixture';

export const test = mergeTests(pageTest, utilsTest, clientsTest);

export { expect } from '@playwright/test';