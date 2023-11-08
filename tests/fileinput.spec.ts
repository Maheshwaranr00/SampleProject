import {test, chromium} from "@playwright/test";
//import * as data from "C:/Users/david/Downloads/Mahesh/script2/scripts/Js_files/login.cred.json";
    test.describe('demo', () => {
        test.only('Sample', async ({ page }) => {
            const element1 = []; 
            const testData = JSON.parse(JSON.stringify(require('./login.cred.json')));
            for (const element of testData.data) {
                for (let key in element) {
                    for (let j= 0; j<element[key].length; j++) {
                        element1[key][j]=element[key][j];
                        console.log(element[key][j])               
                    }
                }
             }
             console.log(element1);
        });
    })
    test('Getting Input from jsonfile', async ({page}) => {             
        const testdata= JSON.parse(JSON.stringify(require('./login.cred.json')));
        //await page.goto("https://www.facebook.com/login/");

        console.log(testdata.username[0], testdata.password[0]);
       // await page.fill('id=email', testdata.username[0]);
       // await page.fill('id=pass', testdata.password[0]);
       // await page.click('id=loginbutton');
       // await page.pause();
    })