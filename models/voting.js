const db = require("../util/database")


module.exports = class Voting{
    constructor(candidate,party,type,station,vid){
        this.candidate = candidate
        this.party = party
        this.type = type
        this.station = station 
        this.vid = vid
    }
    save(){
        db.execute(`INSERT INTO voting(candidate,party,type,station,vid) VALUES("${this.candidate}","${this.party}","${this.type}","${this.station}","${this.vid}")`)
    }
    static fetchAll(cb){
        db.execute("SELECT * FROM voting INNER JOIN voters ON voters.vid = voting.vid")
        .then(results=>cb(results[0]))
        .catch(err=>console.log(err))
    }
    static checkVote(id,type,cb){
        db.execute(`SELECT * FROM voting WHERE type = "${type}" AND vid = "${id}"`)
        .then(results=>cb(results[0].length))
        .catch(err=>console.log(err))
    }
    static getPartyVotes(party,type,cb){
        db.execute(`SELECT * FROM voting WHERE party ="${party}" AND type="${type}"`)
        .then(results=>cb(results[0].length))
        .catch(err=>console.log(err))
    }
   
}