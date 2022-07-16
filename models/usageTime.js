const mongoose = require("mongoose");
const UserSchema = require("./user");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserActivity = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserSchema,
    },
    loggedIn: {
      type: Date,
      default: Date.now,
    },
    loggedIn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("log_activity", UserActivity);
