import connectToMongo from "./database/db.js";
import express from "express";
// require('dotenv').config();
import "dotenv/config";

connectToMongo();
const app = express();
const port = process.env.PORT_NUMBER || 4000;

app.get("/", (req, res) => {
  res.send("hello sourav");
});
app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});
