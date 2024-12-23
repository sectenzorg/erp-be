const Useraccess = require("../models/useraccess.model");
async function getAllUserAccess(request, reply){
    //initial value
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try{
        var useraccess=await Useraccess.find();
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
        "datares"       : useraccess
    }
    reply.send(resp);
}
module.exports = {getAllUserAccess};