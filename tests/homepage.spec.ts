import {test,expect} from "@playwright/test";

const BaseUrl = "https://uat.quiklyz.com/";

test('find cars of home page',async({page}) => {    
    await page.goto(BaseUrl);
    await page.locator("//div[text()='Chennai']").click();  //city    
    for(let i=1; i<14; i++){
    await page.locator("//span[text()=' All Brands']").click();
    await page.locator(`(//button[@role='menuitem'])[${i}]`).click();
    const selectedBrand = await page.locator(`(//button[@role='menuitem'])[${i}]`).textContent();
    if (selectedBrand!=' All Brands') {
        await page.locator("(//span[text()='Find Cars'])[1]").click();
        await page.waitForLoadState();
    const carNames = await page.locator("//a[@class='fieldvalue make-name ng-star-inserted']").allTextContents();
    console.log(carNames);
    for(let i = 0; i<carNames.length;i++){
        console.log(carNames[i]);
        expect(carNames[i]).toContain(selectedBrand);
    }
    console.log('Selected Brand :'+selectedBrand);
    console.log('Displayed cars :'+carNames);
    await page.locator('(//img[@class="fg-primary-logo ng-star-inserted"])').click();
    }
    else{
    console.log('Checking');
    await page.locator("//span[text()=' All Brands']").click();
    await page.locator(`(//button[@role='menuitem'])[${i+1}]`).click();
    const selectedBrand1 = await page.locator(`(//button[@role='menuitem'])[${i+1}]`).textContent();
    await page.locator("(//span[text()='Find Cars'])[1]").click();
    const carNames1 = await page.locator("//a[@class='fieldvalue make-name ng-star-inserted']").allTextContents();
    for(let i = 0; i<carNames1.length;i++){
        expect(carNames1[i]).toContain(selectedBrand1);
    }
    console.log('Selected Brand :'+selectedBrand1);
    console.log('Displayed cars :'+carNames1);
    await page.locator('(//img[@class="fg-primary-logo ng-star-inserted"])').click();
    expect(page).toHaveURL(BaseUrl);
}
}
})
test(`find cars of home page1`,async({page}) => {    
        await page.goto(BaseUrl);
        await page.locator("//div[text()='Chennai']").click();  //city    
    for(let i=1; i<14; i++){
        if( i==4 || i==8){i++;}
        await page.locator("//span[text()=' All Brands']").click();   
        await page.locator(`(//button[@role='menuitem'])[${i}]`).click();  
        const selectedBrand = await page.locator(`(//button[@role='menuitem'])[${i}]`).textContent();
        const string = selectedBrand?.substring(1,4);               
        await page.locator("(//span[text()='Find Cars'])[1]").click();            
        if(string=='Hyu'){ await page.locator(`(//a[contains(text(),'${string}')])`).nth(3).waitFor({state: 'visible'});}
        await page.locator(`(//a[contains(text(),'${string}')])`).first().waitFor({state: 'visible'});
        await expect(page.locator(`(//a[contains(text(),'${string}')])[1]`)).toBeVisible();  
        const carNames = page.locator(`(//a[contains(text(),'${string}')])`);        
        const Names = await carNames.allTextContents();   
        console.log('Number of cars : '+Names.length);
        for(let i = 0; i< Names.length;i++){
            expect(Names[i]).toContain(string);
        }
    console.log('Selected Brand :'+selectedBrand);
    console.log('Displayed cars :'+Names);
    await page.locator('(//img[@class="fg-primary-logo ng-star-inserted"])').click();
    }
})
test('Quiklyz Life',async({page})=>{
    await page.goto(BaseUrl);
    await page.waitForURL(BaseUrl);
    await page.locator("//div[text()='Chennai']").click();  //city    
    await page.locator('(//button[@class="glide__bullet ng-star-inserted Inactivedot"])[6]').click();
    await page.locator('(//button[@class="glide__bullet ng-star-inserted Inactivedot"])[7]').click();    
})//(//div[@class="col align-self-center"] //p)[3]
test('Counting',async({page})=>{   
    await page.goto(BaseUrl);         
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click();
    const checkBox = page.locator('(//span[@class="facet-value"])[9]');
    const car =page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]');
    await checkBox.click();
    const checkBoxString = await checkBox.textContent();
    const titles = await car.allTextContents();
    console.log(checkBoxString, titles.length);
})