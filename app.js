const express = require("express");

const mongoose = require("mongoose");

const student = require("./student/student");
const vendor = require("./vendor/vendor");

const app = express();

app.use("/student", student);

app.use("/vendor", vendor);

mongoose
  .connect(
    "mongodb+srv://akamikado:mSW4SJTC0Qv0vdNG@cluster0.tyeevhl.mongodb.net/project?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
