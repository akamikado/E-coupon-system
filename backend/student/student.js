const express = require("express");
const dotenv = require("dotenv");

const studentRegistration = require("./registration");
const studentLogin = require("./login-logout");
const transaction = require("./transaction");
const currentBalance = require("./current-balance");
const transactionHistory = require("./transaction-history");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(studentRegistration);
router.post("/login", studentLogin.login);
router.use("/transaction", transaction);
router.post("/current-balance", currentBalance);
router.use("/transaction-history", transactionHistory);
router.post("/logout", studentLogin.logout);

module.exports = router;
