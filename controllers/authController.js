const User = require("../models/user");
const UserActivity = require("../models/usageTime");
const { createResponse } = require("../utils/responseGenerator");
const addHours = require("date-fns/addHours");

module.exports.addUser = async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      country: req.body.country,
      password: req.body.password,
      device: req.device.type,
    };

    const user = new User(body);
    await user.save();
    return res.json(createResponse(user, "Registration Successful"));
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json(createResponse(null, "User does not exist with this email"));
    }
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      res.json(createResponse(null, "Password is invalid"));
    }
    const body = {
      userId: user._id,
      loggedIn: addHours(new Date(), 6),
      logOut: null,
    };
    const activity = new UserActivity(body);
    const logActivity = await activity.save();
    return res
      .cookie("SSID", user._id, {
        maxAge: 72000000,
      })
      .cookie("activityId", logActivity._id, {
        maxAge: 72000000,
      })
      .json(
        createResponse(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            country: user.country,
            gender: user.gender,
            device: user.device,
          },
          "Login Successful"
        )
      );
  } catch (err) {
    next(err);
  }
};

module.exports.authUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findOne({ _id: userId });
    return res.json(
      createResponse({
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        gender: user.gender,
        device: user.device,
      })
    );
  } catch (err) {
    next(err);
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    const activityId = req.cookies["activityId"];
    await UserActivity.findByIdAndUpdate(activityId, {
      logOut: addHours(new Date(), 6),
    });
    res.clearCookie("SSID");
    res.clearCookie("activityId");
    res.json(createResponse(null, "Logout Successful"));
    return res;
  } catch (err) {
    next(err);
  }
};

module.exports.removeUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndRemove({ _id: req.cookies["SSID"] });
    return res.json(createResponse(result, "User has been deleted."));
  } catch (err) {
    next(err);
  }
};
