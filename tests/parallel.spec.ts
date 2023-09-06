import { test } from "@playwright/test";
const userdata=[{
    "username":"mahesh",
    "password":"45rt"
 },{
    "username":"jameen",
    "password":"Gkj89"
 },{
    "username":"subash",
    "password":"ko90"
 },{
    "username":"sundar",
    "password":"ftg87"
 } 
 ]
userdata.forEach(a => {
    test(`parallel ${a.username}`, async ({page}) => {        
    await page.goto("https://demo.guru99.com/V1/index.php");
     headless : false    
    await page.locator('input[name="uid"]').fill(a.username);    
    await page.locator('input[name="password"]').fill(a.password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
} )
})

