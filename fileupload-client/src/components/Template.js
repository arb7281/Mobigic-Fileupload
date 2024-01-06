import React from 'react'

import SignupForm from './SignupForm';
import LoginForm from './LoginForm';


function Template({title, formtype}) {
    
  return (
    <div className='flex  justify-center w-11/12 max-w-[1160px] py-12 mx-auto gap-y-0 min-h-screen bg-richblack-900'>
        <div className='w-11/12 max-w-[450px] mx-0'>
          <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
            {formtype === "signup" ? (<SignupForm/>) : (<LoginForm/>)}
        </div>

        

     </div>
    
  )
}

export default Template