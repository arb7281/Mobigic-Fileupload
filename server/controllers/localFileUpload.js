const fileModel = require("../models/fileModel")
const userModel = require("../models/userModel")
const crypto = require('crypto');
require("dotenv").config()


exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.file;
        const name = req.body.firstName;
        const email = req.body.email;
        const userId = req.body.userId;

        if(!file || !name || !email || !userId ){
            console.log("all fields not received")
          return  res.status(500).json({
                success:false,
                message:'Something Went Wrong'
            })
        }
        console.log("printing user id", userId);
        // const user = await userModel.findOne({email});
        const currentDate = new Date().toISOString().slice(0, 10);

        // Get the extension of the original filename
        const extension = file.name.split('.').pop();

        const fileName = `${file.name.replace(/\.[^/.]+$/, '')}-${currentDate}.${extension}`;
        // const fileName = Date.now()+`.${file.name.split('.').pop()}`;
        // console.log("printing file name", fileName);

        let path = __dirname+"/files/"+`${fileName}`;
        // console.log("printing path", path)
        const generateUniqueCode = () => {
            const code = Math.floor(100000 + Math.random() * 900000);
            return code.toString();
        }

        // const generatedCode = generateUniqueCode();
        //find out more about following code
        function encryptCode(code) {
            const iv = crypto.randomBytes(16);
            const key = Buffer.from(process.env.SECRET_KEY, 'hex');
            const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
            let encryptedCode = cipher.update(code, 'utf-8', 'hex');
            encryptedCode += cipher.final('hex');
          
            // Prepend IV to encrypted code (as hex string)
            return iv.toString('hex') + encryptedCode;
          }

        const generatedCode = generateUniqueCode()
        console.log("printing generated code", generatedCode);
        const code = encryptCode(generatedCode);

        

        file.mv(path, (error)=>{
            if(error){
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message:'Something went wrong while saving file',
                    error:error.message
                })
            }
            
        }) 
        
        
        const fileUrl = '/api/v1/download/files/'; 

        const fileData = await fileModel.create({
            name,
            email,
            fileName,
            fileUrl:fileUrl,
            code
        })

        const updateUserData = await userModel.findByIdAndUpdate({ _id:userId}, { $push: { userFiles: fileData._id } }, {new: true}).populate("userFiles")

            res.json({
                success: true,
                message: 'file uploaded successfully',
                fileUrl: fileUrl,
                data:fileData,//will send Id using this through FE
                updateUserData,
                generatedCode:generatedCode
            })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}


