const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      unique: "Email Address is Already Registered!",
      required: [true, "Email is required!"],
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
    },
    device: {
      type: String,
      required: [true, "Device is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country name is required!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, "Password should be greater than or equal 6 character!"],
    },
  },
  { timestamp: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("users", UserSchema);
