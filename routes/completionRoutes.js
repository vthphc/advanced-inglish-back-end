const express = require("express");
const router = express.Router();

const completionControllers = require("../controllers/completionControllers");

router.post("/", completionControllers.testing);

module.exports = router;
