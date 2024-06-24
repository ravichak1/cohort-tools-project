const router = require("express").Router();

const cohortJSON = require("../cohorts.json");

router.get("/", (req, res, next) => {
  res.json(cohortJSON);
});

module.exports = router;
