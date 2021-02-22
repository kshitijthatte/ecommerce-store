const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array()[0].msg, param: errors.array()[0].param });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Unable to save user in DB",
      });
    }
    res.json({ name: user.name, email: user.email, id: user._id });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "user signout",
  });
};
