const router = require("express").Router();
const activeUserController = require("../controllers/activeUserController");
const { validateUser } = require("../middlewares/validateUser");

router.get("/all", activeUserController.activeUserList);

module.exports = router;
