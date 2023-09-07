import {test,chromium, expect} from "@playwright/test";     //xpath=//span[text()="PAN India Presence "]

test('Quiklyz2',async() => {
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/");   
    await page.locator("xpath=//div[text()='Chennai']").click();  //city
    const string = await page.locator('xpath=//span[@class="ql-size-large" ]').allTextContents(); //text below the video
    console.log(string);               
    await page.locator('xpath=(//a[text()=" Read More"])[1]').click();  //first read more
    await page.locator('xpath=(//a[text()=" Less"])[1]').click();   // same
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
    await page.locator("xpath=//span[text()='View All']").click(); // below the accordian It will navigate to FAQ
    await page.locator("xpath=//div[text()=' Fees and Tenure ']").click(); //Fees   
    await page.locator('button:text("View More")').click();    
    await page.locator("xpath=//a[text()='Expand All']").click();
    expect("xpath=//a[text()='Minimize All']").toContain('Minimize All');
    await page.locator('xpath=//div[text()=" Booking and Registration "]').click();
    await page.locator('xpath=(//input[@type="text"])[1]').
    fill("what is the minimum amount plan for an individual? ");
    await page.locator('xpath=//mat-icon[text()="search"]').click();
    await page.pause();


    //await page.locator('xpath=(//span[@class="actionLabel" ])[11]').click();
         
})