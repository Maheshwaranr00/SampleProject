import { test} from '@playwright/test';
import * as data from './login.cred.json';

test.describe('demo',() =>{

test('Example test with input data', async ({ page }) => {
  const data= JSON.parse(JSON.stringify(require('./login.cred.json')));
  console.log(data.username[0].password[0]);
 
})
});