import {React,useState,useEffect} from 'react'
import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import toast from 'react-hot-toast';
import {useSelector} from "react-redux"

function Signup() {
    const dispatch =useDispatch()
    const navigate=useNavigate()

    const {isAuthenticated}=useSelector((state)=>state.userReducer)
        
      useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }},[isAuthenticated])

const [signupData,setSignupData]=useState({
      fullName : "" ,
      username : "",
      password : "" ,
      confirmPassword:"",
      gender:"male"
  })  

  const handleInputChange=(e)=>{
    setSignupData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSignup=async ()=>{
    // console.log(signupData)
    if(signupData.password!==signupData.confirmPassword){
      return toast.error("Password and Confirm Password don't match")
    }
    const response=await dispatch(registerUserThunk(signupData))
    if(response?.payload?.success){
      navigate("/")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className='flex flex-col gap-4 w-80 bg-base-200 p-6 rounded-lg'>
        <h2 className='text-lg text-center font-semibold'>Signup</h2>

        <label className="input ">
          <FaUser />
          <input
            type="text"
            required
            name='fullName'
            placeholder="Full Name"
            onChange={handleInputChange}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
          />
        </label>
        <label className="input ">
          <FaUser />
          <input
            type="text"
            name='username'
            required
            placeholder="Username"
            onChange={handleInputChange}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
          />
        </label>

        <label className="input ">
          <IoKey />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleInputChange}
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <label className="input ">
          <IoKey />
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            onChange={handleInputChange}
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>

        <div className='input input-brodered flex items-center gap-5'>
          <label htmlFor="male" className='flex gap-3 items-center'>
            <input
             type="radio"
              name="gender"
               id="male"
                value="male"
                 className='radio radio-primary'
                 onChange={handleInputChange}
                 />
          male       
          </label>
          <label htmlFor="female" className='flex gap-3 items-center'>
            <input
             type="radio"
              name="gender"
               id="female"
                value="female"
                 className='radio radio-primary'
                 onChange={handleInputChange}
                 />
          female       
          </label>
        </div>

        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
        </p>
        <button onClick={handleSignup} className="btn btn-primary">SignUp</button>

        <p>
          Already Have an Account? &nbsp;
          <Link to='/login' className='text-blue-400 underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup