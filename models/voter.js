const db = require("../util/database")


module.exports = class Voter{
    constructor(id,username,password){
        this.id = id
        this.username = username;
        this.password = password;
    }
    save(){
        this.id= "ADSE"+Math.floor(1000*(Math.random()+1))
        db.execute(`INSERT INTO voters(username,password,voterno) VALUES("${this.username}","${this.password}","${this.id}")`)
    }
    static fetchUser(name,cb){
        db.execute(`SELECT * FROM voters WHERE username = "${name}"`)
        .then(results=>cb(results))
        .catch(err=>console.log(err))
    }
    static fetchById(id,cb){
        db.execute(`SELECT * FROM voters WHERE vid = "${id}"`)
        .then(results=>cb(results))
        .catch(err=>console.log(err))
    }
    static fetchAllVoters (cb){
        db.execute(`SELECT * FROM voters`)
        .then(results=>cb(results))
        .catch(err=>console.log(err))
    }
    static updateVoter(a,b,c,d,e,f,g,h,i,j,k,l){
        db.execute(`UPDATE voters SET username = "${a}",state ="${c}",phone ="${b}",lga="${d}",email="${e}",maritalstatus="${f}",gender="${g}",job="${h}",voterno="${i}",dob="${j}",passport="${k}" WHERE vid =${l}`)
    }
}