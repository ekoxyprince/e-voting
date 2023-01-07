const db = require("../util/database")

module.exports = class Pooling{
    constructor(sid,location,oid){
this.sid = sid
this.location = location
this.oid = oid 
    }
    save(){
        if(this.sid){
            return db.execute(`UPDATE polling_station SET current_location = "${this.location}",oid = "${this.oid}"`)
        }
        db.execute(`INSERT INTO polling_station(current_location,oid) VALUES("${this.location}","${this.oid}")`)
    }
    static fetchAll(cb){
        db.execute("SELECT * FROM polling_station INNER JOIN officials ON polling_station.oid = officials.oid")
        .then(results=>cb(results[0]))
        .catch(err=>console.log(err))
    }
    static deleteById(id){
        db.execute(`DELETE FROM polling_station WHERE sid = ${id}`)
    }
}