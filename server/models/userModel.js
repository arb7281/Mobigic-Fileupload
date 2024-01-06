const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    userFiles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "fileModel",
		},
	]
})

const userModel = mongoose.model("userModel", userSchema)
module.exports = userModel;