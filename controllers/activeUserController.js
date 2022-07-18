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

    const daily = await UserActivity.find({
      loggedIn: { $gte: endDate, $lt: startDate },
    }).distinct("userId");

    const daily1 = await UserActivity.aggregate([
      {
        $project: {
          userId: 1,
          loggedIn: 1,
          qtyGte250: { $gte: ["$loggedIn", endDate] },
          _id: 0,
        },
      },

      {
        $addFields: {
          count: {
            $size: "$count",
          },
        },
      },
    ]);

    // weekly
    let weeklyEndDate = new Date();
    weeklyEndDate.setUTCHours(0, 0, 0, 0);
    weeklyEndDate.setDate(weeklyEndDate.getDate() - 7);

    const weekly = await UserActivity.find({
      loggedIn: { $gte: weeklyEndDate, $lt: startDate },
    }).distinct("userId");

    // monthly
    let monthlyEndDate = new Date();
    monthlyEndDate.setUTCHours(0, 0, 0, 0);
    monthlyEndDate.setDate(monthlyEndDate.getDate() - 30);

    const monthly = await UserActivity.find({
      loggedIn: { $gte: monthlyEndDate, $lt: startDate },
    }).distinct("userId");

    // combining all data
    const data = {
      daily1,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};
