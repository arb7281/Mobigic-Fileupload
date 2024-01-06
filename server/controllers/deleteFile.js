const fs = require('fs');
const userModel = require("../models/userModel");
const fileModel = require("../models/fileModel");

async function deleteFile(fileName) {
    const filePath = __dirname+"/files/"+`${fileName}`;

    // Check if the file exists before attempting to delete
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File ${fileName} deleted successfully.`);

        return true;
    } else {
        console.log(`File ${fileName} not found.`);
        return false;
    }
}

exports.fileDelete = async (req, res) => {
    try{
        const userId  = req.params.userId;

        const fileId = req.params.fileId;
        const fileName = req.params.fileName;
        console.log("printing userId, fileId, fileName", userId, fileId, fileName)
        const fileResponse = await fileModel.findById({_id: fileId})    
        console.log("printing fileresponse", fileResponse) ;
       

        if(!userId || !fileId || !fileName){
          console.log("All files not received")
          return  res.status(500).json({
                success: false,
                message: 'File not found or unable to delete'
            })
        }

        if(deleteFile(fileName)){
            try{
                

              const updatedFile = await fileModel.findByIdAndDelete({_id: fileId});
                // if(updatedFile) console.log("file deleted from fileDB");
              const updatedUser =  await userModel.findByIdAndUpdate(
                    { _id: userId },
                    {
                        $pull:{
                            userFiles:fileId,
                        }
                    },{new: true}
                ).populate("userFiles");
                // if(updatedUser) console.log("user is updated");
                // const User = userModel.findById(userId,  {new: true}).populate("userFiles")
                res.status(200).json({
                    success:true,
                    message:'File deleted successfully',
                    data:updatedUser
                })
            }catch(error){
                console.log(error.message);
                res.status(500).json({
                    success: false,
                    message: 'File not found or unable to delete'
                })
            }

        }else{
            console.log("error while deleting file from db")
            res.status(500).json({
                success: false,
                message: 'File not found or unable to delete'
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message:'Error while deleting the file',
            error: error.message
        })
    }
    
}