const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const deckRoutes = require("./routes/deckRoutes");
var cors = require("cors");

app.use(cors());
app.use(express.json()); //have acces to request.body

//MIDLEWARES
app.use("/api/users", userRoutes);
app.use("/api/decks", deckRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port: ${process.env.PORT}`);
});
