const express = require("express");

const TransactionModel = require("../student/util/transaction-schema");

const router = express.Router();

router.post("/", (req, res) => {
  const vendorId = req.body.vendorId;
  TransactionModel.find({ vendorId: vendorId }).then((responses) => {
    console.log(responses);
    res.json(responses);
  });
});

module.exports = router;
