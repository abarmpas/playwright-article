import { expect, Locator } from '@playwright/test';

export async function verifyIsVisible(locator: Locator) {
  await expect(locator).toBeVisible();
}

export async function verifyIsHidden(locator: Locator) {
  await expect(locator).toBeHidden();
}