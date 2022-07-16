const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
const device = require("express-device");

require("dotenv").config();
// Pass the global passport object into the configuration function
app.use(cors());
app.use(express.json());
app.use(device.capture());

//error handler
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hi to " + req.device.type + " User");
});

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
