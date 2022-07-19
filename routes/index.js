const router = require("express").Router();
const auth = require("./auth");
const activeUsers = require("./activeUser");
const filteredUser = require("./filteredUser");

router.use("/auth", auth);
router.use("/active-user", activeUsers);
router.use("/filter", filteredUser);

module.exports = router;
