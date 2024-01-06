const userModel = require("../models/userModel");

const bcrypt = require("bcrypt")

require("dotenv").config();

exports.signup = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        
        if(!firstName|| !lastName || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        //handle password and confirm password logic at frontend
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"User is already registered"
            })
        }

        try{
            hashedPassword = await bcrypt.hash(password, 10)
        }catch(error){
            return res.status(500).json({
                success:false,
                message:'Error in hashing password'
            })
        }

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })

        return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error during signup"
        })
    }
}


exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:'Please fill all the details'
            })
        }

        const user = await userModel.findOne({email}).populate('userFiles');

        if(!user){
            return res.status(500).json({
                success: false,
                message: "User is not registered"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            return res.status(200).json({
                success: true,
                message: "user logged in successfully",
                data:user
            })
        }else{
            return res.status(500).json({
                success:false,
                message: "Password is incorrect"
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Error while logging in",
            error:error.message
        })
    }
}