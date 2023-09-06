import {test,chromium} from "@playwright/test";

test('Quiklyz2',async() => {
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/");   
    await page.locator("xpath=//div[text()='Chennai']").click();  
    const string = await page.locator('xpath=//span[@class="ql-size-large" ]').allTextContents();
    console.log(string);               
    await page.locator('xpath=(//a[text()=" Read More"])[1]').click();
    await page.locator('xpath=(//a[text()=" Less"])[1]').click();   
    await page.locator('xpath=(//mat-icon[text()="add" ])[1]').click();
    const string2 = await page.locator('xpath=//p[contains(text(),"Unlike the self-drive car")]').allTextContents();
    console.log(string2);
    await page.locator('xpath=(//mat-icon[@role="img" ])[1]').click();
    await page.locator('xpath=(//mat-icon[text()="add" ])[2]').click();
    const string3 = await page.locator('xpath=(//span[contains(text(),"One Monthly Fee" )])').allTextContents();
    console.log(string3);
    await page.locator('xpath=(//mat-icon[@role="img" ])[2]').click();
    await page.locator('xpath=(//mat-icon[text()="add" ])[3]').click();
    const string4 = await page.locator('xpath=(//li[contains(text(),"Strong relationships with " )])').allTextContents();
    console.log(string4);
    await page.locator('xpath=(//mat-icon[@role="img" ])[3]').click();
    await page.locator("xpath=//span[text()='View All']").click();

    //await page.locator('xpath=(//span[@class="actionLabel" ])[11]').click();
    await page.pause();       
})