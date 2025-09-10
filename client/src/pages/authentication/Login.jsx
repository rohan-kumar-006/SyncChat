import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux'
import { loginUserThunk,getOtherUserThunk } from '../../store/slice/user/user.thunk';
import {useSelector} from "react-redux"

function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {isAuthenticated}=useSelector((state)=>state.userReducer)
    
  useEffect(()=>{
    if(isAuthenticated){
        dispatch(getOtherUserThunk())
        navigate("/")
    }},[isAuthenticated])


  const [loginData,setLoginData]=useState({
      username : "" ,
      password : "" ,
  })  

  const handleInputChange=(e)=>{
    setLoginData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin=async ()=>{
    // toast.success("Login Successful")
    const response=await dispatch(loginUserThunk(loginData))
    if(response?.payload?.success){
      navigate("/")
    }
  }
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className='flex flex-col gap-4 w-80 bg-base-200 p-6 rounded-lg'>
        <h2 className='text-lg text-center font-semibold'>Login</h2>
        <label className="input validator">
          <FaUser />
          <input
            type="text"
            name='username'
            required
            placeholder="Username"
            // pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            onChange={handleInputChange}
          />
        </label>

        <label className="input ">
          <IoKey />
          <input
            type="password"
            name='password'
            required
            placeholder="Password"
            onChange={handleInputChange}
            minLength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
        </p>
        <button onClick={handleLogin} className="btn btn-primary">Login</button>

        <p>
          Don't Have an Account? &nbsp;
          <Link to='/signup' className='text-blue-400 underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login