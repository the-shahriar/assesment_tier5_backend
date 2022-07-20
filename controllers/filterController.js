const User = require("../models/user");
const UserActivity = require("../models/usageTime");
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
    // get log activity
    const actvity = await UserActivity.find({})
      .select(["userId", "loggedIn", "logOut"])
      .where("logOut")
      .ne(null);

    // new array by calculating duration of logout and login
    let newArray = [];
    actvity.forEach((item) => {
      const duration = item.logOut - item.loggedIn;
      const obj = {
        _id: item._id,
        userId: item.userId,
        duration,
      };
      newArray.push(obj);
    });

    // create an object with activity data by a specific user.
    const response = newArray.reduce((object, item) => {
      if (object[item["userId"]]) {
        object[item["userId"]].push({
          duration: item.duration,
        });
      } else {
        object[item["userId"]] = [
          {
            duration: item.duration,
          },
        ];
      }
      return object;
    }, {});

    // function to calculate data
    const calUsageTime = (array) => {
      const usage = array.reduce((accumulator, object) => {
        return accumulator + object.duration;
      }, 0);

      return {
        usage,
      };
    };

    // all user with usage time
    const actualResult = Object.keys(response).reduce((acc, key) => {
      const { usage } = calUsageTime(response[key]);
      // push data to the main array
      acc.push({
        userId: key,
        duration: usage,
      });
      return acc;
    }, []);

    // function to find top 15 user
    const topN = (arr, n) => {
      if (n > arr.length) {
        return false;
      }
      const result = arr
        .sort((a, b) => {
          return b.duration - a.duration;
        })
        .slice(0, n);

      const userName = result.map((item) => item.userId);
      return userName;
    };

    // getting the top 15
    const top5 = topN(actualResult, 5);

    // getting user information of top5
    if (top5) {
      const users = await User.find({ _id: { $in: top5 } }).select("email");
      res.json(createResponse(users));
    } else {
      res.json(createResponse(null, "Some error is there!"));
    }

    // send response
  } catch (err) {
    next(err);
  }
};
