const User = require("../models/user");
const UserActivity = require("../models/usageTime");
const { createResponse } = require("../utils/responseGenerator");
const addHours = require("date-fns/addHours");

module.exports.activeUserList = async (req, res, next) => {
  try {
    // daily
    let startDate = addHours(new Date(), 6);
    let endDate = new Date();
    endDate.setUTCHours(0, 0, 0, 0);

    const daily = await UserActivity.distinct("userId", {
      $gte: endDate,
      $lt: startDate,
    });

    // weekly

    // const weekly = await UserActivity.distinct("userId", {
    //   $gte: weeklyEndDate,
    //   $lt: startDate,
    // });

    let data = {
      date: endDate.toLocaleDateString("en-US", {
        timeZone: "UTC",
      }),
      count: daily.length,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};
