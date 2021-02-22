const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signup, signout } = require("../controllers/auth");

router.post(
  "/signup",
  body("name")
    .isLength({ min: 3 })
    .withMessage("name should be at least 3 chars"),
  body("email").isEmail().withMessage("email is requires"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password should be at least 3 chars"),
  signup
);
router.get("/signout", signout);

module.exports = router;
