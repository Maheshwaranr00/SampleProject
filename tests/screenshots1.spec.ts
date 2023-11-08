import {test,expect} from "@playwright/test";

test('snapshot',async({page})=>{
    await page.goto('https://uat.quiklyz.com');
    await page.locator("//div[text()='Chennai']").click(); 
    // await page.locator('text="FAQs"').nth(0).click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot('scripts/tests/screenshots7.png',{fullPage: true});
})