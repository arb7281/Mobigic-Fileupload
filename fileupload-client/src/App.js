import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./services/operations/authApi";
// import Dashboard from "./pages/Dashboard";



function App() {


  return (

  <div className="w-screen h-auto bg-richblack-900 flex flex-col overflow-y-hidden">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={
        <PrivateRoute>
        <Dashboard/>
        </PrivateRoute>
        }/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>




  </div>
  
  )
}

export default App;
