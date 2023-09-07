import {test, chromium} from "@playwright/test";
import * as data from "C:/Users/david/Downloads/Mahesh/scripts/tests/login.cred.json";


    test('filereading', async () => {        
        const browser = await chromium.launch({headless :false});
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://www.facebook.com/login/");   
        await page.locator("id=email").fill(data.username);
        await page.locator("id=pass").fill(data.password);
        await page.locator("id=loginbutton").click();
        await page.pause();
    })    
