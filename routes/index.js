const router = require("express").Router();
const auth = require("./auth");
const activeUsers = require("./activeUser");
const filteredUser = require("./filteredUser");

router.use("/auth", auth);
router.use("/active-users", activeUsers);
router.use("/filteredReport", filteredUser);

module.exports = router;
