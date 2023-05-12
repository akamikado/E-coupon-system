const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentId: mongoose.Types.ObjectId,
});

module.exports = mongoose.model("student", studentSchema);
