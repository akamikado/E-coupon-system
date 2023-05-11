const express = require("express");

const vendorRegistration = require("./registration");
const vendorQr = require("./qr-request");

const router = express.Router();

router.use(vendorRegistration);

router.use(vendorQr);

module.exports = router;
