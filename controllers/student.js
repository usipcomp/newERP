const Student = require('../models/student');
const Specialization = require('../models/specialization');
const academic_programme = require('../models/academic_programme');
const subjectSchema = require('../models/subjectScheme');
const Subject = require('../models/subject');
const StudentState = require('../models/studentState');

const jwt = require('jsonwebtoken');
const studentState = require('../models/studentState');
//const subjectScheme = require('../models/subjectScheme');
//const studentState = require('../models/studentState');

module.exports.renderRegister = async (req,res) =>{
    const specializations = await Specialization.find({});
    const aprogs = await academic_programme.find({})
    res.render("student/register",{specializations,aprogs});
}


module.exports.submitRegister = async (req,res) =>{
  console.log(req.body);
    const student = new Student(req.body.student);
    student.roll_no = req.body.student.roll_no.toLowerCase();
    const studentState=new StudentState({roll_no:student.roll_no,stu_id:student.stu_id,currentSem:1,securedCredits:0,currentCredits:0});
    await studentState.save();
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
    const student = await Student.findById(id).populate('currentSubjects');
   // console.log(student);
    const specialization = await Specialization.findOne({sp_code:student.sp_code});
   // console.log(specialization);
    const currentSubjects=student.currentSubjects;
    res.render('student/studentHome',{student,specialization,currentSubjects});
     
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
    const student = await Student.findById(id);
    if(student.password==(req.body.student.password)){

      const studentNew = await Student.findByIdAndUpdate(id, { ...req.body.student });
      await studentNew.save();
      req.flash('success','Information Updated Successfully !')
      res.redirect(`/student/home/${id}`);
    }
    else{
      req.flash('error','Invalid Password !');
      res.redirect(`/student/edit/${id}`);
    }
  }

  module.exports.renderCourseRegisteration = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id);
    const studentState = await StudentState.findOne({stu_id:student.stu_id});
    //console.log(studentState);
    //console.log(student);/
    const availSubjects = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,course_type:"compulsory"});
    let availSubjectsCode = availSubjects.map(sub=>sub.sub_id);
    //const subjects = await Subject.find({});
    //console.log(availSubjectsCode);
    let finalSubjects = await Subject.find({sub_id:{$in:availSubjectsCode}});
    //console.log(availSubjects);

    const availElectives = await subjectSchema.find({aprog:student.aprog,sp_code:student.sp_code,course_type:"elective"});
    let availElectivesCode = availElectives.map(sub=>sub.sub_id);
    let finalElectives = await Subject.find({sub_id:{$in:availElectivesCode}});



    res.render('student/courseRegisteration',{student,finalSubjects,availSubjects,studentState,availElectives,finalElectives});

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
    const subSchema = await subjectSchema.findOne({codesub:subject.subject_id});
    //console.log(subSchema);
    const studentState = await StudentState.findOne({stu_id:student.stu_id});
  
    if(student.currentSubjects.includes(cid))
    {
    student.currentSubjects.pull(subject);
    studentState.currentSubjects.pull(subject);
    studentState.currentCredits=studentState.currentCredits-subSchema.sub_credit;
  }
  else{
    student.currentSubjects.push(subject);
    studentState.currentSubjects.push(subject);
    studentState.currentCredits=studentState.currentCredits+subSchema.sub_credit;


  }
  console.log(studentState);
    await studentState.save();
    await student.save();
    //await Student.findByIdAndUpdate(id,{$push: {"currentSub": {subject}}})
   // console.log(student.currentSubjects);
    res.redirect(`/student/courseRegisteration/${id}`);

  }