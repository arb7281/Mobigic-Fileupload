import React from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { signUp } from '../services/operations/authApi';

function SignupForm() {
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })

    const navigate = useNavigate();

    console.log(formData.password,formData.confirmPassword);

    const [showPassword, setShowPassword] = useState(false)
    const [confPassword, setConfPassword] = useState(false)

    function changeHandler(event){

        setFormData((prev) => ({...prev, [event.target.name]: event.target.value})) 
    }

    function clickHandler(){
        setShowPassword((prev) => !prev)
    }

     function confirmHandler(){
        setConfPassword(prev => !prev)
    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
         return toast.error("Password not matched");
        } else {
          dispatch(signUp(formData, navigate))  
        }
      }


  return (
    <div className='bg-cover'>
        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <div className='flex gap-x-4'>
            <label className="w-full">
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    First Name <sup className='text-pink-200'>*</sup>
                </p>  
                <input
                    required
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white '
                />              
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Last Name <sup className='text-pink-200'>*</sup>
                </p>  
                <input
                    required
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={changeHandler}
                    placeholder='Enter Last Name'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                />              
            </label>
            </div>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email <sup className='text-pink-200'>*</sup>
                </p>  
                <input
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter Email'
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                />              
            </label>

            <div className='flex gap-x-4'>
                    <lable className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        name='password'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
                    <span onClick={clickHandler} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword ?  (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
                    </span>

                    </lable>

                    <lable className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                       Confirm Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={confPassword ? ("text") : ("password")}
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        name='confirmPassword'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-white'
                    />
                    <span onClick={confirmHandler} className='absolute right-3 top-[38px] cursor-pointer '>
                        {confPassword ?  (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
                    </span>

                    </lable>
            </div>

            <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4'>
                Create Account 
            </button>
            
        </form>
    
    </div>
  )
}

export default SignupForm