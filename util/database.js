const mysql = require("mysql2")

const pool = mysql.createPool({
    database:process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host:process.env.DATABASE_HOST
})

module.exports = pool.promise()