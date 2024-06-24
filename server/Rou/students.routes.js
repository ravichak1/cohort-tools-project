const router = require("express").Router();

const studentsJSON = require("../students.json");

router.get("/", (req, res, next) => {
  res.json(studentsJSON);
});

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  const findId = studentsJSON.find((each) => each._id === Number(id));
  res.json(findId);
});

module.exports = router;
