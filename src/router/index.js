const app = require("express");
const router = app.Router();
const Auth = require("./auth");
const Ticket = require("./ticket");
const CWO = require("./cwo");

router.use("/auth", Auth);
router.use("/req", Ticket);
router.use("/create", CWO);

module.exports = router;
