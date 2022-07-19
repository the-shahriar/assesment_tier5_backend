const router = require("express").Router();
const filterController = require("../controllers//filterController");
const { validateUser } = require("../middlewares/validateUser");

router.get("/country-list", validateUser, filterController.getCountry);
router.get("/byCountry", validateUser, filterController.filterByCountry);
router.get("/byGender", validateUser, filterController.filterByGender);
router.get("/byDevice", validateUser, filterController.filterByDevice);
router.get("/byUsageTime", validateUser, filterController.filterByUsageTime);

module.exports = router;
