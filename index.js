const cool = require("cool-ascii-faces");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const deckRoutes = require("./routes/deckRoutes");

app.use(cors());
app.use(express.json()); //have acces to request.body

//MIDLEWARES
app.use("/api/users", userRoutes);
app.use("/api/decks", deckRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
