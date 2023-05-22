const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./util/vendor-db-schema");

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ emailCheck: false, passwordCheck: false });
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        const stringUser = JSON.stringify(user);
        const parsedUser = JSON.parse(stringUser);
        const token = jwt.sign({
          user: "vendor",
          vendorId: parsedUser.vendorId,
        },'vendor-authorization',{expiresIn:'2h'});
        return res.json({
          loginSuccess: true,
          vendorId: parsedUser.vendorId,
          token
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
