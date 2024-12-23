const mongoose = require("mongoose");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
const CompanypoliciesSchema = new mongoose.Schema({
    docid:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true,
        trim: true
    },
    file_name:{
        type:String,
        required: true,
        trim: true
    },
    file_type:{
        type:String
    },
    createdate:{
        type:Date
    },
    createby:{
        type:String
    },
    creatorname:{
        type:String
    },
    creatoremail:{
        type:String
    },
    lastupdatetime:{
        type:Date
    },
    lastupdateby:{
        type:String
    },
    lastupdatename:{
        type:String
    },
    lastupdateemail:{
        type:String
    },
    status:{
        type:String
    },
    file_url: {
        type: String
    },
    departmentname:{
        type: String
    },
    category:{
        type: String
    }
});
// Pre-save middleware to adjust timestamps to Asia/Jakarta
CompanypoliciesSchema.pre('save', function (next) {
    const currentDate = dayjs().tz("Asia/Jakarta").format();
    this.createdate = currentDate;
    this.lastupdatetime = currentDate;
    next();
});
CompanypoliciesSchema.index({ docid: 'text',status: 'text',departmentname: 'text',category: 'text'});
const Companypolicies = mongoose.model("Companypolicies",CompanypoliciesSchema);
module.exports=Companypolicies;