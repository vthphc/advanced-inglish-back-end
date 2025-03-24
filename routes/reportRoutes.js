const express = require("express");
const router = express.Router();

const reportControllers = require("../controllers/reportControllers");

router.post("/", reportControllers.addReport);

module.exports = router;
