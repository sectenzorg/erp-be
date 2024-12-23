const mongoose = require("mongoose");
const EmployeesSchema = new mongoose.Schema({
    // _id:{
    //     type:Object,
    //     required:true
    // },
    empid:{
        type:String,
        required: true,
        trim: true
    },
    companycode:{
        type:String,
        required: true,
        trim: true
    },
    companyname:{
        type:String,
        required: true,
        trim: true
    },
    empname:{
        type:String,
        required: true,
        trim: true
    },
    alias:{
        type:String
    },
    empstatus:{
        type:String
    },
    birthplace:{
        type:String
    },
    birthdate:{
        type:String
    },
    idno:{
        type:String
    },
    domaddress:{
        type:String
    },
    joindate:{
        type:String,
        required: true,
        trim: true
    },
    probationenddate:{
        type:String
    },
    exitdate:{
        type:String
    },
    contactno:[{}],
    officeemail:{
        type:String,
        trim: true,
        unique: true,
        lowercase: true
    },
    personalemail:{
        type:String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    deptname:{
        type:String,
        required: true,
        trim: true
    },
    designationname:{
        type:String,
        required: true,
        trim: true
    },
    emplevelcode:{
        type:String,
        required: true,
        trim: true
    },
    emplevelname:{
        type:String,
        required: true,
        trim: true
    },
    bloodtype:{
        type:String
    },
    emergencycontact: [
        {
            emgname: String,
            emgrelation: String,
            emgcontactno: String
        }
    ]
});

EmployeesSchema.index({ companycode: 'text',deptname: 'text'});
const Employees = mongoose.model("Employees",EmployeesSchema);

module.exports=Employees;