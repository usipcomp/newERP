const Student = require('../models/student');
const Specialization = require('../models/specialization');
const academic_programme = require('../models/academic_programme');
const subjectSchema = require('../models/subjectScheme');
const Subject = require('../models/subject');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const crRules = require('../models/crRules');
const StudentState=require('../models/studentState');
module.exports.renderLoginForm = async (req,res) =>{
  res.render('admin/login');
   
}



module.exports.submitLoginForm = async (req,res) =>{
  const {empID,password}= req.body;
  //console.log(req.body);

 const admin = await Admin.findOne({adminID:empID.toLowerCase()});
 //console.log(student);
 if(!admin){
  req.flash('success','NOT FOUND');
  return res.redirect('/admin/login');
 }
 
 if(password==admin.password){
  //console.log("password matched");
  const token = jwt.sign(
    {id:admin._id },
    "thisisasecretkeyhelloonetwothreefour"
  );
  res.cookie("token", token);

  return res.redirect(`/admin/home/${admin._id}`);
 }
  else{
  return res.redirect(`/admin/login`);
  }
}

module.exports.renderHomePage = async (req,res) =>{
  const {id}=req.params;
  const admin = await Admin.findOne({id:id});
  console.log(admin);
  res.render('admin/home',{admin});

}

module.exports.students = async (req,res) =>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

  const admin = await Admin.findOne({id:response.id});
  //console.log(admin);
  const student=null;
  res.render('admin/students',{admin,student});
}


module.exports.searchStudent = async (req,res) =>{
  const {roll_no} = req.body;
  //console.log(roll_no);
  const foundStudent = await Student.findOne({roll_no:roll_no});
  console.log(foundStudent);

  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

  const admin = await Admin.findOne({id:response.id});
  if(foundStudent){
    res.redirect(`students/${foundStudent._id}`);
  }
  else
  res.redirect("/admin/students");
}



module.exports.showStudent = async (req,res) =>{
  const {id} = req.params;
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");
  const admin = await Admin.findById(response.id);
  console.log(response);
  console.log(admin);
  const student= await Student.findById(id);
  const studentState = await StudentState.findOne({roll_no:student.roll_no});
  //console.log(studentState);
  res.render('admin/students',{admin,student,studentState});
}

module.exports.courseRegisteration = async (req,res) =>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

  const admin = await Admin.findOne({id:response.id});
  const cr = await crRules.find({});
  res.render('admin/courseRegisteration',{admin,cr});
}

module.exports.createCR = async (req,res)=>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

   const admin = await Admin.findOne({id:response.id});
  const aprogs =await academic_programme.find({});
  const sem = [1,2,3,4,5,6,7,8,9,10];
  res.render('admin/createCR',{aprogs,admin,sem});


}
module.exports.postCR = async (req,res)=>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

console.log(req.body);
const cr = new crRules(req.body.cr);
await cr.save();
res.redirect('/admin/courseRegisteration');
}

module.exports.deleteCR = async (req,res)=>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");


const {id}=req.params;

const cr = await crRules.deleteOne({id:id});
res.redirect('/admin/courseRegisteration');

}

module.exports.updateCR = async (req,res)=>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

const {id}=req.params;
const admin = await Admin.findOne({id:response.id});

const cr = await crRules.findById(id);

res.render('admin/updateCR',{admin,cr});

}


module.exports.updatingCR = async (req,res)=>{
  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");

const {id}=req.params;
const admin = await Admin.findOne({id:response.id});
const {cr}=req.body;
console.log(req.body.cr);
const c = await crRules.findByIdAndUpdate(id,cr);

res.redirect(`/admin/cr/${c._id}`)

}


module.exports.showSubjects = async(req,res) =>{

  const cookies = await req.cookies;
  if(!cookies.token){
    return res.redirect('/login/admin');
}
const response = await jwt.verify(cookies.token,"thisisasecretkeyhelloonetwothreefour");
const admin = await Admin.findOne({id:response.id});

const subjects = await Subject.find({});
const subjectSchemas = await subjectSchema.find({});

res.render('admin/showSubjects',{admin,subjects,subjectSchemas});




}