const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const catchAsync = require("../utils/catchAsync");
const { auth } = require("../middleware/auth");
const students = require("../controllers/student");

router
  .route("/register")
  .get(catchAsync(students.renderRegister))
  .post(catchAsync(students.submitRegister));

router
  .route("/login")
  .get(catchAsync(students.renderLoginForm))
  .post(catchAsync(students.submitLoginForm));

router.route('/courseRegister/:id/:cid')
  .post(auth,catchAsync(students.courseRegister));

router.route("/courseRegisteration/:id")
.get(auth,catchAsync(students.renderCourseRegisteration));

router.route('/home/:id').get(auth ,catchAsync(students.studentHomePage));

router
  .route('/edit/:id')
  .get(auth , catchAsync(students.renderEditForm))
  .post(auth ,catchAsync(students.submitEditForm));


router
  .route('/acknowledgement/:id')
  .get(auth,catchAsync(students.acknowledgementSlip));

  
module.exports = router;
