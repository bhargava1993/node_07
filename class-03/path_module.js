// import index from "./index"

// const index = require("./index")
// const server = require("../server");


const path = require("path");

// path.join()
// path.dirname()
// path.extname()
// path.basename()
// path.isAbsolute()
// path.resolve()
// path.parse()


// const result = path.join("node_07","class-03","bhargava.js");

// console.log(result);

// const result = path.resolve( "script.js");

// console.log(result)

// const filepath = "class-03/script.js"
// const result = path.dirname(filepath)
// console.log("result---",result)


// const result = path.extname("images.jpg");

// const result = path.extname("class-01\invoice.pdf");

// console.log(result)

// if(result == ".jpg" || result == ".png" ){
//     console.log("this is image")
// }else{
//     console.log("file format doen't match")
// }


const result = path.isAbsolute("/class-03/scripts");

console.log(result)