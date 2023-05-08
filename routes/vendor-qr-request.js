const express = require("express");

const app = express();

const qr = require("qrcode");

const vendorId = 1234;

app.get("/transaction", async (req, res) => {
  const amount = req.params.amount;
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

app.listen(3000);

module.exports = app;
