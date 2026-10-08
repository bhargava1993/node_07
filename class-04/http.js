
const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Hello Good Morning")
})

server.listen(5000)