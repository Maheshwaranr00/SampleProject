import {test,chromium, expect} from "@playwright/test";     //xpath=//span[text()="PAN India Presence "]

test('Homepage',async() => {
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/");   
    await page.locator("xpath=//div[text()='Chennai']").click();  //city
    const string = await page.locator('xpath=//span[@class="ql-size-large" ]').allTextContents(); //text below the video
    console.log(string);               
    await page.locator('xpath=(//a[text()=" Read More"])[1]').click();  //first read more
    await page.locator('xpath=(//a[text()=" Less"])[1]').click();   // same   
    await page.pause();
        
})