import {test,chromium} from "@playwright/test";

let baseUrl = 'https://uat.quiklyz.com/data-service/queryServiceV2';

test('request',async()=>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://uat.quiklyz.com/');
    await page.locator("//div[text()='Chennai']").click();
    await page.locator("span[class='mat-button-wrapper']").first().click()
    await context.clearCookies();
    await page.locator(`(//span[@class="facet-value"])[7]`).click();
    const [request] = await Promise.all([
        page.waitForRequest(re=>
            re.url() == baseUrl            
            )
               //findcars
        ]) 
        await page.waitForLoadState('networkidle');
    console.log(request.postDataJSON());       
})
test.only('response',async()=>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://uat.quiklyz.com/');
    await page.locator("//div[text()='Chennai']").click();
    await page.locator("span[class='mat-button-wrapper']").first().click()
    await context.clearCookies();
    await page.locator(`(//span[@class="facet-value"])[7]`).click();
    const [response] = await Promise.all([        
        page.waitForResponse(re=>
            re.url() == baseUrl                
            ),          
            await page.waitForTimeout(4000)            
        ])         
        const doc = await response.json();
        const datas = doc.entityData;        
        console.log("entity data  : "+[datas],doc);
        console.log("total count  : "+doc.totalCount);
        for(let i=0; i< doc.totalCount;i++){
            console.log("no of seat : "+datas[i].NO_OF_SEAT);
        console.log("brand : "+datas[i].MAKE_NAME);
        console.log("car : "+datas[i].VEHICLE_DISPLAY_NAME);
        console.log("fuel : "+datas[i].FUEL_TYPE_DESC);  
        }
        
})
test.skip('event',async()=>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));
    await page.goto('https://uat.quiklyz.com/');
    await page.locator("//div[text()='Chennai']").click();
    await context.clearCookies();
    await page.locator("span[class='mat-button-wrapper']").first().click();
})