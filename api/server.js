const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const sql = require("mssql");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Content-Type", "application/json");
  next();
});
app.use(bodyParser());
app.get("/", function (req, res) {
  res.send("Hello World!");
});
require("./routes/routes.js")(app);

exports.start = async () => {
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
  });
};
