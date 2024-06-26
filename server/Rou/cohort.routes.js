const router = require("express").Router();

const Cohort = require("./../models/Cohort.models");

router.get("/", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const eachCohort = await Cohort.findOne({ _id: id });
  res.json(eachCohort);
  try {
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  const cohortToCreate = {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  };

  const createdCohort = await Cohort.create(cohortToCreate);

  res.status(201).json(createdCohort);
  try {
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    } = req.body;

    const cohortToUpdate = {
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    };

    const updatedcohort = await Cohort.findOneAndUpdate(
      { _id: id },
      cohortToUpdate,
      { new: true }
    );
    res.status(202).json(updatedcohort);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Cohort.findByIdAndDelete({ _id: id });
    res.sendStatus(204);
    console.log("deleted");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
module.exports = router;
