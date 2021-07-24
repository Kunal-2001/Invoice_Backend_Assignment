const express = require("express");
const router = express.Router();
const invoices = require("./invoices.js");

router.use("/", invoices);

module.exports = router;
