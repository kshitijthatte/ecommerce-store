const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { makePayment } = require("../controllers/payment");

router.param("userId", getUserById);

router.post("/razorpay/:userId", isSignedIn, isAuthenticated, makePayment);

module.exports = router;
