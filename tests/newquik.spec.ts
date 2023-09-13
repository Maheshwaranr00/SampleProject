import {test,chromium} from "@playwright/test";

test('homepage mouse hover',async()=>{
    const browser =await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://uat.quiklyz.com/');
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.hover('xpath=//img[@alt="image"]'); //car 
    await page.click('text= View Details ');//view details
    await page.click('xpath=//span[text()=" Lxi "]'); 
    await page.click('xpath=//a[text()="  Swift Lxi Petrol Manual Metallic Active  "]');
    await page.waitForTimeout(2000);
    await page.click('xpath=(//span[@class="color-round"])[6]');
    await page.click('xpath=(//span[text()=" Check my Eligibility "])');
    await page.waitForTimeout(2000);
   
})