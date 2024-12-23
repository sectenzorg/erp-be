const Useraccess = require("../models/useraccess.model");
const Employees = require("../models/employees.model");
const Issuelogs = require("../models/issuelogs.model");
const bcrypt = require("bcryptjs");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
exports.login = async (fastify, request, reply) => {
    var ack = 1;
    var msg = "";
    var statuscode = 200;
    var resp = "";
    try {
        let uid = request.body.userid;
        var password = request.body.pass;
        var flg = request.body.isemail;
        // Find user by either empid or officeemail
        const user = await Useraccess.findOne({
            $or: [{empid: uid}, {officeemail: uid}]
        });
        // Check if user exists and is active
        if (!user || !user.isactive) {
            statuscode = 500;
            ack = 0;
            msg = 'User not found or inactive';
        } else {
            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                statuscode = 401;
                ack = 0;
                msg = 'Invalid Password';
            } else {
                const emp = await Employees.findOne({
                    $or: [{empid: uid}, {officeemail: uid}]
                });
                // Generate JWT token
                const token = fastify.jwt.sign({userId: user._id}, {expiresIn: '5m'});
                if (!emp) {
                    var response = {user_access: user, accesstoken: token, emp_data: []};
                } else {
                    var response = {user_access: user, accesstoken: token, emp_data: emp};
                }
                msg = 'Login Successful';
            }
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
            username: "",
            useremail: request.body.userid,
            action: "login",
            apiname: "login",
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
        "datares"       : response
    }
    reply.send(resp);
};