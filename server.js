const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");

require("dotenv").config();
// Pass the global passport object into the configuration function
app.use(cors());

app.use(express.json());

//error handler
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
