const Companypolicies = require("../models/companypolicies.model");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const Employees = require("../models/employees.model");
const Mastermenus = require("../models/mastermenus.model");
const Useraccess = require("../models/useraccess.model");
const Issuelogs = require("../models/issuelogs.model");
dayjs.extend(utc);
dayjs.extend(timezone);
async function getAllPolicy(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var policy=await Companypolicies.find();
        msg = "OK";
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "view",
            apiname: "getallpolicy",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : policy
    }
    reply.send(resp);
}
async function getPolicyByDoc(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var docString = String(request.body.docid);
        var policy = await Companypolicies.aggregate([
            {$match: {
                    'docid': { $regex: docString, $options: 'i' }
                }
            }
        ]);
        if(policy!=''){
            var policies = policy;
            msg = "OK";
        }else{
            ack = 0;
            msg = "No Data Found";
            var policies = [];
        }
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "view",
            apiname: "getpolicybydoc",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : policies
    }
    reply.send(resp);
}
async function getPolicyByDepartment(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var docString = String(request.body.departmentname);
        var policy = await Companypolicies.aggregate([
            {$match: {
                    'departmentname': { $regex: docString, $options: 'i' }
                }
            }
        ]);
        if(policy!=''){
            var policies = policy;
            msg = "OK";
        }else{
            ack = 0;
            msg = "No Data Found";
            var policies = [];
        }
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "view",
            apiname: "getpolicybydepartment",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : policies
    }
    reply.send(resp);
}
async function getPolicyByCategory(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var docString = String(request.body.category);
        var policy = await Companypolicies.aggregate([
            {$match: {
                    'category': { $regex: docString, $options: 'i' }
                }
            }
        ]);
        if(policy!=''){
            var policies = policy;
            msg = "OK";
        }else{
            ack = 0;
            msg = "No Data Found";
            var policies = [];
        }
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "view",
            apiname: "getpolicybycategory",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : policies
    }
    reply.send(resp);
}
async function insertPolicy(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        const companypolicies = new Companypolicies(request.body.policydata);
        const result = companypolicies.save();
        if(result){
            msg = "OK";
        }else{
            msg = "Not OK";
        }
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "create",
            apiname: "insertpolicy",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg
    }
    reply.send(resp);
}
async function updatePolicy(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        let pid = request.body.policyid;
        const policydata = request.body.policydata;
        var msgDt = dayjs().tz("Asia/Jakarta").format();
        policydata.lastupdatetime=msgDt;
        const result=await Companypolicies.findByIdAndUpdate(
            pid, // Find the document by _id
            { $set: policydata },   // Update menudata fields
            { new: true }  );       // Return the updated document);
        msg = "OK";
    }catch(error){
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: "",
            username: "",
            useremail: "",
            action: "update",
            apiname: "updatepolicy",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        console.log(error);
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg
    }
    reply.send(resp);
}
module.exports = {
    getAllPolicy,
    getPolicyByDoc,
    getPolicyByDepartment,
    getPolicyByCategory,
    insertPolicy,
    updatePolicy
};