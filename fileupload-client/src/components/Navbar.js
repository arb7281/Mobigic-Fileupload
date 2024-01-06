import React from 'react'
import logo from "../assets/Logo.svg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';


function Navbar() {

    
    const dispatch = useDispatch();
    const {userLoggedIn} = useSelector((state) => state.auth);
    const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto '>

        <Link to="/">
            <img src={logo} alt='logo' width={160} height={32} loading='lazy'/>
        </Link>


        <div className='flex items-center gap-x-4'>
       
            {!userLoggedIn && 
                <Link to="/login">
                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Login
                    </button>
                </Link>
            }
            {!userLoggedIn  && 
                <Link to="/signup">
                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Sign up
                    </button>
                </Link>
            }
            { userLoggedIn &&
                <Link to="/">
                    <button onClick={() => {
                        dispatch(logout(navigate));                    
                    }} className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Log out
                    </button>
                </Link>
            }
            { userLoggedIn &&
                <Link to="/dashboard">
                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                        Dashboard
                    </button>
                </Link>
            }
        </div>

    </div>
  )
}

export default Navbar