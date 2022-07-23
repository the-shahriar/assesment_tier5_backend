const router = require("express").Router();
const filterController = require("../controllers//filterController");
const { validateUser } = require("../middlewares/validateUser");

router.get("/country-list", filterController.getCountry);
router.get("/byCountry", filterController.filterByCountry);
router.get("/byGender", filterController.filterByGender);
router.get("/byDevice", filterController.filterByDevice);
router.get("/byUsageTime", filterController.filterByUsageTime);

module.exports = router;
