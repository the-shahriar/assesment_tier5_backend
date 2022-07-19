const User = require("../models/user");
const { createResponse } = require("../utils/responseGenerator");

// get country list
module.exports.getCountry = async (req, res, next) => {
  try {
    // get country list
    const countries = await User.find({}).select("country").distinct("country");

    // actual data
    const data = {
      countries,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};

/*

Note: Device list, and gender list API's are not implemented 
because of low option in both fields

*/

// filter user using country
module.exports.filterByCountry = async (req, res, next) => {
  try {
    // get country name
    const countryName = req.body.country;
    // get country list
    const users = await User.find({
      country: countryName,
    }).select(["_id", "name", "email", "gender", "device", "country"]);

    // actual data
    const data = {
      users,
      length: users.length,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};

// filter user using gender
module.exports.filterByGender = async (req, res, next) => {
  try {
    // get country name
    const genderName = req.body.gender;
    // get country list
    const users = await User.find({
      country: genderName,
    }).select(["_id", "name", "email", "gender", "device", "country"]);

    // actual data
    const data = {
      users,
      length: users.length,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};

// filter user using device
module.exports.filterByDevice = async (req, res, next) => {
  try {
    // get country name
    const deviceName = req.body.device;
    // get country list
    const users = await User.find({
      country: deviceName,
    }).select(["_id", "name", "email", "gender", "device", "country"]);

    // actual data
    const data = {
      users,
      length: users.length,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};

// filter user using top usage time
module.exports.filterByUsageTime = async (req, res, next) => {
  try {
    // res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};
