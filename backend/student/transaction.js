const express = require("express");
const mongoose = require("mongoose");

const User = require("./util/student-db-schema");
const router = express.Router();
const transactionSchema = mongoose.Schema({
  amount: { type: Number },
  vendorId: { type: String },
  studentId: { type: String },
  transactionTime: { type: String },
});
const TransactionModel = mongoose.model("transactions", transactionSchema);
router.post("/", (req, res) => {
  const { amount, vendorId, time, studentId } = req.body;

  const transation = new TransactionModel({
    amount: amount,
    vendorId: vendorId,
    studentId: studentId,
    transactionTime: time,
  });
  transation
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
