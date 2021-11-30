require("dotenv").config();
var pgp = require("pg-promise")();

const cn = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    port: process.env.PORT,
};

const db = pgp(cn);

module.exports = db;
