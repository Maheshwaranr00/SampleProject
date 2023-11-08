import test, { chromium, expect } from "@playwright/test";
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

let baseUrl = 'https://uat.quiklyz.com/data-service/buildEntityContext';
test('response',async()=>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/"); 
    await page.locator("//div[text()='Chennai']").click(); 
    await page.click('//a[text()="Corporate"]');
    await page.locator("text=Login  ").click(); //Login
    await page.locator("(//span[normalize-space()='Login'])[1]").click();  //Inner login
    await page.locator('[name="identifier"]').nth(0).fill('Quiklyz@lowes.com');
    await page.locator('[class*="mat-flat-button"]').nth(0).click();     
    for(let i=0;i<6;i++){await page.locator('[id*="otpField"]').nth(i).fill(`${i+1}`);}    
    await page.locator("text='Continue'").first().click();     
    
    await page.waitForURL('https://uat.quiklyz.com/corporate-employee-car-lease');
    await page.waitForLoadState("load");
    await page.locator('[class="mat-button-wrapper"]').nth(1).click();
    await page.waitForLoadState("load");
    // await page.waitForURL('https://uat.quiklyz.com/corporate-employee/car-lease-list');
    

    await page.waitForTimeout(4000);    
    await page.locator('[name="inlineSearchField"]').fill('TATA');
    await page.keyboard.press('Enter') ;
    await page.locator('[title=" Tata Punch"]').click();      
    const [response] = await Promise.all([
        page.waitForResponse(re=>
            re.url() == baseUrl            
            ),
            await page.locator('text="Proceed to service selection"').click()
    ])    
    const doc = await response.json();
    await page.locator('[id*="mat-expansion-panel"]').nth(0).click();
    const datas = doc.entityData
    const costs = datas.rootFilter
    console.log(costs); 
    console.log(costs.BASE_LEASE_RENTAL,
         costs.GST_RENTAL_CHARGES,
         costs.REIMBURSEMENTS,
         "fms :"+ costs.FMS_RENTAL,
         "allYearInt :"+costs.ALL_YEAR_INT,
         costs.GST_FMS_RENTAL_CHARGES);
   let    Base_Lease_Rental        = costs.BASE_LEASE_RENTAL + costs.GST_RENTAL_CHARGES
   let    Amount1                  = costs.BASE_LEASE_RENTAL
   let    gst1                     = costs.GST_RENTAL_CHARGES
   let    Amount2                  = costs.FMS_RENTAL 
   let    gst2                     = Amount2*0.18
   let    fleet_management_charges = costs.FMS_RENTAL  + costs.GST_FMS_RENTAL_CHARGES
   let    reimbursement            = costs.REIMBURSEMENTS
   let    total_monthly_rental     = Base_Lease_Rental + fleet_management_charges + reimbursement 
   let val1 =[
     Math.round(Base_Lease_Rental),
      Math.round(Amount1), 
      Math.round(gst1), 
      Math.round(fleet_management_charges),
      Math.round(Amount2),
    Math.round( gst2), Math.round(reimbursement), 
    Math.round(total_monthly_rental)];
    await page.locator('[id*="mat-expansion-panel"]').nth(1).click();  
   const prices = await page.locator('[class="form-group text-right"]').allTextContents();   
   let  calc = ["Monthly Rental","Amount        ","GST          ", "FMS Charges  ","Amount       ","GST          ",
   "Reimbursement","Total         "]
    console.log(calc[0],val1[0], prices[10]);
    console.log(calc[1],val1[1], prices[11]);
    console.log( calc[2],val1[2], prices[12]);
    console.log(calc[3],val1[3], prices[13]);
    console.log( calc[4],val1[4], prices[14]);
    console.log( calc[5],val1[5], prices[15]);
    console.log(calc[6],val1[6], prices[16]);
    console.log(calc[7],val1[7], prices[17]);    
    let testResults : any;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('TestResults');
     
    worksheet.columns = [
        { header: 'priceList', key: 'prices' },
        { header: 'BackendDetails', key: 'backend' },
        { header: 'UIDetails', key: 'ui' },
      ];
    for(let i=0;i<8;i++){
        testResults = [
            { prices: calc[i], backend: val1[i], ui: prices[i+10] }
          ];
          worksheet.addRows(testResults);
    }        
    workbook.xlsx.writeFile('test_results.xlsx')
  .then(() => {
    console.log('Excel file saved.');
  })
  .catch((error) => {
    console.error('Error saving Excel file:', error);
  });
    await page.pause();
})

  
