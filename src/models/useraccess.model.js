const mongoose = require("mongoose");
const UserAccessSchema = new mongoose.Schema({
    empid:{
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
        type:String,
        required: true,
        trim: true
    },
    officeemail:{
        type:String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    isactive:{
        type:String,
        required: true,
        trim: true
    },
    usermenuaccess :[
        {
            menugroupid: String,
            menugroupcode: String,
            menugroupname: String,
            menulist:[
                {
                    menuid: String,
                    menucode: String,
                    menuname: String,
                    apiendpoint: String,
                    isactive: String,
                    menutooltiptext: String,
                    rolegranted: String,
                    granteddate : Date,
                    grantedby	: String,
                    grantname	: String,
                    submenulist:[
                        {
                            submenuid	: String,
                            submenucode	: String,
                            submenuname	: String,
                            apiendpoint	: String,
                            submenutooltiptext	: String
                        }
                    ]
                }
            ]
        }
    ]
});
const Useraccess = mongoose.model("Useraccess",UserAccessSchema);
module.exports=Useraccess;