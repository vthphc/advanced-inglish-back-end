const express = require("express");
const router = express.Router();

const initControllers = require("../controllers/initControllers");

router.get("/init", initControllers.getInit);

module.exports = router;
