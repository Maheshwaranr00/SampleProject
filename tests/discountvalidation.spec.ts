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
    await page.pause();
    await page.waitForURL('https://uat.quiklyz.com/corporate-employee-car-lease');
    await page.waitForLoadState("load");
    await page.locator('[class="mat-button-wrapper"]').nth(1).click();
    await page.waitForLoadState("load");    
    await page.waitForTimeout(4000);    
    await page.locator('[name="inlineSearchField"]').fill('TATA');
    await page.keyboard.press('Enter') ;
    await page.locator('[title=" Tata Punch"]').click();      
    await page.locator('text="Proceed to service selection"').click()
    const [response] = await Promise.all([
        page.waitForResponse(re=>
            re.url() == baseUrl            
            )            
    ])    
    const doc = await response.json();
    const datas = doc.entityData;        
    const prices = await page.locator('[class="form-group text-right"]').allTextContents();   
    for(let i=0;i<8;i++){console.log( prices[i+10]);}    
    await page.locator('[class*="mat-raised-button"]').nth(1).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('[id="fileDropRef"]').nth(0).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('Sql2.png');    
    await page.locator('[data-placeholder="Enter discount amount"]').fill('50000');
    await page.locator('[aria-label="Edit Record"]').nth(0).click();
    const [response1] = await Promise.all([
        page.waitForResponse(re=>
            re.url() == "https://uat.quiklyz.com/data-service/buildEntityContext"           
            ),
            await page.locator('text="Continue"').nth(0).click()
        ]) 
    await page.waitForLoadState('load');
    const data2 = await response1.json();
    const dta = data2.entityData   
     const irr=Number(datas.IRR);const rv_amount =Number(datas.RV_AMOUNT); const tenure = Number(datas.TENURE);
     const NEACcess =  Number(datas.NON_ELEC_ACCESSORIES); const gst = Number(datas.GST); const green_cess = Number(datas.GREEN_CESS);
     const discount = Number(dta.DISCOUNT_ENTER);  const A = 0 - discount; const x = 1 +  gst;const basic_cost = A/x;
     const fourth = [rv_amount/x];
     console.log("Discount :"+dta.DISCOUNT_ENTER,"IRR : "+ irr, " RV_AMOUNT: " + rv_amount, " BASIC_COST: "+ basic_cost,
     " NON_ELEC_ACCESSORIES : "+NEACcess," GST: " +gst,"TENURE : "+tenure,"GREEN_CESS :"+ green_cess,
     "Net ExshowroomA : "+A,"  "+x ,"  ",fourth);
     var pmt = require('formula-pmt');
     const base_lease_rental = pmt(irr/12,tenure,-[basic_cost]);
     const workbook = new ExcelJS.Workbook();
     await workbook.xlsx.readFile('C:/Users/david/Downloads/Mahesh/script2/scripts/test_results.xlsx');
     const worksheet = workbook.getWorksheet('TestResults');
     const amount = worksheet?.findCell(3,2)?.value;
     const gst_calc = base_lease_rental * gst;      
     const gst1 = worksheet?.findCell(4,2)?.value;
     //@ts-ignore
     const dis_amount1=amount+base_lease_rental;const dis_gst1 = gst1+gst_calc;     
     const Total_Amount1 = dis_amount1+dis_gst1;
     const gst_amt= basic_cost*gst;const gst_amt1 = datas.GST_AMOUNT;
     var fleet=pmt(irr/12,tenure,-[gst_amt]);
     const fleetManagement=fleet-(gst_amt/tenure);
     const amount2 = worksheet?.findCell(6,2)?.value
     console.log(amount2);
     const reimbursement = worksheet?.findCell(8,2)?.value
     //@ts-ignore
    const dis_amount2 =amount2 + fleetManagement; const dis_gst2 =(dis_amount2 *0.18);
    const Total_Amount2 = dis_amount2+dis_gst2;
     const final_Total = reimbursement+Total_Amount1+Total_Amount2;
     console.log(         Total_Amount1,dis_amount1,dis_gst1,Total_Amount2,dis_amount2,dis_gst2,reimbursement,final_Total);    
     const dis_backend = [Total_Amount1,dis_amount1,dis_gst1,Total_Amount2,dis_amount2,dis_gst2,reimbursement,final_Total]    
    const prices1 = await page.locator('[class="form-group text-right"]').allTextContents();   
    const total = await page.locator('[class*="panel-description"]').allTextContents();
    for(let i=0;i<8;i++){if(i==0){console.log(total[0]);}
    else if(i==3){console.log(total[1])}
    else{ console.log( prices1[i+9]);}   }          
      for(let i=0;i<8;i++){
        //@ts-ignore
       worksheet.getCell(`D${i+2}`).value=`${dis_backend[i]}`;
       if(i==0){
         //@ts-ignore
       worksheet.getCell(`E${i+2}`).value=`${total[0]}`;
       }
       else if(i==3){
        //@ts-ignore
      worksheet.getCell(`E${i+2}`).value=`${total[1]}`;
      }
      else{
         //@ts-ignore
      worksheet.getCell(`E${i+2}`).value=`${prices1[i+9]}`;
      }          
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

  
