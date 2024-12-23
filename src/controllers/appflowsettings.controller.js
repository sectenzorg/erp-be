const Appflowsettings = require("../models/appflowsettings.model");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
async function getAllAppFlow(request, reply){
    try{
        //initial value
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var appflows=await Appflowsettings.find();
        msg = "OK";
    }catch(error){
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : appflows
    }
    reply.send(resp);
}
async function getAppFlowByMenucode(request, reply){
    try{
        var ack = 1;
        var msg = "";
        var statuscode = 200;
        var resp = "";
        var searchCode = request.body.menucode;
        var charCountCode = searchCode.length;
        if(charCountCode === 0){
            ack = 0;
            msg = "Invalid parameters";
            var menuitems = [];
        }else{
            var menuitems = await Appflowsettings.aggregate([
                {$match: {
                        'menucode': { $regex: searchCode, $options: 'i' }
                    }
                }
            ]);
            if(menuitems!=''){
                var menuitems = menuitems;
                msg = "OK";
            }else{
                ack = 0;
                msg = "No Data Found";
                var menuitems = [];
            }
        }
    }catch(error){
        console.log(error);
        statuscode = 500;
        ack = 0;
        msg = error.message;
    }
    resp = {
        "statuscode"    : statuscode,
        "ack"           : ack,
        "message"       : msg,
        "datares"       : menuitems
    }
    reply.send(resp);
}
async function insertAppFlow(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        const appflow = new Appflowsettings(request.body.appflowdata);
        const result = appflow.save();
        if(result){
            msg = "OK";
        }else{
            msg = "Not OK";
        }
    }catch(error){
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
async function updateAppFlow(request, reply){
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        let appid = request.body.appflowid;
        let appdt=request.body.appflowdata;
        const result=await Appflowsettings.findByIdAndUpdate(
            appid, // Find the document by _id
            { $set: appdt },   // Update fields
            { new: true }  );  // Return the updated document);
        msg = "OK";
    }catch(error){
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
async function checkUser(request, reply){
    try {
        await request.jwtVerify();
        // You can check if it's a guest token
        if (request.user.role === 'guest') {
            resp = {
                "ack"           : 1,
                "message"       : 'OK'
            }
        }else{
            resp = {
                "ack"           : 0,
                "message"       : 'Invalid Token'
            }
        }
    } catch (err) {
        resp = {
            "ack"           : 0,
            "message"       : err.message
        }
    }
    reply.send(resp);
}
module.exports = {
    getAllAppFlow,
    getAppFlowByMenucode,
    insertAppFlow,
    updateAppFlow,
    checkUser
};
