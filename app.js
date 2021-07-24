if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

require("./config/DB-Config");
require("./routes/helper/agendaHelper");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./routes"));

// listen on port 3000
const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});

module.exports = app;
