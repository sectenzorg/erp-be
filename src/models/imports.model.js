const mongoose = require("mongoose");
const ImportsSchema = new mongoose.Schema({
    no: { type: Number },
    nama: { type: String },
    email: {type: String,unique:true},
    alamat: { type: String},
    noktp: { type: String},
    tanggallahir: { type: Date},
    tanggalbergabung: { type: Date},
    peran: { type: String},
    deskripsi: { type: String}
});
const Imports = mongoose.model("Imports",ImportsSchema);
module.exports=Imports;