//object modelling for node.js
//giver dig mulighed for at definere datastrukturer og modeller og bruge dem til at interagere med databasen
// kan interagere med mongoDB via mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Workout = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  sets: {
    type: String
  },
  reps: {
    type: String
  }
});

module.exports = mongoose.model("work", Workout);
