const express = require("express");

const bcrypt = require("bcryptjs");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

const User = require("./util/vendor-db-schema");

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ emailCheck: false, passwordCheck: false });
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        const stringUser = JSON.stringify(user);
        const parsedUser = JSON.parse(stringUser);
        req.session.vendorId = parsedUser.vendorId;
        return req.session.save((err) => {
          console.log(err);
          res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
          res.setHeader("Access-Control-Allow-Credentials", "true");
          return res.json({ loginSuccess: true });
        });
      }
      return res.json({ email: true, password: false });
    });
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred during logout." });
    }
    res.status(200).json({ message: "Logout successful." });
  });
}

module.exports = { login: login, logout: logout };
