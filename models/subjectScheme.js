const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subject1Schema = new Schema({
      sub_id:{
      type:Number,
     },
     sub_code:{
      type:String,
     },
     sub_name:{
      type:String,
     },
     minor:{
      type:String,
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
     asses_plan:{
      type:String
     },
     slot:{
      type:String,
     },
     slot_count:{
      type:Number
     },
     course_type:{
      type:String,
     },
     course_group:{
      type:String,
     },
     group_count:{
      type:String,
     },
     tutorials:{
      type:Number,
     },
     lectures:{
      type:Number,
     },
     practicals:{
      type:Number,
     },
     course_coordinator_name:{
      type:String,
     }
  
})


module.exports = mongoose.model('subjectSchema',subject1Schema);

