const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

const router = express.Router();

router.post((req, res) => {
  const { money, vendorId, time } = req.body;

  const transactionSchema = mongoose.Schema({
    money: money,
    vendorId: vendorId,
    userId: req.session.studentId,
    transactionTime: time,
  });
  const transaction = new mongoose.model("transactions", transactionSchema);
  transaction
    .save()
    .then(() => {
      const studentBalance = new mongoose.model(
        "current-balance",
        mongoose.Schema({
          studentId: studentId,
          currentBalance: currentBalance,
        })
      );
      const prevBalance = studentBalance
        .findOne({ studentId: req.session.studentId })
        .then((user) => {
          return user.currentBalance;
        });
      studentBalance
        .findOneAndUpdate(
          { userId: `${req.session.studentId}` },
          { $set: { currentBalance: `${prevBalance - money}` } }
        )
        .catch((err) => {
          console.log(err);
        });
      res.json({ transactedMoney: money });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
