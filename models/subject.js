const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const subjectSchema = new Schema({
   sub_id:{
    type:Number,
   },
   sub_code:{
    type:String,
   },
   sub_name:{
    type:String,
   },
   sub_year:{
    type:String,
   },
   scheme_year:{
    type:String,
   },
   minor:{
    type:String,
   },
   minorhindi:{
    type:String,
   }
})
module.exports = mongoose.model('Subject',subjectSchema);