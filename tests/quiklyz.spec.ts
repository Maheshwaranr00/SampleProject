import {test,chromium,expect} from "@playwright/test";


const BaseUrl = "https://uat.quiklyz.com/";    




test('Homepage',async({page}) => {    
    await page.goto(BaseUrl);   
    await page.locator("xpath=//div[text()='Chennai']").click();  //city
    const string = await page.locator('xpath=//span[@class="ql-size-large" ]').allTextContents(); //text below the video
    console.log(string);               
    await page.locator('xpath=(//a[text()=" Read More"])[1]').click();  //first read more
    await page.locator('xpath=(//a[text()=" Less"])[1]').click();   // same   
    await page.pause();        
    await page.click('xpath=//span[text()="More Videos"]');
})
test('Find cars ', async({page}) =>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); //city selction
    await page.locator("span[class='mat-button-wrapper']").click();    //findcars
    await page.locator('#mat-select-value-1').click();   //dropdown
    await page.locator("text= Latest Additions ").click();   // dropdown option
    await page.locator("text= Audi (1) ").check();   //check boxes
    await page.locator("text= Jeep (2) ").check();    //check boxes
    await page.locator("xpath=//span[text()=' Clear All ']").click();   //clear filters
    await page.locator("xpath=(//mat-icon[normalize-space()='view_list'])[1]").click();  //list view    
    await page.waitForTimeout(8000);
    await page.screenshot({ path: 'C:/Users/david/Downloads/Mahesh/scripts/screenshot2.png' });          
})
test('Login',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("text=Login  ").click(); //Login
    await page.locator("xpath=(//span[normalize-space()='Login'])[1]").click();  //Inner login
    await page.waitForTimeout(2000);   
    await page.getByRole('textbox', { name: 'Enter Mobile Number' }).fill("7834678909");  //mobile number
    await page.pause();
    await page.getByRole('button', { name: 'Get OTP' }).click();//get otp
})
test('Accordian',async({page})=>{    
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();    
    await page.locator('xpath=(//mat-icon[text()="add" ])[1]').click();  // Accordian
     //text will open after click the accordian
    const string2 = await page.locator('xpath=//p[contains(text(),"Unlike the self-drive car")]').allTextContents();
    console.log(string2);
    await page.locator('xpath=(//mat-icon[@role="img" ])[1]').click(); //close text
    await page.locator('xpath=(//mat-icon[text()="add" ])[2]').click(); // Accordian
    //text will open after click the accordian
    const string3 = await page.locator('xpath=(//span[contains(text(),"One Monthly Fee" )])').allTextContents();
    console.log(string3);
    await page.locator('xpath=(//mat-icon[@role="img" ])[2]').click(); //close text
    await page.locator('xpath=(//mat-icon[text()="add" ])[3]').click();  // Accordian
    //text will open after click the accordian
    const string4 = await page.locator('xpath=(//li[contains(text(),"Strong relationships with " )])').allTextContents();
    console.log(string4);
    await page.locator('xpath=(//mat-icon[@role="img" ])[3]').click();//close text
})
test('FAQ - Fees and Tenure',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();   
    await page.locator("xpath=//span[text()='View All']").click(); // below the accordian It will navigate to FAQ
    await page.locator("xpath=//div[text()=' Fees and Tenure ']").click(); //Fees   
    await page.locator('button:text("View More")').click();    
    await page.locator("xpath=//a[text()='Expand All']").click();
    expect("xpath=//a[text()='Minimize All']").toContain('Minimize All');
})
test('FAQ - Booking',async({page})=>{    
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();   
    await page.locator("xpath=//span[text()='View All']").click(); // below the accordian It will navigate to FAQ
    await page.locator('xpath=//div[text()=" Booking and Registration "]').click();
    await page.locator('xpath=(//input[@type="text"])[1]').
    fill("what is the minimum amount plan for an individual? ");
    await page.locator('xpath=//mat-icon[text()="search"]').click();  
})
test('Quiklyz Business', async({page}) => {    
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.click('xpath=//a[text()="Business"]');
    console.log(await page.locator('xpath=(//p[@class="ql-align-center"])[2]').textContent());
    await page.click('(//mat-icon[@role="img"])[1]');
    page.waitForTimeout(2000);
    await page.screenshot({ path: 'C:/Users/david/Downloads/Mahesh/scripts/tests/screenshot2.png' });    
})
test('homepage mouse hover',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.hover('xpath=//img[@alt="image"]'); //car 
    await page.click('text= View Details ');//view details
    await page.click('xpath=//span[text()=" Lxi "]'); 
    await page.click('xpath=//a[text()="  Swift Lxi Petrol Manual Metallic Active  "]');
    await page.waitForTimeout(2000);
    await page.click('xpath=(//span[@class="color-round"])[6]');
    await page.click('xpath=(//span[text()=" Check my Eligibility "])');
    await page.waitForTimeout(2000);   
})
test('Compare Cars',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click(); 
    await page.click('text=   More   ');
    await page.click('xpath=//span[text()="Compare Cars"]');
    await page.pause();
//car 1 details
    await page.click('xpath=(//mat-label[text()=" Select Brand "])[1]');    
    await page.click('xpath=//span[text()=" Tata"]');
    await page.click('xpath=//mat-label[text()=" Select Model "]');    
    await page.click('xpath=//span[text()=" Tata Tiago EV "]'); 
    await page.click('xpath=(//mat-label[text()=" Select Variant "])[1]');    
    await page.click('xpath=//span[text()=" Tiago EV XT Long Range Electric Automatic Metallic Active"]');
//car 2 details
    await page.click('xpath=(//mat-label[text()=" Select Brand "])[1]');    
    await page.click('xpath=//span[text()=" Volkswagen"]');
    await page.click('xpath=//mat-label[text()=" Select Model "]');
    await page.click('xpath=//span[text()=" Volkswagen Taigun "]'); 
    await page.click('xpath=(//mat-label[text()=" Select Variant "])[2]');
    await page.click('xpath=//span[text()=" Taigun Comfortline 1.0 TSI Petrol Manual Metallic Active"]');
//car 3 details
    await page.click('xpath=(//mat-label[text()=" Select Brand "])[1]');    
    await page.click('xpath=//span[text()=" Audi"]');
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
test('How it works',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();   //How it works
    await page.locator("xpath=(//span[contains(text(),'Car Subscription Process')])[2]").click();  //car subscription
    console.log(await page.locator("(//span[@class='ql-size-huge'])[1]").allInnerTexts()); //text 
    await page.locator("xpath=(//span[@class='mat-button-wrapper'])[2]").click();  //How it works
    await page.click('xpath=//span[text()="Subscription Benefits"]');  //subscription benefits
    await page.click('text=Quiklyz Subscription vs Buying a Car on Loan');
})
test('registration',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("text=Login  ").click(); //Login
    await page.click('text= Start here');
    await page.fill('xpath=//input[@data-placeholder="Enter your First Name"]','mahesh');
    await page.fill('xpath=//input[@data-placeholder="Enter your Last Name"]','Rajendran');
    await page.fill('xpath=//input[@data-placeholder="Enter your Email Address"]','mahesh@gmail.com');
    await page.fill('xpath=//input[@data-placeholder="Enter your Mobile Number"]','6756454542');   
    await page.click('xpath=//span[@class="mat-checkbox-inner-container"]');
    await page.click('xpath=//span[text()="Register"]');
    await page.waitForTimeout(3000);
    console.log(await page.locator('#swal2-html-container').textContent());
    await page.click('xpath=//button[text()="OK"]');
    await page.pause();
})
test('Pagination',async({page})=>{   
    const car =page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]');
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").click(); 
    await page.waitForTimeout(2000);
    const carName1 = await car.allTextContents();
    console.log("Number of cars in the First Page:"+carName1.length);
    await page.click('(//a[@class="page-link"])[4]');
    await page.pause();
    
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
    await page.waitForTimeout(2000);
    const carName5 = await car.allTextContents();
    console.log("Number of cars in the Sixth Page:"+carName5.length);   
    await page.pause();
})
test('Check Box filter',async({page})=>{   
    const car =page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]');
    const checkBox = page.locator('(//span[@class="facet-value"])[9]');
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click(); 
    await page.waitForTimeout(2000);
    await checkBox.click();    
    await page.waitForTimeout(6000);
    const string = await checkBox.textContent();
    let b = string?.substring(1,4);
    console.log("Selected CheckBox :"+string);
    await page.pause();
    const title = await car.allTextContents();
    console.log("Number of cars :"+title.length,title);
    for(let i =0; i< title.length; i++){
        expect(title[i]).toContain(b);
    }
    console.log("Car Names are shortlisted according to the selected checkbox ");
})
test('Validating Sliders',async({page})=>{   
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").click();       
    const targetValue = 0.2; 
    const targetValue2 = -0.2;    
    const sliderHandle = page.locator('div[class="mat-slider-thumb"]').first();    
    const slider = page.locator('mat-slider[role="slider"]').first();      
    const sliderBoundingBox = await slider.boundingBox();
    console.log(sliderBoundingBox?.width,sliderBoundingBox?.height);
    await page.pause();
    if(sliderBoundingBox != null)
    {
        await sliderHandle.dragTo(sliderHandle, {
            force: true,
            targetPosition: {
              x: sliderBoundingBox.width * targetValue,
              y: 0,
            },
          });
    }else throw new Error("No Element")  
    const sliderHandle2 = page.locator('div[class="mat-slider-thumb"]').nth(1);
    if(sliderBoundingBox != null)
    {
        await sliderHandle2.dragTo(sliderHandle2, {
            force: true,
            targetPosition: {
              x: sliderBoundingBox.width * targetValue2,
              y: 0,
            },
          });
    }else throw new Error("No Element")  
    const price = await page.locator('//span[@class="facet-value ng-star-inserted"]').textContent();
    console.log(price);    
  });
test('First & Last',async({page})=>{    
    await page.goto(BaseUrl);    
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").first().click();
    await page.pause();   
    await page.locator('//a[text()="4"]').click();    
    console.log(await page.locator('//a[text()="First"]').textContent());
    console.log(await page.locator('//a[text()="Last"]').textContent());
    expect(page.locator("text='First'")).toContainText('First');
    expect(page.locator('//a[text()="Last"]')).toBeVisible();  
    })
test('Counting',async({page})=>{   
    await page.goto(BaseUrl);    
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.locator("span[class='mat-button-wrapper']").click();
    const checkBox = page.locator('(//span[@class="facet-value"])[9]');
    const car =page.locator('xpath=//a[@class="fieldvalue make-name ng-star-inserted"]');
    await checkBox.click();
    await page.pause();
    const checkBoxString = await checkBox.textContent();
    //const newString = checkBoxString?.substring(1,4);
    const titles = await car.allTextContents();
    console.log(checkBoxString, titles.length);
})
test('Blogs',async({page})=>{
    await page.goto(BaseUrl); 
    await page.locator("xpath=//div[text()='Chennai']").click();
    await page.locator('(//span[@class="mat-button-wrapper"])[8]').click();
    await page.locator('//span[text()="Blog"]').nth(1).click();    
    await page.locator('[title*="Advantage Buyback"]').click();
    await page.waitForTimeout(3000);
    console.log(await page.locator('[style*="font-family"]').allTextContents());
    await page.locator('[title*="About Car Subscription"]').click();
    await page.waitForTimeout(3000);
    console.log(await page.locator('//p[contains(text(),"those new to the concept")]').allTextContents());
    await page.pause();
})

