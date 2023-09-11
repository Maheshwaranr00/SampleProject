import {test,chromium} from "@playwright/test";

test('How it works',async()=>{
    const browser =await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://uat.quiklyz.com/');
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();   //How it works
    await page.locator("xpath=(//span[contains(text(),'Car Subscription Process')])[2]").click();  //car subscription
    console.log(await page.locator("(//span[@class='ql-size-huge'])[1]").allInnerTexts()); //text 
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();  //How it works
    await page.click('xpath=//span[text()="Subscription Benefits"]');  //subscription benefits
    await page.click('xpath=//')
})