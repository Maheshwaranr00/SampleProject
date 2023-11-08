import {test,expect, chromium} from "@playwright/test";

const BaseUrl = "https://uat.quiklyz.com";    
test('Validating brand selecting drop down of home page',async({page}) => {    
    await page.goto(BaseUrl);
    await page.locator("//div[text()='Chennai']").click();      
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
    
test('Validating buttons in Homepage',async({page}) => {    
    await page.goto(BaseUrl);   
    await page.locator("//div[text()='Chennai']").click();  //city      
    const button1 = page.locator('xpath=(//a[text()=" Read More"])[1]');  //Why subscribe to a car on Quiklyz?
    await button1.click();
    expect(button1).toBeHidden();   
    await page.locator('xpath=(//a[text()=" Less"])[1]').click();   // same               
    const button= page.locator('//a[text()=" View All"]');
    await button.click();
    expect(button).toBeHidden();
    await page.click('//a[text()=" View Less"]');
    const button2 = page.locator('(//a[text()=" Read More"])[2]');   //Frequently (And Not-So-Frequently) Asked Questions
    await button2.click();
    expect(button2).toBeHidden();
    await page.locator('//a[text()=" Less"]').click();
    await page.click('//span[text()="Check My Eligibility"]');
    await page.waitForURL('https://uat.quiklyz.com/login');
    expect(page).toHaveURL('https://uat.quiklyz.com/login');
    await page.goBack();
    await page.click('xpath=//span[text()="More Videos"]');
    expect(page).toHaveURL('https://uat.quiklyz.com/videos');
    await page.goBack();
    await page.locator('(//span[text()="View All Benefits"])[1]').click();
    expect(page).toHaveURL('https://uat.quiklyz.com/how-car-leasing-individuals-India/car-lease-benefits');
})
test('Accordian',async({page})=>{    
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();    
    const lessButton = page.locator('//mat-icon[text()="remove"]');
    for(let i=0; i<10; i++){
    const field = page.locator(`div[aria-setsize="10"] .mat-tab-label-content`).nth(i);
    const name = field.textContent();
    await field.click();    
    const add = await page.locator('//mat-icon[text()="add"]').allTextContents();
    console.log(name, "count",add.length);
    await page.waitForTimeout(2000);
    for(let j=1;j <= add.length; j++){
        await expect(page.locator(`(//mat-icon[text()="add"])[${j}]`)).toBeVisible();
        await page.locator(`(//mat-icon[text()="add"])[${j}]`).click();  // Accordian
        await expect(lessButton, `${name},${j}`).toBeVisible();
        await lessButton.click(); 
    }    
    }
})
test('Clear All in Find cars', async({page}) =>{      
    const checkbox1 = page.locator("text= Audi (1) ");
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); //city selction
    await page.locator("span[class='mat-button-wrapper']").first().click();    //findcars
    await page.locator('#mat-select-value-1').click();   //dropdown
    await page.locator("text= Latest Additions ").click();   // dropdown option
    await checkbox1.check();
    const string = await checkbox1.textContent();
    let b = string?.substring(1,4); //check boxes    
    await expect(page.locator('//a[contains(text(),"Audi")]')).toBeVisible();
    const car = page.locator('//a[@class="fieldvalue make-name ng-star-inserted"]');
    const title = await car.textContent();
    console.log(title);
     expect(title).toContain(b);
    await page.locator("//span[text()=' Clear All ']").click(); 
    const title1 = await car.first().textContent();
    expect(title1).not.toContain(b);  //clear filters              
})
test('Compare cars in Find cars',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); //city selction
    await page.locator("span[class='mat-button-wrapper']").first().click(); 
    await page.locator('i[class="inner fa fa-exchange fa-stack-1x"]').first().click();
    await page.locator('i[class="inner fa fa-exchange fa-stack-1x"]').nth(2).click();
    await page.locator('i[class="inner fa fa-exchange fa-stack-1x"]').nth(3).click();
    const removeAll = page.locator('//button[text()="Remove All"]');
    expect(removeAll).toBeVisible();
    await page.locator('//button[contains(text(),"Compare")]').click();
    expect(page).toHaveURL('https://uat.quiklyz.com/car-leasing/compare');
    await page.locator('text=" Specifications "').click();
    const price = await page.locator('span[class*="price align-self-center"]').allTextContents();
    console.log(price);    
})
test('Login',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("text=Login  ").click(); //Login
    await page.locator("xpath=(//span[normalize-space()='Login'])[1]").click();  //Inner login
    await page.waitForLoadState();  
    await page.getByRole('textbox', { name: 'Enter Mobile Number' }).fill("7834678909");  //mobile number   
    await page.getByRole('button', { name: 'Get OTP' }).click();//get otp
    console.log(await page.locator('#swal2-html-container').textContent());
})   
test(`FAQ`,async({page})=>{    
    const queries= ["","How is car leasing beneficial to your organisation?",
    "What is the tenure for which I can Quiklyz a car?",
    "When do I need to pay the monthly subscription fee?", 
    "Which cars can I subscribe to on Quiklyz?",
    "How do I subscribe to a car on Quiklyz?",
    "How do I get the car service arranged?",
    "How old do I need to be to subscribe to a car on Quiklyz?",
    "What is Assured Buyback product offering?"];
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();   
    await page.locator("xpath=//span[text()='View All']").click(); // below the accordian It will navigate to FAQ
    for(let i=1; i<9; i++){ 
    await page.locator(`xpath=(//div[@class="mat-tab-label-content"])[${i}]`).click();
    const field = await page.locator(`xpath=(//div[@class="mat-tab-label-content"])[${i}]`).textContent();
    await page.waitForLoadState();
    await page.locator("xpath=//a[text()='Expand All']").click();
    await page.locator('xpath=(//input[@type="text"])[1]').
    fill(queries[i]);
    await page.keyboard.press("Enter");   
    const add = await page.locator('//mat-icon[text()="add"]').allTextContents();
    expect(add.length, `${field}`).toEqual(1);     
    await page.locator('(//a[text()="Expand All"])').click();
    console.log('Query is shortlisted from '+field);    
    }})
test('Validating HomePage Icon', async({page}) => {    
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.click('xpath=//a[text()="Business"]');
    await page.click('(//mat-icon[@role="img"])[1]');
    expect(page).toHaveURL('https://uat.quiklyz.com/');    
})
test('How it works Url validation',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();   //How it works
    await page.locator("xpath=(//span[contains(text(),'Car Subscription Process')])[2]").click();  //car subscription
    await expect(page).toHaveURL('https://uat.quiklyz.com/how-car-leasing-individuals-India/car-lease-process');
    console.log(await page.locator("(//span[@class='ql-size-huge'])[1]").allInnerTexts()); //text 
    await page.click('//span[text()="Browse Cars"]');   
    expect(page).toHaveURL('https://uat.quiklyz.com/car-lease-search');
    await page.goBack();   
    await page.waitForLoadState();
    await page.locator('//span[text()="Check Eligibility"]').click();
    await expect(page).toHaveURL('https://uat.quiklyz.com/login');
    console.log('Pages successfully navigated');      
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();   //How it works
    await page.click('xpath=//span[text()="Subscription Benefits"]');  //subscription benefits
    await expect(page).toHaveURL('https://uat.quiklyz.com/how-car-leasing-individuals-India/car-lease-benefits');
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
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();
    await page.click('xpath=//span[text()="Ask an Expert"]'); 
    await expect(page).toHaveURL('https://uat.quiklyz.com/contact-us');
    await page.locator("(//span[@class='mat-button-wrapper'])[2]").click();
    await page.click('//span[text()="Videos"]'); 
    await expect(page).toHaveURL('https://uat.quiklyz.com/videos');    
    console.log('URLs are successfully validated');
})

test('how it works - Ask an Expert',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();
    await page.click('xpath=//span[text()="Ask an Expert"]'); 
    await page.fill('//input[@data-placeholder="Enter Your Name *"]',"Mahesh");
    await page.fill('//input[@data-placeholder="Contact Number *"]',"6598767896");
    await page.fill('//input[@data-placeholder="Enter the Email"]',"Maheshwaran@gmail.com");
    await page.click('//span[text()="Select City *"]');
    await page.click('//span[text()=" Chennai "]'); 
    expect(page.locator('text="Submit Request"')).toBeDisabled();
    console.log('the submit request button is disabled ');
    await page.fill('//textarea[@data-placeholder="Type Message"]',"fgkjghhgljkgcjhfl");
    expect(page.locator('text="Submit Request"')).toBeEnabled();
    console.log('After entering the comments submit request button becomes enabled');
    await page.click('text="Submit Request"');
})
test('registration',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("text=Login  ").click(); //Login
    await page.click('text= Start here');
    await page.fill('xpath=//input[@data-placeholder="Enter your First Name"]','Mahesh');
    await page.fill('xpath=//input[@data-placeholder="Enter your Last Name"]','Rajendran');
    await page.fill('xpath=//input[@data-placeholder="Enter your Email Address"]','mahesh@gmail.com');
    await page.fill('xpath=//input[@data-placeholder="Enter your Mobile Number"]','6756454542');   
    await page.click('xpath=//span[@class="mat-checkbox-inner-container"]');
    await page.click('xpath=//span[text()="Register"]');
    await page.waitForLoadState();
    console.log(await page.locator('#swal2-html-container').textContent());
    await page.click('xpath=//button[text()="OK"]');
})
test('Pagination',async({page})=>{   
    const car =page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]');
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click(); 
    await page.locator('(//a[@class="fieldvalue make-name ng-star-inserted"])[1]').waitFor({state:"visible"});
    const carName1 = await car.allTextContents();
    console.log("Number of cars in the First Page:"+carName1.length);
    await page.click('(//a[@class="page-link"])[4]');
    const carName2 = await car.allTextContents();
    console.log("Number of cars in the Second Page:"+carName2.length);
    await page.click('(//a[@class="page-link"])[5]');
    const carName3 = await car.allTextContents();
    console.log("Number of cars in the Third Page:"+carName3.length);
    await page.click('(//a[@class="page-link"])[6]');
    const carName4 = await car.allTextContents();
    console.log("Number of cars in the Fourth Page:"+carName4.length);
    await page.click('(//a[@class="page-link"])[6]');
    const carName6 = await car.allTextContents();
    console.log("Number of cars in the fifth Page:"+carName6.length);
    await page.click('(//a[@class="page-link"])[6]');
    await page.waitForLoadState();
    const carName5 = await car.allTextContents();
    console.log("Number of cars in the Sixth Page:"+carName5.length);   
    })
test(`Check Box filter`,async({page})=>{       
    const car =page.locator('//a[@class="fieldvalue make-name ng-star-inserted"]');
    const checkBox =await page.locator('//span[@class="facet-value"]').allTextContents();    
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click(); 
    for(let i=1; i < 16; i++){
    const checkBox1 = page.locator(`(//span[@class="facet-value"])[${i}]`);
    await checkBox1.check();       
    await page.waitForLoadState('networkidle');    
    const string = await checkBox1.textContent();    
    let b = string?.substring(1,4);
    await page.locator(`//a[contains(text(),"${b}")]`).first().waitFor({state:"visible"});
    console.log("Selected CheckBox :"+string);
    const title = await car.allTextContents();
    console.log("Number of cars :"+title.length,title);    
    for(let i =0; i< title.length; i++){
        expect(title[i]).toContain(b);
    }
    console.log("Car Names are shortlisted according to the selected checkbox ");
    await checkBox1.uncheck();
    await page.waitForLoadState();
}})
test('Validating Sliders',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click();       
    const targetValue = 0.2; 
    const targetValue2 = -0.2;    
    const sliderHandle = page.locator('div[class="mat-slider-thumb"]').first();    
    const slider = page.locator('mat-slider[role="slider"]').first();      
    const sliderBoundingBox = await slider.boundingBox();
    console.log(sliderBoundingBox?.width,sliderBoundingBox?.height);
    if(sliderBoundingBox != null)
    {
        await sliderHandle.dragTo(sliderHandle, {
            force: true,
            targetPosition: {
              x: sliderBoundingBox.width * targetValue,
              y: 0}
          });
    }else throw new Error("No Element")  
    const sliderHandle2 = page.locator('div[class="mat-slider-thumb"]').nth(1);
    if(sliderBoundingBox != null)
    {
        await sliderHandle2.dragTo(sliderHandle2, {
            force: true,
            targetPosition: {
              x: sliderBoundingBox.width * targetValue2,
              y: 0}
          });
    }else throw new Error("No Element")  
    const price = await page.locator('//span[@class="facet-value ng-star-inserted"]').textContent();
    console.log(price);  
    await page.locator('//span[@class="fieldvalue ml-1 ng-star-inserted"]').first().waitFor({state:"visible"});
    const price1 = await page.locator('//span[@class="fieldvalue ml-1 ng-star-inserted"]').allTextContents();
    console.log(price1);    
  });
test('First & Last in Find cars',async({page})=>{    
    await page.goto(BaseUrl);    
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click();
    expect(page.locator('text="First"')).toBeHidden();
    console.log('the First link is in hidden mode');
    await page.locator('//a[text()="4"]').click();    
    console.log(await page.locator('//a[text()="First"]').textContent());
    console.log(await page.locator('//a[text()="Last"]').textContent());
    expect(page.locator("text='First'")).toContainText('First');
    expect(page.locator('//a[text()="Last"]')).toBeVisible();      
    console.log('The First and Last should be visible');
    await page.locator("text='Last'").click();
    expect(page.locator('text="Last"')).toBeHidden();
    console.log('the Last link is in hidden mode');
    })

test('Blogs',async({page})=>{
    await page.goto(BaseUrl); 
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator('(//span[@class="mat-button-wrapper"])[8]').click();
    await page.locator('//span[text()="Blog"]').nth(1).click();   
    await page.click('//button[text()="Load More"]');
    await page.screenshot({path:'C:/Users/david/Downloads/Mahesh/script2/scripts/tests/screenshots.png'})
    await page.click('//button[text()="Load Less"]');
    await page.locator('[title*="Advantage Buyback"]').click();
    await page.locator('[style*="font-family"]').first().waitFor({state:"visible"});
    console.log(await page.locator('[style*="font-family"]').allTextContents());
    await page.goBack();
    await page.locator('[title*="About Car Subscription"]').click();
    await page.locator('//p[contains(text(),"those new to the concept")]').first().waitFor({state:"visible"});
    console.log(await page.locator('//p[contains(text(),"those new to the concept")]').allTextContents());
})//today
test('About Us',async({page})=>{
    await page.goto(BaseUrl); 
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.click('text="   More   "');
    await page.click('(//span[text()="About Us"])[2]');
    await page.locator('//p[@class="ql-align-justify"]').first().waitFor({state:"visible"});
    console.log(await page.locator('//p[@class="ql-align-justify"]').allTextContents());
})

test('Booking Car',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click();
    await page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]').first().click();
    const price = page.locator('p[class*="buyback-value "] span[class*="ng-star-inserted"]').first();
    const amount = await price.textContent();
    console.log("Before Changing :" + amount)
    await page.locator('//span[text()=" 1.2 EX "]').click();
    await page.locator('//a[text()="  Exter 1.2 EX Petrol Manual Metallic Active  "]').click();
    await page.locator('//span[@class="color-round"]').nth(4).click();
    await page.locator('#mat-select-value-1').click();
    await page.locator('//span[text()="24 "]').click();
    await page.locator('//mat-select-trigger[text()=" 10,000 km/year "]').click();
    await page.locator('//span[text()="20,000 km/year "]').click();
    await page.locator('#mat-select-value-7').click();
    await page.locator('//span[text()="Assured Buyback "]').click();
    const price1=await price.textContent();
    expect(price1).not.toBe(amount);
    console.log("After Changing :"+price1);
    await page.locator('(//span[text()=" Check my Eligibility "])[1]').click();    
})
test('Buttons in Car Booking Page',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click();
    await page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]').first().click();
    const viewButton = page.locator('//a[text()=" View All"]');
    await viewButton.click();
    const lessButton =  page.locator('//a[text()=" View Less"]');
    expect(lessButton).toBeVisible();
    await lessButton.click();
    expect(viewButton).toBeVisible();
    const readMore = page.locator('//a[text()=" Read More"]');
    await readMore.click();
    const less = page.locator('//a[text()=" Less"]');
    expect(less).toBeVisible();
    await less.click();
    expect(readMore).toBeVisible();
})


