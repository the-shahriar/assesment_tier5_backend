const router = require("express").Router();
const activeUserController = require("../controllers/activeUserController");
const { validateUser } = require("../middlewares/validateUser");

router.get("/active-user", validateUser, activeUserController.activeUserList);

module.exports = router;
