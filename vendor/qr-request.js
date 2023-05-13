const express = require("express");

const qr = require("qrcode");
const session = require("express-session");

const router = express.Router();

router.post("/transaction", async (req, res) => {
  const amount = req.body.amount;
  const vendorId = req.session.vendorId;
  const text = `User ID: ${vendorId}, Amount: ${amount}`;
  const options = {
    margin: 1,
    width: 300,
    height: 300,
  };
  try {
    const qrCode = await qr.toBuffer(text, options);
    res.set("Content-Type", "image/png");
    res.send(qrCode);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
