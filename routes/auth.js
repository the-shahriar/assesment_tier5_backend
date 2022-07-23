const router = require("express").Router();
const authController = require("../controllers/authController");
const activeUserController = require("../controllers/activeUserController");
const { validateUser } = require("../middlewares/validateUser");

router.post("/login", authController.login);
router.post("/add-user", authController.addUser);
router.post("/remove-user", authController.removeUser);
router.get("/auth-user", validateUser, authController.authUser);
router.post("/logout", authController.logOut);
router.get("/active-user", activeUserController.activeUserList);

module.exports = router;
