const express = require("express")
const router = express.Router()
const authController = require("../controllers/authcontroller")
const officialController = require("../controllers/officialcontroller")

router.get("/dashboard",authController.isLogged,officialController.getDashboard)
module.exports = router;