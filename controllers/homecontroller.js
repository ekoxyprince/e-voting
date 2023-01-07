

exports.getHomePage = (req,res,next)=>{
    res.render("./home/home")
}
exports.getLoginPage = (req,res,next)=>{
    res.render("./home/login")
}
exports.getOfficialPage = (req,res,next)=>{
    res.render("./home/official")
}
exports.getSignupPage = (req,res,next)=>{
    res.render("./home/signup")
}