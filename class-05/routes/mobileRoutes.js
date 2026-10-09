const express = require("express");
const router = express.Router();

const { getMobiles,
    createMobile,
    updateMobile,
    deleteMobile } = require("../controller/mobileController");


router.get("/", getMobiles);

router.post("/",createMobile);

router.put("/", updateMobile);

router.delete("/", deleteMobile);

module.exports = router;