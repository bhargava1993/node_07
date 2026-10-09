const express = require("express");
const app = express();
const PORT = 3000;

const logger = require("./middlewares/logger");

const fashionRoutes = require("./routes/fashionRoutes");
const mobileRoutes = require("./routes/mobileRoutes");


app.use(express.json());
app.use(logger)

app.use("/fashion", fashionRoutes);
app.use("/mobile", mobileRoutes);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
