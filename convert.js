const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: 'excel.xlsx'
});

console.log(result)
