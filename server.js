const express = require("express");
const app = express();
const cors = require("cors");
const device = require("express-device");
const routes = require("./routes/index");
const db = require("./db/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error");

require("dotenv").config();
// Pass the global passport object into the configuration function

app.use(
  cors({
    credentials: true,
    origin: "https://darling-dragon-8bd912.netlify.app/",
  })
);
app.use(express.json());
app.use(device.capture());
app.use(cookieParser());
app.use(errorHandler);
app.use("/api/v1", routes);

//error handler
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("I am running at " + req.device.type);
});

app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
