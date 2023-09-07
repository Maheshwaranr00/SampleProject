import {test,chromium} from "@playwright/test";
test('Quiklyz Automation', async() =>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/");
    await page.locator("xpath=//div[text()='Chennai']").click(); //city selction
    await page.click("span[class='mat-button-wrapper']");    //findcars
    await page.locator('#mat-select-value-1').click();   //dropdown
    await page.locator("text= Latest Additions ").click();   // dropdown option
    await page.locator("text= Audi (1) ").check();   //check boxes
    await page.locator("text= Jeep (2) ").check();    //check boxes
    await page.locator("xpath=//span[text()=' Clear All ']").click();   //clear filters
    await page.locator("xpath=(//mat-icon[normalize-space()='view_list'])[1]").click();  //list view
    await page.locator('xpath=(//div[@class="mat-slider-thumb"])[2]').click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/david/Downloads/Mahesh/scripts/screenshot2.png' });
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();   //How it works
    await page.locator("xpath=(//span[contains(text(),'Car Subscription Process')])[2]").click();  //car subscription
    console.log(await page.locator("(//span[@class='ql-size-huge'])[1]").allInnerTexts()); //text 
    await page.locator("text=Login  ").click(); //Login
    await page.locator("xpath=(//span[normalize-space()='Login'])[1]").click();  //Inner login
    await page.waitForTimeout(2000);   
    await page.getByRole('textbox', { name: 'Enter Mobile Number' }).fill("7834678909");  //mobile number
    await page.pause();
    await page.getByRole('button', { name: 'Get OTP' }).click();   //get otp       
})