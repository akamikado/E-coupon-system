const express = require("express");

const bcrypt = require("bcryptjs");
const session = require("connect-mongodb-session");

const User = require("./util/student-db-schema");

const router = express.Router();

function postLogin(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.redirect("/student/login");
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        console.log("matched");
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          return res.redirect("/student/home");
        });
      }
      return res.redirect("/student/login");
    });
  });
}

module.exports = postLogin;
