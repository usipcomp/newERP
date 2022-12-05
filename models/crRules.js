const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const crRules = new Schema({
    aprog:{
        type:String,
    },
    sem:{
        type:Number,
    },
    open:{
        type:Boolean,
    },
    maxCredits:{
        type:Number,
    },
    maxElectives:{
        type:Number,
    },
})
module.exports = mongoose.model('crRules',crRules);

