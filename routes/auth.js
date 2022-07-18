const router = require("express").Router();
const authController = require("../controllers/authController");
const activeUserController = require("../controllers/activeUserController");
const { validateUser } = require("../middlewares/validateUser");

router.post("/add-user", validateUser, authController.addUser);
router.post("/login", authController.login);
router.post("/logout", validateUser, authController.logOut);
router.post("/remove-user", validateUser, authController.removeUser);
router.get("/auth-user", validateUser, authController.authUser);
router.get("/active-user", activeUserController.activeUserList);

module.exports = router;
