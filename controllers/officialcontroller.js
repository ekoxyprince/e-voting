const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Admin = require("../models/admin")
const Voting = require("../models/voting")
const Poll = require("../models/poll")
const Election = require("../models/election");
const Voter = require("../models/voter");
const Official = require("../models/official");


exports.getDashboard = (req,res,next)=>{
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
                                                  Voting.fetchAll(votes=>{
                                                    Election.fetchAll(elections=>{
                                                        res.render("./official/dashboard",
                                                        {user:req.user,
                                                        path:"/dashboard",
                                                        votes,elections,
                                                        PDP,APC,APGA,LP,YNPP,SPDP,SAPC,SAPGA,SLP,SYNPP})  
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
        res.redirect("/official")
    }
}

