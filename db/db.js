// connect to database
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bozkhs9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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
