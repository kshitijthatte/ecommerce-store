const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

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

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array()[0].msg, param: errors.array()[0].param });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error:
          "The email you entered doesn't belong to any account. Please check and try again.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error:
          "The email and password you entered did not match. Please check and try again.",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie();
  res.json({
    message: "User signout successful",
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You do not have Administrator privileges, ACCESS DENIED",
    });
  }
  next();
};
