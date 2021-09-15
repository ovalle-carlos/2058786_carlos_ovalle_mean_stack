let fs = require("fs");
let readline = require("readline-sync");
debugger;
let records= JSON.parse(fs.readFileSync("records.json").toString());
let fn = readline.question("enter firstname ");
let ln = readline.question("enter last name ");
let gender = readline.question("enter gender ");
let em = readline.questionEMail("enter email ");
debugger;
let x = Date.now();
let date = new Date(x);
let emp = {firstname:fn, lastname:ln,Gender:gender, email:em, time:date};
debugger;
records.push(emp);
fs.writeFileSync("records.json",JSON.stringify(records))
console.log("data store in file"); 