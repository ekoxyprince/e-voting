const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller")

router.post("/signup",authController.postSignupPage)
router.post("/signin",authController.postSigninPage)
router.post("/login",authController.postLoginPage)
router.get("/logout",authController.logout)

module.exports = router