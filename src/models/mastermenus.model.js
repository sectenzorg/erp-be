const mongoose = require("mongoose");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
const submenuSchema = new mongoose.Schema({
    submenuid: String,
    submenuname: String,
    apiendpoint: String,
    isactive: String,
    createdate: Date,
    createdby: String,
    creatorname: String,
    lastupdatetime: Date,
    lastupdateby: String,
    lastupdatename: String
});

const menuSchema = new mongoose.Schema({
    menuid: String,
    menucode: String,
    menuname: String,
    apiendpoint: String,
    isactive: String,
    picusername: String,
    picname: String,
    picemail: String,
    createdate: Date,
    createdby: String,
    creatorname: String,
    lastupdatetime: Date,
    lastupdateby: String,
    lastupdatename: String,
    d_submenu: [submenuSchema]
});

const menuGroupSchema = new mongoose.Schema({
    menugroupid: String,
    menugroupcode: String,
    menugroupname: String,
    createdate: Date,
    createdby: String,
    creatorname: String,
    creatoremail: String,
    lastupdatetime: Date,
    lastupdateby: String,
    lastupdatename: String,
    m_menu: [menuSchema]
});

/*const MenuGroup = mongoose.model('MenuGroup', menuGroupSchema);
const MastermenusSchema = new mongoose.Schema({
    menugroupid:{
        type:String,
        required: true,
        trim: true
    },
    menugroupcode:{
        type:String,
        required: true,
        trim: true
    },
    menugroupname:{
        type:String,
        required: true,
        trim: true
    },
    createdate:{
        type:Date
    },
    createdby:{
        type:String,
        required: true,
        trim: true
    },
    creatorname:{
        type:String,
        required: true,
        trim: true
    },
    creatoremail:{
        type:String,
        required: true,
        trim: true
    },
    lastupdatetime:{
        type:Date
    },
    lastupdateby:{
        type:String,
        required: true,
        trim: true
    },
    lastupdatename:{
        type:String,
        required: true,
        trim: true
    },
    m_menu: [
        {
            menuid: String,
            menucode: String,
            menuname: String,
            apiendpoint: String,
            isactive: String,
            picusername: String,
            picname: String,
            picemail: String,
            createdate: Date,
            createdby: String,
            creatorname: String,
            lastupdatetime: Date,
            lastupdateby: String,
            lastupdatename: String,
            d_submenu:[{
                submenuid: String,
                submenuname: String,
                apiendpoint: String,
                isactive: String,
                createdate: Date,
                createdby: String,
                creatorname: String,
                lastupdatetime: Date,
                lastupdateby: String,
                lastupdatename: String,
            }],
        }
    ]
});*/
// Pre-save middleware to adjust timestamps to Asia/Jakarta
menuGroupSchema.pre('save', function (next) {
    const currentDate = dayjs().tz("Asia/Jakarta").format();
    this.createdate = currentDate;
    this.lastupdatetime = currentDate;
    next();
});
menuGroupSchema.index({ menugroupcode: 'text',menugroupname: 'text',menugroupid: 'text'});
const Mastermenus = mongoose.model("Mastermenus",menuGroupSchema);
module.exports=Mastermenus;