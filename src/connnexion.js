const mysql = require("mysql2")
const config = require("./config")

var con = mysql.createConnection( 
    {
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPass
    }
)

con.connect(function (err) {
    if (err) throw err;
    con.query(`CREATE DATABASE IF NOT EXISTS ${config.dbName}`, function (err, result) {
        if (err) throw err;
    });
});

var con = mysql.createConnection(
    {
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPass,
        database: config.dbName
    }
)

con.connect(function (err) {
    if (err) throw err;
    const sql = `CREATE TABLE IF NOT EXISTS admin (
        id int(11) AUTO_INCREMENT NOT NULL, 
        email VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)

        )`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});

con.connect((err)=>{
    if(err) throw err;
    const sql = `CREATE TABLE IF NOT EXISTS software  (
        id int(11) AUTO_INCREMENT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        support VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)

    )`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

con.connect((err) => {
    if (err) throw err;
    const sql = `CREATE TABLE IF NOT EXISTS downloaded  (
        id int(11) AUTO_INCREMENT NOT NULL,
        fkSoftware int(11) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)

    )`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

con.connect((err) => {
    if (err) throw err;
    const sql = `CREATE TABLE IF NOT EXISTS version  (
        id int(11) AUTO_INCREMENT NOT NULL,
        fkSoftware int(11) NOT NULL,
        versionTag VARCHAR(10) NOT NULL,
        path VARCHAR(255) NOT NULL,
        isCurrent BOOLEAN NOT NULL DEFAULT false,
        isStable  BOOLEAN NOT NULL DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
    )`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

con.connect((err) => {
    if (err) throw err;
    const sql = `CREATE TABLE IF NOT EXISTS media  (
        id int(11) AUTO_INCREMENT NOT NULL,
        fkSoftware int(11) NOT NULL,
        type VARCHAR(255) NOT NULL,
        isCover BOOLEAN NOT NULL DEFAULT true,
        path VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
    )`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

con.connect((err) => {
    if (err) throw err;
    const sql = `ALTER TABLE media ADD FOREIGN KEY (fkSoftware) REFERENCES software (id);`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

con.connect((err) => {
    if (err) throw err;
    const sql = `ALTER TABLE version ADD FOREIGN KEY (fkSoftware) REFERENCES software (id);`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

con.connect((err) => {
    if (err) throw err;
    const sql = `ALTER TABLE downloaded ADD FOREIGN KEY (fkSoftware) REFERENCES software (id);`
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

})

module.exports = con

