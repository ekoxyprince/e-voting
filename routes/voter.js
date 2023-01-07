const express = require("express");
const router = express.Router();
const {promisify} = require("util")
const upload =require("../middlewares/multer")
const authController = require("../controllers/authcontroller")
const voterController = require("../controllers/votercontroller")

router.get("/dashboard",authController.isLoggedIn,voterController.getDashboardPage)
router.get("/profile",authController.isLoggedIn,voterController.getProfilePage)
router.post("/profile",upload.single("fileToUpload"),authController.isLoggedIn,voterController.postProfilePage)
router.get("/election",authController.isLoggedIn,voterController.getVotingPage)
router.post("/election",authController.isLoggedIn,voterController.postVotingPage)



module.exports = router