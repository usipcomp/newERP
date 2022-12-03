const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const catchAsync = require("../utils/catchAsync");
const { auth } = require("../middleware/auth");
const students = require("../controllers/student");
const admins = require("../controllers/admin");

router
  .route("/login")
  .get(catchAsync(admins.renderLoginForm))
  .post(catchAsync(admins.submitLoginForm));


router
  .route("/home/:id")
  .get(catchAsync(admins.renderHomePage))

router
  .route("/students")
  .get(catchAsync(admins.students))
  .post(catchAsync(admins.searchStudent))

router
  .route("/students/:id")
  .get(catchAsync(admins.showStudent))

router
  .route("/courseRegisteration")
  .get(catchAsync(admins.courseRegisteration));

  router
  .route("/createCR")
  .get(catchAsync(admins.createCR))
  .post(catchAsync(admins.postCR));

module.exports = router;
