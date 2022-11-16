const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Subject = require('./subject');
const passedSubjectsSchema = new Schema({
    subject:
        {
            type:Schema.Types.ObjectId,
            ref:'Subject'
         }
    ,
    grade:{
        type:'String'
    }
})
const studentStateSchema = new Schema({
    roll_no:{
        type:String,
    },
    stu_id:{
        type :Number,
    },
   
    currentSubjects:[
        {
           type:Schema.Types.ObjectId,
            ref:'Subject'
        }
    ],
    passedSubjects:[passedSubjectsSchema], 
    backSubjects:[
            {
                type:Schema.Types.ObjectId,
                ref:'Subject'
            }
    ],
    securedCredits:{
        type:Number,
    },
    currentSem:{
        type:Number,
    },
    currentCredits:{
        type:Number,
    },  
    







})
module.exports = mongoose.model('studentState',studentStateSchema);