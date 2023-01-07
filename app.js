const express = require("express")
const app = express()
const ejs = require("ejs")
const port = process.env.PORT || 3000
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()
const db = require("./util/database")
const homeRoute = require("./routes/home")
const authRoute = require("./routes/auth")
const voterRoute = require("./routes/voter")
const officialRoute = require("./routes/official")
const adminRoute = require("./routes/admin")
const cookieParser = require("cookie-parser")

//Middleware
app.set("view engine","ejs")
app.engine("ejs",ejs.renderFile)
app.set("views","views")
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

//Routes
app.use("/",homeRoute)
app.use("/auth",authRoute)
app.use("/voter",voterRoute)
app.use("/official",officialRoute)
app.use("/admin",adminRoute)

//server
app.listen(port,()=>{
    console.log(`app listen on ${port}`)
})

