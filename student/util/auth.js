const isEmail = require("validator/lib/isEmail");

exports.isAuthorized = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/student/login");
  }
  next();
};

exports.emailValidator = (req, res, next) => {
  const email = req.body.email;
  if (!isEmail(email)) {
    console.log("Invalid email");
  } else {
    next();
  }
};
