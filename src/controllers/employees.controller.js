const Employees = require("../models/employees.model");
const Useraccess = require("../models/useraccess.model");
const Issuelogs = require("../models/issuelogs.model");
const Mastermenus = require("../models/mastermenus.model");
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
async function getjakartatime(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    try{
        var msg = dayjs().tz("Asia/Jakarta").format();
        reply.send(msg);
    }catch(error){
        reply.send(error);
    }
}


// async function getAllEmployee(request, reply){
//     try{
//         //initial value
//         var ack = 1;
//         var msg = "";
//         var statuscode = 200;
//         var resp = "";
//         var employees=await Employees.find();
//         msg = "OK";
//     }catch(error){
//         var currentDateTime = dayjs().tz("Asia/Jakarta").format();
//         var logData = {
//             logtime: currentDateTime,
//             menucode: "",
//             logcategory: "error",
//             apistatus: "failed",
//             sysmessage: error.message,
//             humanmessage: "An error occurred",
//             userid: request.body.userid,
//             username: request.body.username,
//             useremail: request.body.useremail,
//             action: "view",
//             apiname: "getallemployee",
//             docid: ""
//         };
//         const issuelog = new Issuelogs(logData);
//         issuelog.save();
//         statuscode = 500;
//         ack = 0;
//         msg = error.message;
//     }
//     resp = {
//         "statuscode"    : statuscode,
//         "ack"           : ack,
//         "message"       : msg,
//         "datares"       : employees
//     }
//     reply.send(resp);
// }

async function getAllEmployee(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var employees=await Employees.find();
        console.log(employees);
        console.log("entered this line");
        msg = "OK";
    }catch(error){
        console.log("entered error : ");
        console.log(error);
        // var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        // var logData = {
        //     logtime: currentDateTime,
        //     menucode: "",
        //     logcategory: "error",
        //     apistatus: "failed",
        //     sysmessage: error.message,
        //     humanmessage: "An error occurred",
        //     userid: request.body.userid,
        //     username: request.body.username,
        //     useremail: request.body.useremail,
        //     action: "view",
        //     apiname: "getallemployee",
        //     docid: ""
        // };
        // const issuelog = new Issuelogs(logData);
        // issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : employees
    }
    reply.send(resp);
}


async function getAllEmployeeByCode(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var searchTerm = request.body.searchdata;
        var charCount = searchTerm.length;
        if(charCount === 0){
            ack = 0;
            msg = "Invalid parameters";
            var employees = [];
        }else{
            let trimmedSearchCode = searchTerm.trim();
            var employees = await Employees.aggregate([
                {$match: {
                        'companycode': { $regex: trimmedSearchCode, $options: 'i' }
                    }
                }
            ]);
            if(employees!=''){
                var employees = employees;
                msg = "OK";
            }else{
                ack = 0;
                msg = "No Data Found";
                var employees = [];
            }
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
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "view",
            apiname: "getallemployeebycode",
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
        "datares"       : employees
    }
    reply.send(resp);
}
async function getAllEmployeeByDept(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var searchTerm = request.body.searchdata;
        var charCount = searchTerm.length;
        if(charCount === 0){
            ack = 0;
            msg = "Invalid parameters";
            var employees = [];
        }else{
            let trimmedSearchCode = searchTerm.trim();
            var employees = await Employees.aggregate([
                {$match: {
                        'deptname': { $regex: trimmedSearchCode, $options: 'i' }
                    }
                }
            ]);
            if(employees!=''){
                var employees = employees;
                msg = "OK";
            }else{
                ack = 0;
                msg = "No Data Found";
                var employees = [];
            }
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
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "view",
            apiname: "getallemployeebydept",
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
        "datares"       : employees
    }
    reply.send(resp);
}
async function getAllEmployeeByName(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var searchTerm = request.body.searchdata;
        var charCount = searchTerm.length;
        if(charCount === 0){
            ack = 0;
            msg = "Invalid parameters";
            var employees = [];
        }else{
            let trimmedSearchCode = searchTerm.trim();
            var employees = await Employees.aggregate([
                {$match: {
                        'empname': { $regex: trimmedSearchCode, $options: 'i' }
                    }
                }
            ]);
            if(employees!=''){
                var employees = employees;
                msg = "OK";
            }else{
                ack = 0;
                msg = "No Data Found";
                var employees = [];
            }
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
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "view",
            apiname: "getallemployeebyname",
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
        "datares"       : employees
    }
    reply.send(resp);
}
async function getEmployeeById(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var eid = request.body.empid;
        var charCount = eid.length;
        if(charCount === 0){
            ack = 0;
            msg = "Invalid parameters";
            var employees = [];
        }else{
            var employees=await Employees.findById(eid);
            msg = "OK";
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
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "view",
            apiname: "getemployeebyid",
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
        "datares"       : employees
    }
    reply.send(resp);
}
async function addEmployee(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    var currentDateTime = dayjs().tz("Asia/Jakarta").format();
    try{
        const employees = new Employees(request.body.empdata);
        const useraccess = new Useraccess(request.body.accessdata);
        // Use Promise.all to handle multiple Promises concurrently
        const [result, resultaccess] = await Promise.all([
            employees.save(),
            useraccess.save()
        ]);
        if (!result || !resultaccess) {
            msg = "Not OK";
        }else{
            msg = "OK";
        }
    }catch(error){
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "create",
            apiname: "addemployee",
            docid: ""
        };
        const issuelog = new Issuelogs(logData);
        issuelog.save();
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    console.log("after - emp save");
    console.log("after - useraccess save");
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg
    }
    reply.send(resp);
}
async function editemployee(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        let empid = request.body.userid;
        /*let useraccessid = request.body.useraccessid;*/
        let type = request.body.usertype;
        let empdt=request.body.empdata;
        if(type==='1'){
            const result=await Employees.findByIdAndUpdate(
                empid, // Find the document by _id
                { $set: empdt },   // Update menudata fields
                { new: true }  );       // Return the updated document);
            /*const resultaccess=await Useraccess.findByIdAndUpdate(
                useraccessid, // Find the document by _id
                { $set: request.body.accessdata },   // Update menudata fields
                { new: true }  );       // Return the updated document);*/
            msg = "OK";
        }else{
            const updateFields ={
                "domaddress":empdt.domaddress
            };
            updateFields["contactno"] = request.body.empdata.contactno;
            updateFields["personalemail"] = empdt.personalemail;
            updateFields["bloodtype"] = empdt.bloodtype;
            updateFields["emergencycontact"] = request.body.empdata.emergencycontact;
            const resultEmp = await Employees.updateOne(
                { _id: empid },
                { $set: updateFields }
            );
            if (resultEmp.modifiedCount > 0) {
                msg = "OK";
            } else {
                msg = "Employee not found";
            }
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
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "update",
            apiname: "editemployee",
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
async function passencrypt(request, reply) {
    const saltRounds = 10;
    var password = request.body.pass;
    var encryptedpass=await bcrypt.hash(password, saltRounds);
    resp = {
        "statuscode"    : 200,
        "ack"           : 'OK',
        "message"       : encryptedpass
    }
    reply.send(resp);
}
async function passwordverify(request, reply) {
    var password = request.body.pass;
    var hash = request.body.hash;
    var result = await bcrypt.compare(password, hash);
    resp = {
        "statuscode"    : 200,
        "ack"           : 'OK',
        "message"       : result
    }
    reply.send(resp);
}
async function updatePassword(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try {
        const saltRounds = 10;
        let empid = request.body.empid;
        var rawpassword = request.body.pass;
        var encryptedpass=await bcrypt.hash(rawpassword, saltRounds);
        const updatedEmployee = await Employees.findOneAndUpdate(
            { empid: empid },  // Query to find the employee by empid
            { password: encryptedpass },  // Update the password field
            { new: true }  // Return the updated document
        );
        if (updatedEmployee) {
            msg = "Password updated successfully";
        } else {
            msg = "Employee not found";
        }
    } catch (error) {
        var currentDateTime = dayjs().tz("Asia/Jakarta").format();
        var logData = {
            logtime: currentDateTime,
            menucode: "",
            logcategory: "error",
            apistatus: "failed",
            sysmessage: error.message,
            humanmessage: "An error occurred",
            userid: request.body.userid,
            username: request.body.username,
            useremail: request.body.useremail,
            action: "update",
            apiname: "updatepassword",
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
        "datares"       : []
    }
    reply.send(resp);
}
async function getAllEmployeeByJoinDate(request, reply){
    const startDate = request.body.sdate;
    const endDate = request.body.edate;
    if (!startDate || !endDate) {
        statuscode = 400;
        ack = 0;
        msg = 'Start Date and End Date are required';
    }else{
        try {
            const employee = await Employees.find({
                joindate: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            });
            reply.send(employee);
        } catch (error) {
            var currentDateTime = dayjs().tz("Asia/Jakarta").format();
            var logData = {
                logtime: currentDateTime,
                menucode: "",
                logcategory: "error",
                apistatus: "failed",
                sysmessage: error.message,
                humanmessage: "An error occurred",
                userid: request.body.userid,
                username: request.body.username,
                useremail: request.body.useremail,
                action: "view",
                apiname: "getemployeebyjoindate",
                docid: ""
            };
            const issuelog = new Issuelogs(logData);
            issuelog.save();
            statuscode = 500;
            ack = 0;
            msg = error.message;
        }
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : employee
    }
    reply.send(resp);
}
module.exports = {
    getjakartatime,
    getAllEmployee,
    getAllEmployeeByCode,
    getAllEmployeeByDept,
    getAllEmployeeByName,
    getEmployeeById,
    addEmployee,
    editemployee,
    passencrypt,
    passwordverify,
    updatePassword,
    getAllEmployeeByJoinDate
};