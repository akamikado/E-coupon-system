const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const student = require("./student/student");
const vendor = require("./vendor/vendor");

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:3000" }));
app.use("/student", student);

app.use("/vendor", vendor);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.tyeevhl.mongodb.net/project?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
