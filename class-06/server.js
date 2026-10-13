const express = require("express");
const connectDB = require("./dbConnection")
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API running")
})

app.get("/employees",async(req,res)=>{

    const db = await connectDB();

    const result = await db.collection("employees").find().toArray();

    res.json(result);

});

app.post("/employees",async(req,res)=>{
    console.log("req.body---",req.body)

    const db = await connectDB();

    const result = await db.collection("employees").insertOne(req.body);

    res.json(result);

});






app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})