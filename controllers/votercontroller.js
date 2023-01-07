const Voter = require("../models/voter")
const Poll = require("../models/poll")
const Election = require("../models/election")
const Voting = require("../models/voting")

exports.getDashboardPage = (req,res,next)=>{
  if(req.user){
    let eligible = req.user.dob.length
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
                                                console.log( PDP,APC,APGA,LP,YNPP,SPDP,SAPC,SAPGA,SLP,SYNPP) 
                                                res.render("./voter/dashboard",
                                                {user:req.user,
                                                path:"/dashboard"
                                                ,eligible,
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
  
  }else{
    res.redirect("/login")
  }
}
exports.getProfilePage = (req,res,next)=>{
    if(req.user){
        res.render("./voter/profile",{
            user:req.user,
            path:"/profile"
        })
    }
}
exports.postProfilePage = (req,res,next)=>{
    if(req.user){
        let {name,phone,state,lga,email,marital,gender,job,voterno,dob} = req.body
        let imageDestination = req.file.destination
        let imageFilename = req.file.filename
        let image_location = imageDestination + imageFilename;
        let image_src = image_location.slice(8)  
        let id = req.user.vid
        Voter.updateVoter(name,phone,state,lga,email,marital,gender,job,voterno,dob,image_src,id)
        res.redirect("/voter/dashboard") 
    }else{
        res.redirect("/login")
    }
}
exports.getVotingPage = (req,res,next)=>{
    if(req.user){
        let id = req.user.vid
        let {type} = req.query
        Election.fetchByType(type,elections=>{
            Voting.checkVote(id,type,check=>{
                
                Poll.fetchAll(poll=>{
                                                                              
                    res.render("./voter/election",{
                        user:req.user,
                        elections:elections,
                        path:"/dashboard",
                        stations:poll,
                        check
                    })
                                                  
                })
               
            })
     
        })

    }else{
        res.redirect("/login")
    }
}
exports.postVotingPage = (req,res,next)=>{
    if(req.user){
       let id = req.user.vid
       let{name,party,type,stations} = req.body

     let voting = new Voting(name,party,type,stations,id)
       voting.save()
       res.redirect("/voter/dashboard")
    }else{
        res.redirect("/login")
    }
}



