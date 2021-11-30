var router = require("express").Router();
const db = require("../db");

//? WORKING
//! GET ALL DECKS
//* URL: http://localhost:3000/api/decks
router.get("/", async (req, res) => {
    try {
        //create a new user
        const decks = await db.query(
            "SELECT user_email, user_deck FROM user_table"
        );

        res.status(200).json(decks);
    } catch (err) {
        console.log(err);
    }
});

//? WORKING
//! CREATE DECK USING DECK STRING AND APPEND TO USER
//* URL: http://localhost:3000/api/decks/{:user_id}
//* BODY: {decktring}
router.post("/:id", async (req, res) => {
    try {
        const deck = req.body.deck;

        //create a new user
        const newDeck = await db.query(
            "UPDATE user_table SET user_deck = ($1) WHERE user_id = ($2) RETURNING *",
            [deck, req.params.id]
        );

        res.status(200).json(newDeck);
    } catch (err) {
        res.status(400).json(err);
    }
});

//? WORKING
//! DELETE DECK [DECK_ID]
//* URL: http://localhost:3000/api/decks/{:id}
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deck = null;
        const deletedUser = await db.query(
            "UPDATE user_table SET user_deck = ($1) WHERE user_id = ($2) RETURNING *",
            [deck, id]
        );

        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

//? WORKING
//! GET SPECIFIC DECK
//* URL: http://localhost:3000/api/decks/{:id}
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deck = await db.query(
            "SELECT user_deck FROM user_table WHERE user_id = ($1)",
            [id]
        );

        res.status(200).json(deck);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
