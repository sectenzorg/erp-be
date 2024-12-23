const mongoose = require("mongoose");
const IssueLogsSchema = new mongoose.Schema({
    logtime:{
        type:Date,
        required: true,
        trim: true
    },
    menucode:{
        type:String,
        required: true,
        trim: true
    },
    logcategory:{
        type:String,
        required: true,
        trim: true
    },
    apistatus:{
        type:String,
        required: true,
        trim: true
    },
    sysmessage:{
        type:String,
        required: true,
        trim: true
    },
    humanmessage:{
        type:String,
        required: true,
        trim: true
    },
    userid:{
        type:String,
        required: true,
        trim: true
    },
    username:{
        type:String,
        required: true,
        trim: true
    },
    useremail:{
        type:String,
        required: true,
        trim: true
    },
    action:{
        type:String,
        required: true,
        trim: true
    },
    docid:{
        type:String,
        required: true,
        trim: true
    }
});
const Issuelogs = mongoose.model("Issuelogs",IssueLogsSchema);
module.exports=Issuelogs;