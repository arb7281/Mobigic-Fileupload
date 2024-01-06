import { setLoading, setUserData, setUserLoggedIn } from "../../slices/authSlice"
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"


export function deleteFile(fileName, userId, fileId) {
    const DELETE_API = `http://localhost:4000/api/v1/delete/${userId}/${fileId}/${fileName}`;
    console.log("printing SELETE_API", DELETE_API)
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", DELETE_API, null, null, null)
        console.log("printing response..", response)
  
        console.log("Delete API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("File deleted Successfuly")
        const userImage = 
          `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUserData({ ...response.data.data, image: userImage }))
        localStorage.setItem("userData", JSON.stringify(response.data.data))
        console.log("printing response.data.data", response.data.data)
        
      } catch (error) {
        console.log("Delete API ERROR............", error)
        toast.error(error.response.data.message)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setUserData(null))      
      localStorage.removeItem("userData")      
      toast.success("Logged Out")
      navigate("/")
    }
  }