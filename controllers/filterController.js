const User = require("../models/user");
const { createResponse } = require("../utils/responseGenerator");

module.exports.filteredUsers = async (req, res, next) => {
  try {
    // get country list
    const countryList = await User.find({}).select("country");

    // actual data
    const data = {
      countryList,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};
