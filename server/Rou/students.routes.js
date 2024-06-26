const router = require("express").Router();

const Student = require("./../models/Student.model");

router.get("/", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const eachStudent = await Student.findOne({ _id: id });
  res.json(eachStudent);
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
