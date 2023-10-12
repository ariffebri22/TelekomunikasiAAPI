const express = require("express");
const router = express.Router();
const { postData } = require("../controller/cwoController");
const { Protect } = require("./../middleware/Protect");

router.post("/wo/:id", Protect, postData);

module.exports = router;
