const Student = require('../models/student');
const Specialization = require('../models/specialization');
const academic_programme = require('../models/academic_programme');
const subjectSchema = require('../models/subjectScheme');
const Subject = require('../models/subject');

const jwt = require('jsonwebtoken');


module.exports.renderLoginForm = async (req,res) =>{
  res.render('admin/login');
   
}