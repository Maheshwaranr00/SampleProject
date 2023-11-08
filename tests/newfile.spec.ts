import {test} from "@playwright/test";


import mammoth from "mammoth";
import * as fs from 'fs';
const BaseUrl ="https://uat.quiklyz.com";
test('Storing datas in word document',async({page})=>{
    await page.goto(BaseUrl);
    await page.locator("xpath=//div[text()='Chennai']").click();  //city
    await page.locator("span[class='mat-button-wrapper']").first().click();
    const carNames = await page.locator("//a[@class='fieldvalue make-name ng-star-inserted']").innerText();
    await page.close();
    const output = `<!DOCTYPE html><html><body>${carNames}</body></html>`;
    mammoth.convertToHtml({ content: output}).then((result)=>{
        fs.writeFileSync('output.docx',result.value);
    }).catch((err) => {
        console.error(err);
    })
})