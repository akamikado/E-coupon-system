const express = require("express");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authorization = require("./util/auth");
const cors = require("cors");

const router = express.Router();

const User = require("./util/student-db-schema");
router.use(cors());
router.post("/registration", authorization.emailValidator, (req, res) => {
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
        const stringStudentId = JSON.stringify(studentId);
        const parsedSTudentId = JSON.parse(stringStudentId);
        user.studentId = parsedSTudentId.studentId;
        user
          .save()
          .then(() => {
            const currentBalanceSchema = mongoose.Schema({
              studentId: user.studentId,
              currentBalance: 15000,
            });
            const initialBalance = new mongoose.model(
              "current-balance",
              currentBalanceSchema
            );
            initialBalance.save().catch((err) => console.log(err));
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
