const router = require("express").Router();
const authController = require("../controllers/authController");
const activeUserController = require("../controllers/activeUserController");
const { validateUser } = require("../middlewares/validateUser");

router.post("/login", authController.login);
router.post("/add-user", validateUser, authController.addUser);
router.post("/remove-user", validateUser, authController.removeUser);
router.get("/auth-user", validateUser, authController.authUser);
router.post("/logout", validateUser, authController.logOut);
router.get("/active-user", validateUser, activeUserController.activeUserList);

module.exports = router;
