const db = require("../util/database")


module.exports = class Admin {

    static getAllContents(table,cb){
        db.execute(`SELECT * FROM ${table}`)
        .then(results=>cb(results[0]))
        .catch(err=>console.log(err))
    }
    static fetchById(id,cb){
        db.execute(`SELECT * FROM admin WHERE id = "${id}"`)
        .then(results=>cb(results))
        .catch(err=>console.log(err))
    }
}