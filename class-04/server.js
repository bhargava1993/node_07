const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json())

//middleware
app.use((req, res, next) => {
    console.log("Middleware execute")
    next();
})

const logger = (req, res, next) => {
    console.log(req.method);
    console.log(req.url)
    next()
}

app.use(logger)

app.get("/", (req, res) => {
    console.log("/ api call")
    res.send("Hello Goodmorning")
})


app.get("/users/:number", (req, res) => {
    console.log("req.body---", req.params.number)

    res.send(`get users--${req.params.number}`)
})

app.get("/users", (req, res) => {
    console.log("req.query---", req.query)

    res.send(req.query)
})



app.post("/users", (req, res) => {

    console.log("req.body---", req.body)

    res.send(req.body)
})

app.put("/users", (req, res) => {
    res.send("update User")
})

app.delete("/users", (req, res) => {
    res.send("delete User")
})





app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})