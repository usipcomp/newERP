const Student = require('../models/student');
const Specialization = require('../models/specialization');
const academic_programme = require('../models/academic_programme');
const subjectSchema = require('../models/subjectScheme');
const Subject = require('../models/subject');

const jwt = require('jsonwebtoken');


module.exports.renderLoginForm = async (req,res) =>{
  res.render('admin/login');
   
}



module.exports.submitLoginForm = async (req,res) =>{
  const {roll_no,password}= req.body;
  //console.log(req.body);

 const student = await Student.findOne({roll_no:roll_no.toLowerCase()});
 //console.log(student);
 if(!student){
  req.flash('success','studentNOtFound');
  return res.redirect('/student/login');
 }
 
 if(password==student.password){
  //console.log("password matched");
  const token = jwt.sign(
    { _id: student._id },
    "thisisasecretkeyhelloonetwothreefour"
  );
  res.cookie("token", token);

  return res.redirect(`/student/home/${student._id}`);
 }
  else{
  return res.redirect(`/student/login`);
  }
}