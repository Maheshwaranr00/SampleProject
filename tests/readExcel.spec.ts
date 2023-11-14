import * as ExcelJS from 'exceljs';
import test from "@playwright/test"

test('',async()=>{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('C:/Users/david/Downloads/Mahesh/script2/scripts/test_results.xlsx');
    const worksheet = workbook.getWorksheet('TestResults');
    //@ts-ignore
    worksheet.eachRow((row, rowNumber) => {
      const countOfColumn = worksheet?.columnCount
      let myMap = new Map<number, string>();
      //@ts-ignore
      for(let i=1;i<=countOfColumn;i++){
          const cellAValue = row.getCell(i).value;            
          myMap.set(i,`${cellAValue}`);
      }       
      console.log(myMap);
    });  
})

 
  
