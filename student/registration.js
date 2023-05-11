const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const router = express.Router();

const studentSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: mongoose.Types.ObjectId,
});
const User = mongoose.model("student", studentSchema);

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/student/registration", async (req, res) => {
  const email = req.body.email;
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
          /*res.redirect("/student/login");*/
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.redirect("/student/registration");
  }
});

module.exports = router;
