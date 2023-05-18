const express = require("express");

const qr = require("qrcode");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

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

router.post("/transaction", (req, res) => {
  const vendorIdString = JSON.stringify(req.session.vendorId);
  res.json({ vendorId: vendorIdString });
});

module.exports = router;
