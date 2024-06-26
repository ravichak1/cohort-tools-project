const router = require("express").Router();

const Student = require("./../models/Student.model");
const Cohort = require("./../models/Cohort.models");
router.get("/", (req, res) => {
  Student.find({})
    .populate("cohort")
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
  const eachStudent = await Student.findOne({ _id: id }).populate("cohort");
  res.json(eachStudent);
  try {
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    cohort,
    projects,
  } = req.body;

  const studentToCreate = {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    cohort,
    projects,
  };
  const createdStudent = await Student.create(studentToCreate);

  res.status(201).json(createdStudent);
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const cohortExists = await Cohort.findById(cohortId);
    if (!cohortExists) {
      return res.status(404).json({ error: "Cohort not found" });
    }

    const students = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    );
    res.json({ cohortId, students });
  } catch (error) {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      cohort,
      projects,
    } = req.body;

    const studentToUpdate = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      cohort,
      projects,
    };
    const updateStudent = await Student.findOneAndUpdate(
      { _id: id },
      studentToUpdate,
      { new: true }
    );
    res.status(202).json(updateStudent);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete({ _id: id });
    res.sendStatus(204);
    console.log("deleted");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
module.exports = router;
