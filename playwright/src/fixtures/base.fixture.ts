import { mergeTests } from '@playwright/test';
import { test as pageTest } from './page.fixture';
import { test as utilsTest } from './utils.fixture';

export const test = mergeTests(pageTest, utilsTest);

export { expect } from '@playwright/test';