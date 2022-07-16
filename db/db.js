// connect to database
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbUrl = process.env.DB_URL;
mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(`FAILED to connect using mongoose. ${error}`);
    } else {
      console.log(`Connected to DB server.`);
    }
  }
);

//Cache
module.exports = mongoose;
