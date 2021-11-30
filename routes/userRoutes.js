require("dotenv").config();
var router = require("express").Router();
const db = require("../db");
const user_schema = require("../schemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("./auth");

//! GET ALL USERS FROM DB
//* URL: http://localhost:3000/api/users
router.get("/", async (req, res) => {
    try {
        //create a new user
        const users = await db.query("SELECT * FROM user_table");

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
});

//! CREATE A USER AND POST TO DB
//* URL: http://localhost:3000/api/users
//* BODY: {username: "string", email: "string", password: "string"}
router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (username === "" || email === "" || password === "") {
            return res.sendStatus(400);
        }

        // * validate user
        const validatedData = user_schema.validate({
            username,
            email,
            password,
        });

        if (validatedData.error) {
            return res.status(400).json(validatedData.error.message);
        }

        // * check if email already exists
        const checkDB = await db.query(
            "SELECT * FROM user_table WHERE user_email = ($1)",
            [email]
        );

        if (checkDB.length > 0) {
            return res.sendStatus(400);
        }

        // * hash password and create user
        const saltRounds = 10;
        await bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(400).json(err);
            }

            const newUser = await db.query(
                "INSERT INTO user_table (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",
                [username, email, hash]
            );
            console.log(newUser);
            res.status(200).json(newUser);
        });
    } catch (err) {
        return res.status(400).json(err);
    }
});

//! DELETE A USER FROM DB [USER_ID]
//* URL: http://localhost:3000/api/users/{:userID}
router.delete("/:id", validate, async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await db.query(
            "DELETE FROM user_table WHERE user_id = ($1) RETURNING *",
            [id]
        );

        return res.status(200).json(deletedUser);
    } catch (err) {
        return res.status(400).send(err);
    }
});

//! GET ONE USER FROM DB [USER_ID]
//* URL: http://localhost:3000/api/users/{:userID}
router.get("/:id", validate, async (req, res) => {
    try {
        const user = await db.query(
            "SELECT * FROM user_table WHERE user_id = ($1)",
            [req.params.id]
        );

        console.log(req.user);

        res.status(200).json(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

//? DONE
//! LOGIN USER
//* URL: http://localhost:3000/api/users/login
//TODO authenticate user
//TODO GENERATE TOKEN
router.post("/login", async function (req, res) {
    //Authenticate user
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        const user = await db.query(
            "SELECT * FROM user_table WHERE user_email = ($1)",
            [email]
        );

        //* Checking Email
        if (user.length < 1) {
            return res
                .status(400)
                .send("Your email or password is invalid. Please try again.");
        }

        //* Checking Password
        const hash = user[0].user_password;
        bcrypt.compare(password, hash, function (err, result) {
            if (result == false) {
                return res
                    .status(400)
                    .send(
                        "Your email or password is invalid. Please try again."
                    );
            } else if (result === true) {
                //* AUTHENTICATED
                const userObj = user[0];

                const acessToken = jwt.sign(userObj, process.env.TOKEN_SECRET);

                return res.status(200).json({ user, token: acessToken });
            }
        });
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;
