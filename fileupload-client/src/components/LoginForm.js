import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/operations/authApi';



function LoginForm() {
    const [formData, setFormData] = useState({email:"", password:""})

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth)

    function changeHandler(event){

        setFormData((prev) => ({...prev, [event.target.name]: event.target.value})) 
    }

    function clickHandler(){
        setShowPassword((prev) => !prev)
    }

    function submitHnadler(event){
        event.preventDefault();
        dispatch(login(formData, navigate));
        console.log("printing UserData", userData);
    }

  return (
    <form onSubmit={submitHnadler}  className='flex flex-col w-full gap-y-4 mt-6'>
        <lable className="w-full">
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
            />

        </lable>

        <lable className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password <sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type={showPassword ? ("text") : ("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter password'
                name='password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
            />

            <span onClick={clickHandler} className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword ?  (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
            </span> 

        </lable>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]'>
            Sign In
        </button>
    </form>
  )
}

export default LoginForm