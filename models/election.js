const db = require("../util/database")

module.exports = class Election{
    constructor(eid,type,status,start,stop,party,candidate){
        this.eid = eid
        this.type = type
        this.status = status
        this.start = start
        this.stop = stop
        this.party =party
        this.candidate = candidate
    }
   
    save(){
        if(this.eid){
        return db.execute(`UPDATE election SET election_type="${this.type}",status = "${this.status}",start="${this.start}",stop="${this.stop}",party="${this.party}",candidate="${this.candidate}"`)    
        }
        db.execute(`INSERT INTO election(election_type,status,start,stop,party,candidate) VALUES("${this.type}","${this.status}","${this.start}","${this.stop}","${this.party}","${this.candidate}")`)
    }
    static deleteById(id){
        db.execute(`DELETE FROM election WHERE eid = ${id}`)
    }
    static fetchAll(cb){
        db.execute("SELECt * FROM election")
        .then(results=>cb(results[0]))
        .catch(err=>console.log(err))
    }
    static fetchById(id,cb){
        db.execute(`SELECT * FROM election WHERE eid = ${id}`)
        .then(results=>cb(results[0]))
        .catch(err=>console.log(err))
    }
    static fetchByType(id,cb){
db.execute(`SELECT * FROM election where election_type = "${id}"`)
.then(results=>cb(results[0]))
.catch(err=>console.log(err))
    }
} 