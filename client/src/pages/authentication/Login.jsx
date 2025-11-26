import React, { useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, getOtherUserThunk } from '../../store/slice/user/user.thunk';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.userReducer);

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOtherUserThunk());
      navigate("/");
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            {/* Username */}
            <label className="input input-bordered flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                className="grow"
                onChange={handleInputChange}
              />
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
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>

            {/* Button */}
            <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <div className="text-center mt-2">
            <p>Don't have an account?</p>
            <Link to="/register" className="link link-primary">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;