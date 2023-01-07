const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Admin = require("../models/admin")
const Voting = require("../models/voting")
const Poll = require("../models/poll")
const Election = require("../models/election");
const Voter = require("../models/voter");
const Official = require("../models/official");




exports.auth = (req, res) => {
    res.render("./admin/auth")
}
exports.login = async(req, res) => {
    console.log(req.body)

    try {
        let email = req.body.email;
        let password = req.body.password
        if (!email || !password) {
            return res.status(400).render("./admin/auth", { 
                message: "no email or password"
                , response: "error",
                 resHeader: "Opps!" })
        }
        Admin.getAllContents("admin",async(admin)=>{
            if (admin.length === 0 || !(await bcrypt.compare(password, admin[0].password))) {
                return res.status(401).render("./admin/auth", {
                     message: "incorrect email or password",
                      response: "error",
                       resHeader: "Opps!" })
            } else {
                let id = admin[0].id
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
                res.status(200).redirect("/admin/dashboard")
            }
        })
    } catch (error) {
        console.log(error)
    }
}
exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETS);
            const id = decoded.id
            Admin.fetchById(id,voter=>{
                
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
exports.logout = (req, res) => {
    newCookieOption = {
        expires: new Date(
            Date.now() * 2 * 1000
        )
    }
    res.cookie("jwt", "logout", newCookieOption)
    res.status(200).redirect("/admin/auth")
};
exports.getAdminDashboard = (req,res,next)=>{
    if(req.user){
        Voting.getPartyVotes("PDP","presidential",PDP=>{
            Voting.getPartyVotes("APC","presidential",APC=>{
                Voting.getPartyVotes("LP","presidential",LP=>{
                    Voting.getPartyVotes("APGA","presidential",APGA=>{
                        Voting.getPartyVotes("YNPP","presidential",YNPP=>{
                            Poll.fetchAll(poll=>{
                                Voting.getPartyVotes("PDP","state",SPDP=>{
                                    Voting.getPartyVotes("APC","state",SAPC=>{
                                        Voting.getPartyVotes("LP","state",SLP=>{
                                            Voting.getPartyVotes("APGA","state",SAPGA=>{
                                                Voting.getPartyVotes("YNPP","state",SYNPP=>{
                                              Official.fetchAll(official=>{
                                                Voter.fetchAllVoters(voters=>{
                                                Voting.fetchAll(votes=>{
                                                    
                                                    res.render("./admin/dashboard",
                                                    {user:req.user,
                                                    path:"/dashboard",
                                                    PDP,APC,APGA,LP,YNPP,SPDP,SAPC,SAPGA,SLP,SYNPP,
                                                official:official.length,
                                            voters:voters[0].length,
                                        votes:votes.length})
                                                })
                                                   
                                                })
                                             
                                              })
                                                   
                                                 
                                                })
                                            })
                                        })
                                    }) 
                                })
                             })
                        })
                    })
                })
            }) 
        })
    }else{
        res.redirect("/admin/auth")
    }
}


exports.getVotes = (req,res,next)=>{
    if(req.user){
Voting.fetchAll(votes=>{
    res.render("./admin/votes",{
        votes
    })
})
    }else{
        res.redirect("/admin/auth")
    }
}

exports.getElectionPage = (req,res,next)=>{
    if(req.user){
        Election.fetchAll(elections=>{
            res.render("./admin/viewelection",{elections})
        })

    }else{
        res.redirect("/admin/auth")
    }
}
exports.getElectionDeletePage = (req,res,next)=>{
    if(req.user){
        let {id} = req.params
        Election.deleteById(id)
        res.redirect("/admin/dashboard")

    }else{
        res.redirect("/admin/auth")
    }
}
exports.getElectionAddPage = (req,res,next)=>{
    if(req.user){
res.render("./admin/addelection",{action:"add"})
    }else{
        res.redirect("/admin/auth")
    }
}
exports.postElectionAddPage = (req,res,next)=>{
    if(req.user){
        let {type,status,start,stop,party,candidate} = req.body
        let election = new Election(null,type,status,start,stop,party,candidate)
        election.save()
        res.redirect("/admin/add_election")
    }else{
        res.redirect("/admin/auth")
    }
}
exports.getUpdateElectionPage = (req,res,next)=>{
    if(req.user){
        let {id} = req.params
        Election.fetchById(id,election=>{
            res.render("./admin/addelection",
            {action:"edit",election:election[0]})
        })
       
    }else{
        res.redirect("/admin/auth")
    }
}
exports.postElectionUpdate = (req,res,next)=>{
    if(req.user){
let {id} = req.params
let {type,status,start,stop,party,candidate} = req.body
let election = new Election(id,type,status,start,stop,party,candidate)
election.save()
res.redirect("/admin/view_election")
    }else{
        res.redirect("/admin/auth")
    }
}
exports.getOfficialViewPage = (req,res,next)=>{
    if(req.user){
Official.fetchAll(officials=>{
    
    res.render("./admin/viewofficial",{officials:officials})
})
    }else{
        res.redirect("/admin/auth")
    }
}
exports.getOfficialAddPage = (req,res,next)=>{
    if(req.user){
Official.fetchAll(officials=>{
    
    res.render("./admin/addofficial",{officials:officials})
})
    }else{
        res.redirect("/admin/auth")
    }
}

exports.postAddOfficial = async(req,res,next)=>{
if(req.user){
let {name,password} = req.body
let hashedPassword = await bcrypt.hash(password,8)
let official = new Official(null,name,hashedPassword)
official.save()
res.redirect("/admin/add_officials")
}else{
    res.redirect("/admin/auth")
}
}
exports.getDeleteOfficial = (req,res,next)=>{
    if(req.user){
        let {id} = req.params
Official.deleteById(id)
res.redirect("/admin/view_officials")
    }else{
        res.redirect("/admin/auth")
    }
}
exports.getViewStation = (req,res,next)=>{
    if(req.user){
Poll.fetchAll(polls=>{
  res.render("./admin/viewstation",{stations:polls})
})
    }else{
        res.redirect("/admin/auth")
    }
}
exports.getAddStationPage = (req,res,next)=>{
    if(req.user){
        Poll.fetchAll(polls=>{
            res.render("./admin/addstation",{stations:polls})
          })
    }else{
        res.redirect("/admin/auth")
    }
}
exports.postAddStationPage = (req,res,next)=>{
    if(req.user){
let {location,official} =req.body
let poll = new Poll(null,location,official)
poll.save()
res.redirect("/admin/add_stations")
    }else{
        res.redirect("/admin/auth")
    }
}
exports.getDeleteStation = (req,res,next)=>{
if(req.user){
let {id} = req.params
Poll.deleteById(id)
res.redirect("/admin/view_stations")
}else{
    res.redirect("/admin/auth")
}
}
exports.getVotersPage = (req,res,next)=>{
    if(req.user){
Voter.fetchAllVoters(voter=>{
    res.render("./admin/voters",{voters:voter[0]})
})
    }else{
        res.redirect("/admin/auth")
    }
}


