import { setLoading, setUserData, setUserLoggedIn } from "../../slices/authSlice"
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"



const {
    SIGNUP_API,
    LOGIN_API,    
  } = endpoints

export function signUp(formData, navigate){

    const {firstName,
        lastName,
        email,
        password,
        } = formData;
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }catch(error){
            console.log("Signup API error..", error)
            toast.error("Signup failed")
            navigate("/signup")
        }        
    }
}

export function login(formData, navigate) {
    
    const {email, password} = formData
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
        console.log("printing response..", response)
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        const userImage = response.data?.data?.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUserData({ ...response.data.data, image: userImage }))
        
        localStorage.setItem("userData", JSON.stringify(response.data.data))
        dispatch(setUserLoggedIn(true))
        console.log("printing response.data.data", response.data.data)
        navigate("/dashboard")
        
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
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
      dispatch(setUserLoggedIn(false))
      toast.success("Logged Out")
      navigate("/")
    }
  }