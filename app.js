const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts_routes = require("./routes/posts_routes");
app.use("/posts", posts_routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}).on('error', (err) => {
  console.error("Error starting server:", err);
});