const express = require("express");

const qr = require("qrcode");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");

const router = express.Router();
dotenv.config();
const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.tyeevhl.mongodb.net/project?retryWrites=true&w=majority`;

const store = new mongoDbStore({
  uri: MONGO_URI,
  collection: "vendor-sessions",
});

router.post("/transaction", (req, res) => {
  console.log(req.session.id);
  store.get(req.session.id, (err, session) => {
    const vendorId = session.vendorId;
    console.log(vendorId);
    res.json({ vendorId: vendorId });
  });
});

module.exports = router;
