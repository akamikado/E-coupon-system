const express = require("express");

const studentRegistration = require("./registration");
const studentLogin = require("./login");

const router = express.Router();

router.use(studentRegistration);

module.exports = router;
