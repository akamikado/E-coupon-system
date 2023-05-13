const isEmail = require("validator/lib/isEmail");

exports.isAuthorized = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/vendor/login");
  }
  next();
};

exports.emailvalidator = (req, res, next) => {
  const email = req.body.email;
  if (!isEmail(email)) {
    console.log("Invalid email");
    return res.redirect(308, "/vendor/registration");
  } else {
    next();
  }
};
