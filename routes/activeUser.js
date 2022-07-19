const router = require("express").Router();
const activeUserController = require("../controllers/activeUserController");
const { validateUser } = require("../middlewares/validateUser");

router.get("/report", validateUser, activeUserController.activeUserList);

module.exports = router;
