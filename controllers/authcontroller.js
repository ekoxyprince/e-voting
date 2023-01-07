const Voter = require("../models/voter")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {promisify} = require("util");
const Official = require("../models/official");

exports.postSignupPage = (req,res,next)=>{
   let {username,password,cpassword} = req.body
   Voter.fetchUser(username,async user=>{
    if(user[0].length>0){
        res.render("./home/signup", { message: "Username Already exists", response: "error", resHeader: "Oops!" })
    }else if(password !== cpassword){
        res.render("./home/signup", { message: "mismatched passwords", response: "error", resHeader: "Oops!" })
       } else {
  let hashedPassword = await bcrypt.hash(password,8)
        let voter = new Voter(null,username,hashedPassword)
        voter.save()
        res.redirect("/login")
       }
   }) 
   
}

exports.postSigninPage = (req,res,next)=>{
    let {username,password} = req.body;
    Official.fetchUser(username,async user=>{
     if(user[0].length === 0){
         res.render("./home/official", { message: "Incorrect username or password", response: "error", resHeader: "Oops!" }) 
     }else if(password.length===0 || !(await bcrypt.compare(password,user[0][0].password)) ){
         res.render("./home/official", { message: "Incorrect username or password", response: "error", resHeader: "Oops!" }) 
     }else{
         let id = user[0][0].oid
         let token = jwt.sign({ id: id },
              process.env.JWT_SECRETS, 
              { expiresIn: process.env.JWT_EXPIRES_IN })
         const cookieOptions = {
             expires: new Date(
                 Date.now() + 
                 process.env.COOKIES_EXPIRES_IN * 60 * 1000
             ),
             httpOnly: true
         }
         res.cookie("jwt", token, cookieOptions)
         res.redirect("/official/dashboard")
     }
    })
}
exports.isLogged = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETS);
            const id = decoded.id

            Official.fetchById(id,official=>{
                if (official[0][0].length===0) {
                    return next();
                }
                req.user = official[0][0]
                return next();
            })
        } catch (error) {
            console.log(error);
            next()
        }
    } else {
        next();
    }

};

exports.postLoginPage = (req,res,next)=>{
   let {username,password} = req.body;
   Voter.fetchUser(username,async user=>{
    if(user[0].length === 0){
        res.render("./home/login", { message: "Incorrect username or password", response: "error", resHeader: "Oops!" }) 
    }else if(password.length===0 || !(await bcrypt.compare(password,user[0][0].password)) ){
        res.render("./home/login", { message: "Incorrect username or password", response: "error", resHeader: "Oops!" }) 
    }else{
        let id = user[0][0].vid
        let token = jwt.sign({ id: id },
             process.env.JWT_SECRETS, 
             { expiresIn: process.env.JWT_EXPIRES_IN })
        const cookieOptions = {
            expires: new Date(
                Date.now() + 
                process.env.COOKIES_EXPIRES_IN * 60 * 1000
            ),
            httpOnly: true
        }
        res.cookie("jwt", token, cookieOptions)
        res.redirect("/voter/dashboard")
    }
   })
}
exports.logout = (req, res) => {
    newCookieOption = {
        expires: new Date(
            Date.now() * 2 * 1000
        )
    }
    res.cookie("jwt", "logout", newCookieOption)
    res.status(200).redirect("/login")
};

exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETS);
            const id = decoded.id
            Voter.fetchById(id,voter=>{
                if (voter[0][0].length===0) {
                    return next();
                }
                req.user = voter[0][0]
                return next();
            })
        } catch (error) {
            console.log(error);
            next()
        }
    } else {
        next();
    }

};


