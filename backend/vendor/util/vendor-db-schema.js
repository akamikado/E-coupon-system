const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendorId: mongoose.Types.ObjectId,
});

module.exports = mongoose.model("vendor", vendorSchema);
