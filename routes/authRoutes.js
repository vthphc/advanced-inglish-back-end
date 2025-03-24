const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

router.post("/send-email", authControllers.sendEmail);

module.exports = router;
