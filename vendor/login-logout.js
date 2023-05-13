const express = require("express");

const bcrypt = require("bcryptjs");
const session = require("connect-mongodb-session");

const User = require("./util/vendor-db-schema");

const router = express.Router();

function login(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.redirect(308, "/vendor/login");
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        console.log("matched");
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.vendorId = user.vendorId;
        return req.session.save((err) => {
          console.log(err);
          return res.redirect("/vendor/home");
        });
      }
      return res.redirect(308, "/vendor/login");
    });
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/home");
  });
}

module.exports = { login: login, logout: logout };
