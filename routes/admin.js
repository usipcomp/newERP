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



module.exports = router;
