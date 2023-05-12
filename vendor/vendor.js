const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

const vendorRegistration = require("./registration");
const vendorLogin = require("./login");
const vendorQr = require("./qr-request");
const isAuthorized = require("./util/auth");

const router = express.Router();

const MONGO_URI =
  "mongodb+srv://akamikado:mSW4SJTC0Qv0vdNG@cluster0.tyeevhl.mongodb.net/project?retryWrites=true&w=majority";

const store = new mongoDbStore({
  uri: MONGO_URI,
  collection: "vendor-sessions",
});

router.use(
  session({
    secret: "vendor-authentication",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

router.use(vendorRegistration);

router.use("login", vendorLogin);

router.use(isAuthorized, vendorQr);

module.exports = router;
