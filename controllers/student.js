const Student = require('../models/student');
const Specialization = require('../models/specialization');
const academic_programme = require('../models/academic_programme');
const subjectSchema = require('../models/subjectScheme');
const Subject = require('../models/subject');

const jwt = require('jsonwebtoken');

module.exports.renderRegister = async (req,res) =>{
    const specializations = await Specialization.find({});
    const aprogs = await academic_programme.find({})
    res.render("student/register",{specializations,aprogs});
}


module.exports.submitRegister = async (req,res) =>{
  console.log(req.body);
    const student = new Student(req.body.student);
    student.roll_no = req.body.student.roll_no.toLowerCase();
    await student.save();
      const id = student._id;
      const token = jwt.sign(
         { _id: id },
         "thisisasecretkeyhelloonetwothreefour"
       );
       res.cookie("token", token);
    res.redirect(`/student/home/${id}`);
}

module.exports.renderLoginForm = async (req,res) =>{
  res.render('student/login');
   
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

module.exports.studentHomePage = async (req,res) =>{
    const {id} = req.params;
    const student = await Student.findById(id);
    console.log(student);
    const specialization = await Specialization.findOne({sp_code:student.sp_code});
    console.log(specialization);
    res.render('student/studentHome',{student,specialization});
     
  }

  module.exports.renderEditForm = async (req,res) =>{
   // const branches = await Branch.find({});
    const {id}=req.params;
    const student = await Student.findById(id);

    const specializations = await Specialization.find({});
    const aprogs = await academic_programme.find({})
  
    res.render('student/edit',{student,specializations,aprogs});
     
  }



  module.exports.submitEditForm = async (req,res) =>{
    const { id } = req.params;
    // console.log(req.body);
     const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
     await student.save();
   
     res.redirect(`/student/home/${id}`);
     
  }

  module.exports.renderCourseRegisteration = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id);
    console.log(student);
    const availSubjects = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code});
    let availSubjectsCode = availSubjects.map(sub=>sub.sub_no);
    const subjects = await Subject.find({});
    //console.log(availSubjectsCode);
    let finalSubjects = await Subject.find({subject_id:{$in:availSubjectsCode}});
    //console.log(availSubjects);

    res.render('student/courseRegisteration',{student,finalSubjects,availSubjects});

  }

  module.exports.mkbhd = async (req,res) =>{
    const {id}=req.params;
    res.send(id);
     
  }


  module.exports.courseRegister = async(req,res) =>{
    
    const {id,cid}=req.params;
    //console.log(id);
   // console.log(cid);
    const student = await Student.findById(id);
    const subject =await  Subject.findById(cid);
    //console.log(subject);
    if(student.currentSubjects.includes(cid))
    {
    student.currentSubjects.pull(subject);
  }
  else{
    student.currentSubjects.push(subject);

  }
    await student.save();
    //await Student.findByIdAndUpdate(id,{$push: {"currentSub": {subject}}})
    console.log(student.currentSubjects);
    res.redirect(`/student/courseRegisteration/${id}`);

  }