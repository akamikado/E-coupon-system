const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const User = require("./util/vendor-db-schema");
const authorizer = require("./util/auth");

const router = express.Router();

router.post("/registration", authorizer.emailvalidator, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    return bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      const vendorId = new mongoose.Types.ObjectId();
      user.vendorId = vendorId.toString();
      user
        .save()
        .then(() => {
          res.json({ email: true, password: true });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.json({ email: false, password: false });
  }
});

module.exports = router;
