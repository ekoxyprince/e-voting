const express = require("express")
const router = express.Router()
const homeController = require("../controllers/homecontroller")

router.get("/",homeController.getHomePage)
router.get("/login",homeController.getLoginPage)
router.get("/official",homeController.getOfficialPage)
router.get("/signup",homeController.getSignupPage)


module.exports = router