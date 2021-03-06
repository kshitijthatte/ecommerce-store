const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/user/:userId/orders",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
