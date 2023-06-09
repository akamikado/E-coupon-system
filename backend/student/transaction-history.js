const express = require("express");

const TransactionModel = require("./util/transaction-schema");

const router = express.Router();

router.post("/", (req, res) => {
  const studentId = req.body.studentId;
  TransactionModel.find({ studentId: studentId }).then((responses) => {
    console.log(responses);
    res.json(responses);
  });
});

module.exports = router;
