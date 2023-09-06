import {test,chromium} from "@playwright/test"
import { ViewportSize } from "@playwright/test";
test('ultimateqa', async() => {
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://ultimateqa.com/automation/");   
    await page.setViewportSize({ 'width': 1366, 'height': 768 });
    await page.getByLabel('Close').click();
    await page.locator("text=Login automation").click();    
    await page.locator("id=user[email]").fill("mahesh@gmail.com");
    await page.locator("id=user[password]").fill("mahesh@gmail.com");
    await page.locator("button[type=submit]").click();    
    await page.goBack();
    await page.click("text=Blog");
    await page.click("text=Success Stories");
    console.log(await page.locator('h3').allTextContents());
   
   await page.pause();
})