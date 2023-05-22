const express = require("express");
const mongoose = require("mongoose");

const User = require("./util/student-db-schema");
const router = express.Router();

const TransactionModel = require("./util/transaction-schema");
router.post("/", (req, res) => {
  const { amount, vendorId, time, studentId } = req.body;

  const transaction = new TransactionModel({
    amount: amount,
    vendorId: vendorId,
    studentId: studentId,
    transactionTime: time,
  });
  transaction
    .save()
    .then(() => {
      User.findOne({
        _id: Object(studentId),
      }).then((user) => {
        User.findOneAndUpdate(
          { _id: Object(studentId) },
          { $set: { currentBalance: `${user.currentBalance - amount}` } }
        )
          .then(() => {
            return res.json({ transation: true });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
