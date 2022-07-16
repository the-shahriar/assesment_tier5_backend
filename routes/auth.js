const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/auth-user", authController.authUser);
router.get("/logout", authController.logOut);

module.exports = router;
