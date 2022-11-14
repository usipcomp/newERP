const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subject1Schema = new Schema({
   codesub:{
    type:Number,
   },
   sub_imax_m:{
    type:Number,
   },
   sub_emax_m:{
    type:Number,
   },
   min_pass_m:{
    type:Number,
   },
   sub_credit:{ 
    type:Number,
   },
   th_pr:{
    type:String,
    enum:["TH","PR"],

   },
   num:{
    type:Number
   },
   sp_code:{
    type:"String"
   },
   aprog:{
    type:"String"
   },
   scheme_year:{
    type:"String"
   },
   sub_no:{
    type:Number,
   },
   assessment_plan:{
    type:"String"
   },
})


module.exports = mongoose.model('subjectSchema',subject1Schema);