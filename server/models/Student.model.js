const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  emai: String,
  phone: String,
  linkedinUrl: String,
  languages: Array,
  program: String,
  background: String,
  image: String,
  cohort: ObjectId,
  projects: Array,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
