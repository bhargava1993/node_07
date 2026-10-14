require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb");
const cors = require("cors");

const connectDB = require("./dbConnection")
const app = express();
console.log("process.env.PORT-----",process.env.PORT)
const PORT = process.env.PORT;

// app.use(cors())

app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"]
}))

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API running")
})

app.get("/employees",async(req,res)=>{

    const db = await connectDB();

    const result = await db.collection("employees").find().toArray();

    res.json(result);

});

app.get("/employees/:id",async(req,res)=>{

    console.log("req.query---",req.params)
    console.log("req.query---",new ObjectId(req.params.id))
    const db = await connectDB();

    const result = await db.collection("employees").findOne({_id: new ObjectId(req.params.id)});

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