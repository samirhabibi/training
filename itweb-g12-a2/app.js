const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

// On Error
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

//Create an object of Express
const app = express();

const users = require("./routes/users");
const workout = require("./routes/workout");

// Port Number
const port = 3000;

// CORS Middleware
//Cross-origin resource sharing (CORS) er en browsermekanisme,
//der muliggør kontrolleret adgang til ressourcer placeret uden for et givet domæne
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/workout", workout);

// Index Route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
