import {test,chromium} from "@playwright/test";

test('Slider handling', async() =>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("https://uat.quiklyz.com/");
    await page.locator("xpath=//div[text()='Chennai']").click();  
    await page.click("span[class='mat-button-wrapper']");        
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
  

