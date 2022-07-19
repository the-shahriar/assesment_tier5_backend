const router = require("express").Router();
const filterController = require("../controllers//filterController");
const { validateUser } = require("../middlewares/validateUser");

router.get("/country-list", validateUser, filterController.getCountry);
router.get("/filterByCountry", validateUser, filterController.filterByCountry);
router.get("/filterByGender", validateUser, filterController.filterByGender);
router.get("/filterByDevice", validateUser, filterController.filterByDevice);

module.exports = router;
