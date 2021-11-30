require("dotenv").config();
const pgp = require("pg-promise")();

const con = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};

const db = pgp(con);

module.exports = db;
