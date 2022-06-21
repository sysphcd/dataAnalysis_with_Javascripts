//import packages

const dataForge = require('data-forge'); require('data-forge-fs');

//create a dataframe

const df = dataForge.readFileSync('data/iris.csv').parseCSV();

//Preview Dataset
console.log(df.toArray())

//pretty format
console.log(df.toString())

//Head first 5 rows
console.log(df.head(5).toString())

console.log(df.tail(5).toString())

//get DataTypes
console.log(df.detectTypes().toString())

//get values
console.log(df.detectValues().toString())

// Describe / summary
console.log(df.summarize())

//get column names 
console.log(df)
console.log(df.getColumnNames())

// rename
let df2 = df.renameSeries({"species": "class"})
console.log(df2.getColumnNames())

//selection of rows
//pandas : df.iloc[10]
console.log(df.at(10))

//multiple rows
//pandas : df.iloc[10:20]
console.log(df.between(10,20).toString())

//skip and take
console.log(df.skip(10).take(20).toString())

//seelction of Columns
//pandas : df['col1'] or df.col1
//method 1: getSeries
console.log(df.getSeries('species').toString())

//Method 2 :deflate
let colSpecies = df.deflate(row=>row.species)
console.log(colSpecies.toString())

//Select Multiple columns
console.log(df.subset(['sepal_length', 'species']).toString())

//Delete one column
// console.log(df.dropSeries('sepal_length').head(5).toString())
//delete multiple columns
// console.log(df.dropSeries(['sepal_length','species']).head(5).toString())

//filtering
console.log(df.where(row=>row['sepal_length']>=1.3).toString())

//Modify or Transform a column
console.log(df.transformSeries({species:value=> value.toUpperCase()}).toString())

//Distinct / unique
console.log(df.distinct(row=>row.species).toString())

//Method /Attributes
// console.dir(dataForge)
// let sepalLength = df.getSeries('sepal_length')
// sepalLength.select(value=>value + 2.5).toString()
// console.log(df.withSeries("sepal_length",sepalLength).toString())

//Groupby
let speciesGroups = df.groupBy(row=> row.species).select(
    group=>{
        return {
            species:group.first().species,
            Count:group.count()
        }
    }
).inflate();
console.log(speciesGroups.toArray())