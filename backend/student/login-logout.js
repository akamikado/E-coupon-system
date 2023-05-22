const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./util/student-db-schema");

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, "////", password);
  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ emailCheck: false, passwordCheck: false });
    }
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        console.log(user);
        const stringUser = JSON.stringify(user);
        const parsedUser = JSON.parse(stringUser);
        console.log(parsedUser._id);
        const token = jwt.sign(
          {
            user: "student",
            studentId: parsedUser._id,
          },
          "student-authorization",
          { expiresIn: "2h" }
        );
        return res.json({
          loginSuccess: true,
          studentId: parsedUser._id,
          token,
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
