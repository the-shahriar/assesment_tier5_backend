const User = require("../models/User");
// const jwt = require("../lib/jwt");

module.exports.signUp = async (req, res, next) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };

    const user = new User(body);
    await user.save();
    return res.json(user, "Registration successful!");
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("No user with this email!");
    }
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw new Error("Incorrect email or password!");
    }
    return res.json({
      name: user.name,
      email: user.email,
      id: user._id,
      country: user.country,
      gender: user.gender,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.authUser = async (req, res, next) => {
  try {
    return res.json(createResponse(req.user));
  } catch (err) {
    next(err);
  }
};
