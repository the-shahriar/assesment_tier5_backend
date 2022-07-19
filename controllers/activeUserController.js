const User = require("../models/user");
const UserActivity = require("../models/usageTime");
const { createResponse } = require("../utils/responseGenerator");
const addHours = require("date-fns/addHours");
const { format } = require("date-fns");

module.exports.activeUserList = async (req, res, next) => {
  try {
    /* Daily active user list */
    let startDate = addHours(new Date(), 6);
    let endDate = new Date();
    endDate.setUTCHours(0, 0, 0, 0);

    // daily report
    const daily = await UserActivity.find({
      loggedIn: {
        $gte: endDate,
        $lt: startDate,
      },
    }).distinct("userId");

    /* End */

    /* Weekly active users list */
    let weeklyEndDate = new Date();
    weeklyEndDate.setUTCHours(0, 0, 0, 0);

    weeklyEndDate = weeklyEndDate.setDate(weeklyEndDate.getDate() - 7);
    const weekly = await UserActivity.find({
      loggedIn: {
        $gte: weeklyEndDate,
        $lt: startDate,
      },
    }).distinct("userId");

    /* End */

    /* Monthly active users list */
    let monthEndDate = new Date();
    monthEndDate.setUTCHours(0, 0, 0, 0);
    //  function to get last date of a specific month
    const lastday = function (y, m) {
      return new Date(y, m + 1, 0).getDate();
    };

    // get month day
    const monthDay = lastday(
      monthEndDate.getFullYear(),
      monthEndDate.getMonth()
    );

    if (monthDay === 28) {
      monthEndDate = monthEndDate.setDate(monthEndDate.getDate() - 28);
    } else if (monthDay === 29) {
      monthEndDate = monthEndDate.setDate(monthEndDate.getDate() - 29);
    } else if (monthDay === 30) {
      monthEndDate = monthEndDate.setDate(monthEndDate.getDate() - 30);
    } else {
      monthEndDate = monthEndDate.setDate(monthEndDate.getDate() - 31);
    }

    // monthly report
    const monthly = await UserActivity.find({
      loggedIn: {
        $gte: monthEndDate,
        $lt: startDate,
      },
    }).distinct("userId");

    /* End */

    // total loggedIn user
    const totalUser = await User.find({}).distinct("email").count();
    const totalActiveUser = await UserActivity.find({}).distinct("userId");

    // actual data
    const data = {
      totalUser,
      activeUser: totalActiveUser.length,
      daily: daily.length,
      weekly: weekly.length,
      monthly: monthly.length,
    };

    res.json(createResponse(data));
  } catch (err) {
    next(err);
  }
};
