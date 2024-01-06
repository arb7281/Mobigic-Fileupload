import { setLoading, setUserData } from "../../slices/authSlice"
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"




  export function downloadFile(url) {
    return async(dispatch) => {
       dispatch(setLoading(true));
       try{
          console.log("I am inside try block of downloadFile")
          const response = await apiConnector("GET",url )
          
          console.log("Sending...", response);
  
          if(!response.data.success){
              throw new Error(response.data.message)
          }
            
          
       }catch(error){
          console.log("Sending downloadFile error", error)
          toast.error("Failed to download file")
       }
       dispatch(setLoading(false));
  }
 
 } 