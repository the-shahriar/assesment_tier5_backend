const mongoose = require("mongoose");
const User = require("./user");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserActivity = new Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId is required"],
      trim: true,
    },
    loggedIn: {
      type: Date,
      default: Date.now,
    },
    logOut: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("log_activity", UserActivity);
