const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
  amount: { type: Number },
  vendorId: { type: String },
  studentId: { type: String },
  transactionTime: { type: String },
});

module.exports = mongoose.model("transactions", transactionSchema);
