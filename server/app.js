require("dotenv").config();
require("./config/dbConnect.js");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express

const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/api/cohorts", require("./Rou/cohort.routes.js"));

app.use("/api/students", require("./Rou/students.routes.js"));

// Import the custom error handling middleware:
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// START SERVER

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
