const fs = require('fs');
const fileModel = require("../models/fileModel")
require("dotenv").config()
const crypto = require('crypto');

exports.downloadFile = async (req, res) =>{
    try{

        const fileName = req.params.fileName;
        const id = req.params.fileId;
        const code = req.params.code;
        // console.log("printing req.body received from request", req.body);
        // const feCode = req.body.code;
        
        console.log("printing fileName", fileName);
        const filePath = __dirname+"/files/"+`${fileName}`;

        const response = await fileModel.findById(id);
        console.log("printing response from db", response)
        const receivedCode = response.code;
        console.log("printing received code", receivedCode);

        //find out more about this code
        function decryptCode(encryptedCode) {
            // Extract IV from the beginning (32 hex characters = 16 bytes)
            const iv = Buffer.from(encryptedCode.slice(0, 32), 'hex');
            const encryptedData = encryptedCode.slice(32); 
          
            const key = Buffer.from(process.env.SECRET_KEY, 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decryptedCode = decipher.update(encryptedData, 'hex', 'utf8');
            decryptedCode += decipher.final('utf8');
            return decryptedCode;
          }

        const deCode = decryptCode(receivedCode);

        if(deCode == code){
            if(!fs.existsSync(filePath)){
                
                return res.status(404).json({
                    success:false,
                    message:'File not found'
                })
            }
            
            res.download(filePath, fileName, (error)=> {
                if(error){
                    console.error(error);
                    res.status(500).json({
                        success:false,
                        message:'Something went wrong while downloading file',
                        error:error.message
                    });
                }        
            });
        }else{
            console.log("code is incorrect")
            res.status(500).json({
                success:false,
                message:'Code does not match',
            });
        }

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:'Something went wrong during execution of download file controller'
        })
    }
}