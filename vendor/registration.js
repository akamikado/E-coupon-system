const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const router = express.Router();

const vendorSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendorId: mongoose.Types.ObjectId,
});
const User = mongoose.model("vendor", vendorSchema);

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/vendor/registration", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    return bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      const vendorId = new mongoose.Types.ObjectId();
      user.vendorId = vendorId.toString();
      user
        .save()
        .then(() => {
          /*res.redirect("/vendor/login");*/
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    res.redirect("/vendor/registration");
  }
});

module.exports = router;
