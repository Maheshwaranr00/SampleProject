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
    //await page.click('xpath=(//div[@class="vjs-poster"])[1]');
    await page.click('xpath=//span[text()="More Videos"]');
   
    //await page.click('xpath=(//button[@aria-label="Play"])[1]');
    await page.click('text=   More   ');
    await page.click('xpath=//span[text()="Compare Cars"]');
    await page.pause();
//car 1 details
    await page.click('xpath=(//mat-label[text()=" Select Brand "])[1]');
    
    await page.click('xpath=//span[text()=" Tata"]');
    await page.pause();
    await page.click('xpath=//mat-label[text()=" Select Model "]');
    
    await page.click('xpath=//span[text()=" Tata Tiago EV "]'); 
    await page.click('xpath=(//mat-label[text()=" Select Variant "])[1]');
    
    await page.click('xpath=//span[text()=" Tiago EV XT Long Range Electric Automatic Metallic Active"]');
//car 2 details
    await page.click('xpath=(//mat-label[text()=" Select Brand "])[1]');
    
    await page.click('xpath=//span[text()=" Volkswagen"]');
    await page.pause();
    await page.click('xpath=//mat-label[text()=" Select Model "]');
    
    await page.click('xpath=//span[text()=" Volkswagen Taigun "]'); 
    await page.click('xpath=(//mat-label[text()=" Select Variant "])[2]');
    
    await page.click('xpath=//span[text()=" Taigun Comfortline 1.0 TSI Petrol Manual Metallic Active"]');
//car 3 details
    await page.click('xpath=(//mat-label[text()=" Select Brand "])[1]');
    
    await page.click('xpath=//span[text()=" Audi"]');
    await page.pause();
    await page.click('xpath=//mat-label[text()=" Select Model "]');
    
    await page.click('xpath=//span[text()=" Audi e-tron "]'); 
    await page.click('xpath=(//mat-label[text()=" Select Variant "])[3]');
    
    await page.click('xpath=//span[text()=" e-tron 50 Electric Automatic Metallic Active"]');

    await page.click('xpath=//mat-panel-title[text()=" Features "]');
    await page.click('(//span[@class="mat-radio-outer-circle"])[2]');

    await page.click('(//span[@class="fa fa-close car-removal-icon"])[1]');
    //await page.click('(//span[@class="mat-radio-outer-circle"])[1]');
    await page.click('xpath=//mat-panel-title[text()=" Features "]');
    await page.click('xpath=//mat-panel-title[text()=" Specifications "]');
    await page.click('(//span[@class="mat-button-wrapper"])[40]');

    await page.pause();
   
})