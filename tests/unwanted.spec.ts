import {test,expect} from "@playwright/test";
const BaseUrl = "https://uat.quiklyz.com";  
test('homepage mouse hover',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.locator('//img[@alt="image"]').hover(); 
    await page.click('text= View Details ');
    await expect(page).toHaveURL('https://uat.quiklyz.com/car-detail/MarutiSuzuki-Swift-Lxi-Petrol-Manual');
    await page.click('xpath=//span[text()=" Lxi "]'); 
    await page.click('xpath=//a[text()="  Swift Lxi Petrol Manual Metallic Active  "]');
    await page.waitForLoadState();
    await page.click('xpath=(//span[@class="color-round"])[6]');
    await page.click('xpath=(//span[text()=" Check my Eligibility "])');
    await page.waitForLoadState();   
})
test('List View',async({page})=>{
    await page.goto(BaseUrl);                                                                  //rework
    await page.locator("xpath=//div[text()='Chennai']").click(); //city selction     //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    await page.locator("span[class='mat-button-wrapper']").first().click(); 
    await page.locator('mat-icon[class*="active mat-icon-no-color"]').first().click();  //list view    
    await page.waitForLoadState();
    await page.pause();
    //await page.screenshot({ path: 'C:/Users/david/Downloads/Mahesh/scripts/screenshot2.png' });
})
test('How it works - subscription benefits',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();   //How it works
    await page.click('xpath=//span[text()="Subscription Benefits"]'); 
    await expect(page).toHaveURL('https://uat.quiklyz.com/how-car-leasing-individuals-India/car-lease-benefits'); //subscription benefits
    await page.click('text=Quiklyz Subscription vs Buying a Car on Loan');   
    await expect(page).toHaveURL('https://uat.quiklyz.com/page/4e15b08e-061d-42fd-9b8c-0d5bdfbc4571/4063b97b-f531-44e4-a880-5c597913d106');
    await page.goBack();
    await page.click('//span[text()="Find your Car"]');   
    await expect(page).toHaveURL('https://uat.quiklyz.com/car-lease-search');
    await page.goBack();
    await page.locator('//span[text()="Check your Eligibility"]').click();
    await expect(page).toHaveURL('https://uat.quiklyz.com/login');
    await page.waitForLoadState();    
    console.log('Pages successfully navigated');   
})
test('Ask an Expert - url validation',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();
    await page.click('xpath=//span[text()="Ask an Expert"]'); 
    await expect(page).toHaveURL('https://uat.quiklyz.com/contact-us');
})
test('how it works - videos',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();
    await page.click('xpath=//span[text()="Videos"]'); 
    expect(page).toHaveURL('https://uat.quiklyz.com/videos');
})//today
test('Compare Cars',async({page})=>{   //requires rework @@@@@@@@@@@@
    await page.goto(BaseUrl);
    await page.locator("//div[text()='Chennai']").click(); 
    await page.click('text=   More   ');
    await page.click('xpath=//span[text()="Compare Cars"]');//car
    await page.locator('(//div[contains(@class,"mat-select-arrow-wrapper")])[1]').click();        
    await page.locator('//span[text()=" Tata"]').click();
    await page.waitForLoadState();
    await page.locator('div[class*="mat-select-arrow"]').nth(3).click();       
    await page.locator('//span[text()=" Tata Tiago EV "]').click(); 
    await page.waitForLoadState(); 
    await page.locator('div[class*="mat-select-arrow"]').nth(5).click();        
    await page.locator('//span[text()=" Tiago EV XT Long Range Electric Automatic Metallic Active"]').click();
    await page.waitForLoadState();//car 2 details
    await page.locator('text=" Select Brand "').first().click();        
    await page.locator('text=" Volkswagen"').click();
    await page.waitForLoadState();
    await page.locator('//mat-label[text()=" Select Model "]').click();    // Tiago EV XT Long Range Electric Automatic Metallic Active 
    await page.locator('//span[text()=" Volkswagen Taigun "]').click();    // Tiago EV XT Long Range Electric Automatic Metallic Active 
    await page.waitForLoadState();
    await page.locator('(//mat-label[text()=" Select Variant "])[2]').click();   
    await page.locator('//span[text()=" Taigun Comfortline 1.0 TSI Petrol Manual Metallic Active"]').click();
    await page.waitForLoadState();//car 3 details
    await page.locator('(//mat-label[text()=" Select Brand "])[1]').click();        
    await page.locator('//span[text()=" Audi"]').click();
    await page.waitForLoadState();
    await page.click('//mat-label[text()=" Select Model "]');    
    await page.click('//span[text()=" Audi e-tron "]'); 
    await page.waitForLoadState();
    await page.locator('(//mat-label[text()=" Select Variant "])[3]').click();    
    await page.locator('//span[text()=" e-tron 50 Electric Automatic Metallic Active"]').click();
    await page.waitForLoadState();
    await page.click('//mat-panel-title[text()=" Features "]');
    await page.click('(//span[@class="mat-radio-outer-circle"])[2]');
    await page.click('(//span[@class="fa fa-close car-removal-icon"])[1]');   
    await page.click('//mat-panel-title[text()=" Features "]');
    await page.click('//mat-panel-title[text()=" Specifications "]');
    await page.click('(//span[@class="mat-button-wrapper"])[40]');
    const price1 = await page.locator('//span[text()=" ₹2,53,599"]').textContent();
    const price2 = await page.locator('//span[text()=" ₹34,799"]').textContent();
    console.log(price1,price2);      
})//today
test('Image carouse',async({page})=>{ //does not working @@@@@@@@@@@@@@@@@@
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    for(let i = 1; i<7;i++){
        await page.locator(`(//button[@data-glide-dir="=colIndex"])[${i}]`).click();
    }
    const browseCars = page.locator('(//span[text()="BROWSE ALL CARS"])[1]');
    await browseCars.click();
    expect(page).toHaveURL('https://uat.quiklyz.com/car-lease-search');
    await page.goBack();
    const knowMore = page.locator('//span[text()="KNOW MORE"]');
    await knowMore.click();
    expect(page).toHaveURL('https://uat.quiklyz.com/blog/assured-buyback-vs-flexi-advantage-car-buyback');
})