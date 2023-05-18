const express = require("express");

const bcrypt = require("bcryptjs");
const session = require("connect-mongodb-session");

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
        req.session.vendorId = user.vendorId;
        res.setHeader("session-id", req.session.id);
        return req.session.save((err) => {
          console.log(err);
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
