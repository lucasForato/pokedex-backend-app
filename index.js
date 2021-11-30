const express = require("express");
const app = express();
const port = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
const deckRoutes = require("./routes/deckRoutes");
var cors = require("cors");

app.use(cors());
app.use(express.json()); //have acces to request.body

//MIDLEWARES
app.use("/api/users", userRoutes);
app.use("/api/decks", deckRoutes);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
