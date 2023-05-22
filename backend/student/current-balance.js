const User = require("./util/student-db-schema");
function currentBalance(req, res) {
  const studentId = req.body.studentId;
  User.findOne({ _id: Object(studentId) }).then((user) => {
    return res.json({ currentBalance: user.currentBalance });
  });
}
module.exports = currentBalance;
