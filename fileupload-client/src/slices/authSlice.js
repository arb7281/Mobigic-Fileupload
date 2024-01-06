import {createSlice}  from "@reduxjs/toolkit";

const initialState = {
    userData : localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null,
    loading: false,
    userLoggedIn:true
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState, 
    reducers: {
        setUserData(state, value){
            state.userData = value.payload
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setUserLoggedIn(state, value){
            state.userLoggedIn = value.payload
        }
    }
})

export const {setUserData, setLoading, setUserLoggedIn} = authSlice.actions;

export default authSlice.reducer;