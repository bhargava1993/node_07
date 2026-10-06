const fs = require("fs");

// import fs from "fs";

// Create file

// const data = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.`

// fs.writeFile("sample.txt",data, (err)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("File Created")
// })

// Read file
// fs.readFile("sample.txt", "utf8", (err, data) => {

//     if (err) {
//         console.log(err);
//         return
//     }
//     else {
//         console.log(data)
//     }

// })

// fs.appendFile("sample.txt","\n Harsha, Bhragava, Koushik",(err)=>{
//         if (err) {
//         console.log(err);
//         return
//     }

//     console.log("data appended")
// })


// fs.writeFile("sample.txt", "Hello Goodmorning", (err)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("File Created")
// })

// delete file:
// ------------

// fs.unlink("sample.txt", (err) => {
//     if (err) {
//         console.log(err);
//         return
//     }

//     console.log("file deleted")
// })


// fs.writeFile("sample.txt", "Hello Goodmorning", (err)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("File Created")
// })

// rename file:
// ---------------

// fs.rename("sample.txt", "new_sample.txt", (err) => {
//     if (err) {
//         console.log(err);
//         return
//     }
// })


// console.log(fs.existsSync("sample.txt"));
// console.log(fs.existsSync("new_sample.txt"));


// if(fs.existsSync("new_sample.txt")){
//     console.log("File exists")
// }else{
//     console.log("File not exists")
// }

// create folder:
// --------------


// fs.mkdir("images", (err) => {
//     if (err) {
//         console.log(err);
//         return
//     }
// })


// fs.readdir(".", (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log(files)
// })

// fs.rmdir("uploads", (err) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log("folder deleted")
// })


// Synchronous vs Asynchronous


// fs.readFileSync()

const user = {
    id: 1,
    name: "koushik",
    age: 25
}

// fs.writeFile("user.json", JSON.stringify(user, null, 2), (err) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log("User Json created")
// }
// )

// fs.readFile("user.json", "utf8", (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     const user = JSON.parse(data)
//     console.log(user)
//     console.log(user.id)
//     console.log(user.name)
//     console.log(user.age)
// }
// )



// const log = `${new Date().toISOString()}-User Logged in\n`;


// fs.writeFile("app.log", log, (err) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log("log save")
// }
// )

// fs.appendFile("app.log", log, (err) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log("log save")
// }
// )