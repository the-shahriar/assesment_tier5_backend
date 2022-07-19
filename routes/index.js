const router = require("express").Router();
const auth = require("./auth");
const report = require("./activeUser");

router.use("/auth", auth);
router.use("/report", report);

module.exports = router;
