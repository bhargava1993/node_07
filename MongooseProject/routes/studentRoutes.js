const express = require("express");
const router = express.Router();
const { createStudent } = require("../controllers/studentController")

// create student
router.post("/student", createStudent);


module.exports = router;