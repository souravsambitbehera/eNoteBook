import connectToMongo from "./database/db.js";
import express from "express";
import auth from "./routes/auth.js"
import notes from "./routes/notes.js"
// require('dotenv').config();
import "dotenv/config";

connectToMongo();
const app = express();
const port = process.env.PORT_NUMBER || 4000;

// app.get("/", (req, res) => {
//   res.send("hello sourav");
// });
app.use(express.json())

app.use("/auth",auth)
app.use("/auth",notes)

app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});
