const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fileName:{
        type:String
    },
    fileUrl:{
        type:String
    },
    code:{
        type:String,
        required:true
    }
})

const fileModel = mongoose.model("fileModel", fileSchema);
module.exports = fileModel;