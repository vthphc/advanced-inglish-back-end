const express = require("express");
const initRoutes = require("./init");

const router = express.Router();

router.use("/", initRoutes);

module.exports = router;