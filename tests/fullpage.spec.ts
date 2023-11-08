import { test, expect } from '@playwright/test';

test('find cars', async ({ page }) => {
  await page.goto('https://www.quiklyz.com/car-lease-search', { waitUntil: 'networkidle' });
  //await page.waitForTimeout(5000);
  await expect(page).toHaveScreenshot('find.png',{ fullPage: true ,mask: [page.locator('//div[@class="container-fluid bluev2 findcardetail card-default fgcustomcontainer ng-star-inserted"]')]} );
});