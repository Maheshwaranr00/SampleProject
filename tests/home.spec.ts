


import {test,expect} from "@playwright/test";

test('snapshot',async({page})=>{
    await page.goto('https://uat.quiklyz.com');
    await page.locator("//div[text()='Chennai']").click(); 
    // await page.locator('text="FAQs"').nth(0).click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot.png', clip: { x: 30, y: 0, width: 1200, height: 700 } });
})