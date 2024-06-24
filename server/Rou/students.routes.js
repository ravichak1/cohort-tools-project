const router = require("express").Router();

const studentsJSON = require("../students.json");

router.get("/", (req, res, next) => {
  res.json(studentsJSON);
});

module.exports = router;
