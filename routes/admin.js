const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admincontroller")


router.get("/auth", adminController.auth)
router.post("/auth", adminController.login)
router.get("/logout", adminController.logout)
router.get("/dashboard",adminController.isLoggedIn,adminController.getAdminDashboard)
router.get("/votes",adminController.isLoggedIn,adminController.getVotes)
router.get("/view_election",adminController.isLoggedIn,adminController.getElectionPage)
router.get("/delete_elect/:id",adminController.isLoggedIn,adminController.getElectionDeletePage)
router.get("/update_elect/:id",adminController.isLoggedIn,adminController.getUpdateElectionPage)
router.post("/update_elect/:id",adminController.isLoggedIn,adminController.postElectionUpdate)
router.get("/add_election",adminController.isLoggedIn,adminController.getElectionAddPage)
router.post("/add_election",adminController.isLoggedIn,adminController.postElectionAddPage)
router.get("/view_officials",adminController.isLoggedIn,adminController.getOfficialViewPage)
router.get("/add_officials",adminController.isLoggedIn,adminController.getOfficialAddPage)
router.post("/add_officials",adminController.isLoggedIn,adminController.postAddOfficial)
router.get("/delete_official/:id",adminController.isLoggedIn,adminController.getDeleteOfficial)
router.get("/view_stations",adminController.isLoggedIn,adminController.getViewStation)
router.get("/add_stations",adminController.isLoggedIn,adminController.getAddStationPage)
router.post("/add_stations",adminController.isLoggedIn,adminController.postAddStationPage)
router.get("/delete_station/:id",adminController.isLoggedIn,adminController.getDeleteStation)
router.get("/voters",adminController.isLoggedIn,adminController.getVotersPage)



module.exports = router