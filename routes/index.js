const router = require("express").Router();
const auth = require("./auth");

router.use("/v1", auth);

module.exports = router;
