const express = require("express");
const router = express.Router();

const reportControllers = require("../controllers/reportControllers");

router.post("/reports", reportControllers.addReport);

module.exports = router;
