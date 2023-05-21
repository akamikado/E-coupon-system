const express = require("express");

const bcrypt = require("bcryptjs");
const session = require("express-session");

const User = require("./util/student-db-schema");

async function login(req, res) {
  const { email, password } = req.body;
  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ emailCheck: false, passwordCheck: false });
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        const stringUser = JSON.stringify(user);
        const parsedUser = JSON.parse(stringUser);
        req.session.studentId = parsedUser.studentId;
        console.log(req.session.studentId);
        res.set({
          "session-id": `${req.session.id}`,
          "student-id": `${req.session.studentId}`,
        });
        return req.session.save((err) => {
          console.log(err);
          return res.json({
            loginSuccess: true,
          });
        });
      }
      return res.json({
        emailCheck: true,
        passwordCheck: false,
      });
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
