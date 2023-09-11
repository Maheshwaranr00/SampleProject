import {test,chromium} from "@playwright/test";

test('Quiklyz Corporate', async() => {
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/"); 
    await page.fill('xpath=(//input[@type="text"])[23]',"Chennai");
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.locator('xpath=(//button[@type="button"])[1]').click();
    await page.click('xpath=(//button[@role="menuitem"])[12]');
    await page.click('xpath=//a[text()="Corporate"]');
    const string1 = await page.locator('text=PAN India Presence ').textContent();
    console.log(string1);
    await page.click('xpath=(//div[@class="mat-tab-label-content"])[2]');
    const string2 = await page.locator('xpath=//span[contains(text(),"Quiklyz, multiple-brand")]').textContent();
    console.log(string2);
    await page.click("xpath=(//span[@class='mat-button-wrapper'])[2]");
    await page.waitForTimeout(2000);  
    await page.locator('xpath=(//input[@type="text"])[2]').fill("Mahindra Thar");
    await page.waitForTimeout(2000);  
    console.log(await page.locator('text= Ex Showroom:₹').allTextContents());
    await page.pause();
   // console.log(await page.locator('text=10,54,499').textContent());    
    //await page.keyboard.press('Enter');   
})
test('Quiklyz Business', async() => {
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/");
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.click('xpath=//a[text()="Business"]');
    console.log(await page.locator('xpath=(//p[@class="ql-align-center"])[2]').textContent());
    await page.click('(//mat-icon[@role="img"])[1]');
    page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/david/Downloads/Mahesh/scripts/tests/screenshot2.png' });
    
})