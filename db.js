require("dotenv").config();
var pgp = require("pg-promise")();

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    max: 20, // use up to 30 connections
};

const db = pgp(cn);

module.exports = db;
