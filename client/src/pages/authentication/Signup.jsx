import React, { useState, useEffect } from 'react';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../../store/slice/user/user.thunk';
import toast from 'react-hot-toast';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.userReducer);

  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male"
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            
            {/* Full Name */}
            <label className="input input-bordered flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input type="text" name="fullName" required placeholder="Full Name" className="grow" onChange={handleInputChange} />
            </label>

            {/* Username */}
            <label className="input input-bordered flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input type="text" name="username" required placeholder="Username" className="grow" onChange={handleInputChange} />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <IoKey className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className="grow"
                onChange={handleInputChange}
                minLength="8"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>

            {/* Confirm Password */}
            <label className="input input-bordered flex items-center gap-2">
              <IoKey className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                className="grow"
                onChange={handleInputChange}
              />
            </label>

            {/* Gender */}
            <div className="flex justify-center gap-6 my-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  className="radio radio-primary" 
                  checked={signupData.gender === 'male'}
                  onChange={handleInputChange} 
                />
                <span>Male</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  className="radio radio-primary" 
                  checked={signupData.gender === 'female'}
                  onChange={handleInputChange} 
                />
                <span>Female</span>
              </label>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-2">
            <p>Already have an account?</p>
            <Link to="/login" className="link link-primary">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;