import {test,chromium} from "@playwright/test";

test('New Options', async()=>{
    const browser =await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://uat.quiklyz.com/');
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.click('xpath=//div[text()="SUV"]');
    const string = await page.locator('xpath=//span[text()=" Mahindra XUV400 "]').textContent();
    console.log(string);
    await page.waitForTimeout(2000);    
   
    await page.click('xpath=//span[text()="More Videos"]');
   
    
})