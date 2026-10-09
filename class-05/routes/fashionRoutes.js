const express = require("express");
const router = express.Router();

const fashion = [];

router.get("/", (req, res) => {
    res.json({ data: fashion })
});

router.post("/", (req, res) => {
    res.json({ message: "new product added", "data": req.body })
});

router.put("/", (req, res) => {
    res.send("update fashion products")
});

router.delete("/", (req, res) => {
    res.send("delete fashion products")
});

module.exports = router;