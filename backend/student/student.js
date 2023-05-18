const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

const studentRegistration = require("./registration");
const studentLogin = require("./login-logout");
const isAuthorized = require("./util/auth");
const transaction = require("./transaction");

const router = express.Router();

const MONGO_URI =
  "mongodb+srv://akamikado:mSW4SJTC0Qv0vdNG@cluster0.tyeevhl.mongodb.net/project?retryWrites=true&w=majority";

const store = new mongoDbStore({
  uri: MONGO_URI,
  collection: "student-sessions",
});

router.use(
  session({
    secret: "student-authentication",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post(studentRegistration);
router.post("/login", studentLogin.login);
router.post("transaction", isAuthorized.isAuthorized, transaction);
router.post("/logout", studentLogin.logout);

module.exports = router;
