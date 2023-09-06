import { test,chromium } from "@playwright/test";
 test('Uploading', async()=>{ 
    const browser = await chromium.launch({headless :false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://demo.guru99.com/test/upload/");
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('input[type="file"]').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('image.png');
    await page.locator('id=terms').click();
    await page.locator('id=submitbutton').click();
    console.log(await page.locator('text=1 file ').textContent());
    console.log(await page.locator('text=has been successfully uploaded.'));
    await browser.close();
     
 })
