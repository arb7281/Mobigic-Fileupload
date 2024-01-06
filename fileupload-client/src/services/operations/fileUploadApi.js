import { setLoading, setUserData, setUserLoggedIn } from "../../slices/authSlice"
import { toast } from "react-hot-toast"
// import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { uploadEndpoints } from "../apis"

const {
    FILE_UPLOAD_API
  } = uploadEndpoints;

 
export function uploadFile(file,userData) {

    return async(dispatch) => {
       dispatch(setLoading(true));
       try{
          console.log("I am inside try block of uploadFile")
          const formData = new FormData();
          formData.append('file', file)
          formData.append('firstName', userData.firstName);
          formData.append('email', userData.email);
          formData.append('userId', userData._id)
          // console.log("printing displayPicture of image", formData)
 
          const response = await apiConnector("POST",FILE_UPLOAD_API , formData) /* backend ki signup wali controller call hogi */
          
          console.log("Sending...", response);
  
          if(!response.data.success){
              throw new Error(response.data.message)
          }

          const userImage = response.data?.updateUserData?.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updateUserData.firstName} ${response.data.updateUserData.lastName}`
        dispatch(setUserData({ ...response.data.updateUserData, image: userImage }))
        
        // localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("userData", JSON.stringify(response.data.updateUserData))
          toast.success(`${response.data.message}`)
          

            toast.success(`Your unique code for download is ${response.data.generatedCode} pop up will be closed in 10 seconds`, {
            duration: 7000, 
            });

          
       }catch(error){
          console.log("Sending uploadImage error", error)
          toast.error("Failed to upload file")
       }
       dispatch(setLoading(false));
  }
 
 }