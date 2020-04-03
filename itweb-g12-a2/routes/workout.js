const express = require("express");
const Workout = require("../models/workout");
const router = express.Router();

router.route("/add").post((req, res) => {
  let workout = new Workout(req.body);
  workout
    .save()
    .then(workout => {
      res.status(200).json({ workout: "Added successfully" });
    })
    .catch(err => {
      res.status(400).send("Failed to create new record");
    });
});

router.route("/").get((req, res) => {
  Workout.find((err, workout) => {
    if (err) console.log(err);
    else res.json(workout);
  });
});

router.route("/:id").get((req, res) => {
  Workout.findById(req.params.id, (err, workout) => {
    if (err) console.log(err);
    else res.json(workout);
  });
});

router.route("/update/:id").post((req, res) => {
  Workout.findById(req.params.id, (err, workout) => {
    if (!workout) {
      return next(new Error("Could not load Document"));
    } else {
      workout.title = req.body.title;
      workout.description = req.body.description;
      workout.sets = req.body.sets;
      workout.reps = req.body.reps;

      workout
        .save()
        .then(workout => {
          res.json("Update done");
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    }
  });
});

router.route("/delete/:id").get((req, res) => {
  Workout.findByIdAndRemove({ _id: req.params.id }, (err, workout) => {
    if (err) res.json(err);
    else res.json("Removed successfully");
  });
});

module.exports = router;
