const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

const vendorRegistration = require("./registration");
const vendorLogin = require("./login-logout");
const vendorQr = require("./qr-request");
const TransactionHistory = require("./transaction-history");

const router = express.Router();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.tyeevhl.mongodb.net/project?retryWrites=true&w=majority`;

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

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(vendorRegistration);

router.post("/login", vendorLogin.login);

router.use(vendorQr);

router.use("/transaction-history", TransactionHistory);

router.use("/logout", vendorLogin.logout);

module.exports = router;
