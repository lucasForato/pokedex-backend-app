var fs = require("fs");
require("dotenv").config();
var pgp = require("pg-promise")();

const config = {
    connectionString: process.env.DATABASE_URL,
    // Beware! The ssl object is overwritten when parsing the connectionString
};

const db = pgp(config);

module.exports = db;
