const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get(authController.authUser);

module.exports = router;
