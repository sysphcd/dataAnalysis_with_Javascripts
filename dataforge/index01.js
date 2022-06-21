//import packages

const dataForge = require('data-forge'); require('data-forge-fs');

//create a dataframe

const df1 =new dataForge.DataFrame({
    columnNames:["id", "names","sex","age"],
    rows:[
    [1, "Jesse","female",25],
    [2, "James","male",35],
    [3, "Lina","female",26],
    [4, "Ali","male",27],
    [5, "Karl","male",15]]
});

console.log(df1);
//Preview : 
//Display as Array
console.log(df1.toArray())
//Display as Rows
console.log(df1.toRows())
//Display as pairs
console.log(df1.toPairs())
//Display as JSON
console.log(df1.toJSON())

