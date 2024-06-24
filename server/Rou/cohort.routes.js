const router = require("express").Router();

const cohortJSON = require("../cohorts.json");

router.get("/", (req, res, next) => {
  res.json(cohortJSON);
});

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  const findId = cohortJSON.find((each) => each._id === Number(id));
  res.json(findId);
});

module.exports = router;
