import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  headless : false
  await page.goto('https://demo.guru99.com/V4/');
  await page.locator('input[name="uid"]').click();
  await page.locator('input[name="uid"]').fill('mahesh');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('12345');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'LOGIN' }).click();
});

