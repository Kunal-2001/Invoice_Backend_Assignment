const express = require("express");
const router = express.Router();

router.use("/apis", require("./apis"));

module.exports = router;
