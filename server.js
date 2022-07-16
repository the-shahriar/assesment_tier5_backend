const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");

require("dotenv").config();
// Pass the global passport object into the configuration function
app.use(cors());

app.use(express.json());
app.use("/api", routes);

//error handler
const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);

module.exports = app;
