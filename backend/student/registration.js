const express = require("express");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authorization = require("./util/auth");
const User = require("./util/student-db-schema");

const router = express.Router();

router.post("/registration", authorization.emailValidator, (req, res) => {
  const email = req.body.email;
  if (/^f20\d{6}@hyderabad.bits-pilani.ac.in/.test(email)) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password === confirmPassword) {
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        User.create({
          email: email,
          password: hashedPassword,
          currentBalance: 15000,
        })
          .then(() => {
            res.json({ email: true, password: true });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      //confirm password is not same
      res.json({ email: false, password: false });
    }
  } else {
    //invalid email
    res.json({ email: false, password: false });
  }
});

module.exports = router;
