const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const authorization = require("./util/auth");

const router = express.Router();

const User = require("./util/student-db-schema");
const login = require("./login-logout");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/registration", authorization.emailValidator, async (req, res) => {
  const email = req.body.email;
  if (/^f20\d{6}@hyderabad.bits-pilani.ac.in/.test(email)) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password === confirmPassword) {
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
        });
        const studentId = new mongoose.Types.ObjectId();
        user.studentId = String(studentId);
        user
          .save()
          .then(() => {
            res.redirect("/student/login");
            console.log("saved");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      console.log("Password is incorrect");
      res.redirect(308, "/student/registration");
    }
  } else {
    console.log("Email is not accepted");
    res.redirect(308, "/student/registration");
  }
});

module.exports = router;
