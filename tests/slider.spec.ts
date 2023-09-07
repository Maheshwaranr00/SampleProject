import {test,chromium} from "@playwright/test";

test('Slider handling', async() =>{
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext( );
    const page = await context.newPage();
    await page.goto("hhttps://uat.quiklyz.com/corporate-employee/car-lease-list");
    const maxValue = 20;
    // drag-and-drop target value in percentage
    const targetValue = 0.4; // 40%
  
    // retrieving the slider handle HTML element
    const sliderHandle = page.locator('xpath=(//div[@class="mat-slider-thumb"])[2]').first();
    // retrieving the slider HTML element
    const slider = page.locator('mat-slider[role="slider"]').first();
  
    // getting the slider bounding box size
    const sliderBoundingBox = await slider.boundingBox();

    if(sliderBoundingBox != null)
    {
        await sliderHandle.dragTo(sliderHandle, {
            force: true,
            targetPosition: {
              // moving the slider to the target value in %
              x: sliderBoundingBox.width * targetValue,
              y: 0,
            },
          });
    }else throw new Error("No Element")
  
    // performing the drag-and-drop interaction    
  
    // retrieving the input HTML element
    const input = page.locator(".ant-input-number-input").first();
    // getting the "value" HTML attribute
    const value = await input.getAttribute("value");
  
    // calculating the expected value
    const expectedValue = `${maxValue * targetValue}`;
  
    expect(value).toEqual(expectedValue);
  });
  

