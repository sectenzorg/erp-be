/*const mongoose = require("mongoose");
const AppflowsettingsSchema = new mongoose.Schema({
    menucode:{
        type:String,
        required: true,
        trim: true
    },
    menuname:{
        type:String,
        required: true,
        trim: true
    },
    appsettings: [
        {
            type 		: String,
            tableref  : String,
            conditions : [
                {
                    type : String,
                    condlist : [
                        {
                            condid : String,
                            field : String,
                            operator : String,
                            fieldvalue : String,
                        }
                    ]
                }
            ],
            lines : [
                {
                    lineid : String,
                    linepic : String,
                    linestatus : String,
                    lineaction : String,
                    actiontime : String,
                    linedesc : String,
                }
            ],
        }
    ]
});
AppflowsettingsSchema.index({ menucode: 'text',menuname: 'text'});
const Appflowsettings = mongoose.model("Appflowsettings",AppflowsettingsSchema);
module.exports=Appflowsettings;*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const conditionListSchema = new Schema({
    condid: Number,
    field: String,
    operator: String,
    fieldvalue: String,
});
const conditionSchema = new Schema({
    type: String,
    condlist: [conditionListSchema],
});
const lineSchema = new Schema({
    lineid: Number,
    linepic: String,
    linestatus: String,
    lineaction: String,
    actiontime: String,
    linedesc: String,
});
const appSettingSchema = new Schema({
    type: String,
    tableref: String,
    conditions: [conditionSchema],
    lines: [lineSchema],
});
const appFlowSchema = new Schema({
    menucode: String,
    menuname: String,
    appsettings: [appSettingSchema],
});
const Appflowsettings = mongoose.model('Appflowsettings', appFlowSchema);
module.exports=Appflowsettings;