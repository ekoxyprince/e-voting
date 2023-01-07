const db = require("../util/database")
const { deleteById } = require("./election")

module.exports = class Official{
    constructor(id,name,password){
        this.id = id 
        this.name = name
        this.password = password 
    }
    save(){
        db.execute(`INSERT INTO officials(official_name,password) VALUES("${this.name}","${this.password}")`)
    }
    static deleteById(id){
        db.execute(`DELETE FROM officials WHERE oid = "${id}"`)
    }
    static fetchAll(cb){
        db.execute(`SELECT * FROM officials `)
        .then(results=>cb(results[0]))
        .catch(err=>console.log(err))
    }
    static fetchById(id,cb){
        db.execute(`SELECT * FROM officials WHERE oid = "${id}"`)
        .then(results=>cb(results))
        .catch(err=>console.log(err))
    }
    static fetchUser(name,cb){
        db.execute(`SELECT * FROM officials WHERE official_name = "${name}"`)
        .then(results=>cb(results))
        .catch(err=>console.log(err))
    }
}