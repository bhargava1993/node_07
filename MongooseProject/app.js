const express = require("express");
const app = express();
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes")

app.use(express.json());

// app.use(cors())

app.use(cors({
    origin:["http://localhost:5173"]
}))

app.get("/test",(req,res)=>{

    res.status(200).json({
        success:true,
        message:"sample test spi"
    })

});

app.use("/api/",studentRoutes)

module.exports = app;