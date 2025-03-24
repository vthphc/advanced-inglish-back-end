const express = require("express");
const router = express.Router();

const initControllers = require("../controllers/initControllers");

router.get("/", initControllers.getInit);

module.exports = router;
