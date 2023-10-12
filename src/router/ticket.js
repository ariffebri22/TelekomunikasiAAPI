const express = require("express");
const router = express.Router();
const { postDataIncident, postDataTicket } = require("../controller/ticketController");
const { Protect } = require("./../middleware/Protect");

router.post("/incident", Protect, postDataIncident);
router.post("/ticket/:id", Protect, postDataTicket);

module.exports = router;
