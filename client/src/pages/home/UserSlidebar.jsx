import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../../store/slice/user/user.thunk';

const UserSlidebar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer)

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers)
    } else {
      setUsers(otherUsers.filter(user => 
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      ))
    }
  }, [searchValue, otherUsers])

  const handleLogout = () => {
    dispatch(logoutUserThunk())
  }

  return (
    <div className='w-80 flex flex-col h-full border-r border-base-300 bg-base-100'>
      
      {/* Header */}
      <div className='p-4 border-b border-base-300'>
        <h1 className='text-2xl font-bold text-primary mb-4 px-2'>SyncChat</h1>
        <label className="input input-bordered flex items-center gap-2 rounded-full bg-base-200">
          <IoSearch className="opacity-60" />
          <input 
            type="text" 
            className="grow" 
            placeholder="Search users..." 
            onChange={(e) => setSearchValue(e.target.value)} 
          />
        </label>
      </div>

      {/* User List - Scrollable */}
      <div className='flex-1 overflow-y-auto p-2 space-y-1'>
        {users?.length > 0 ? (
          users.map((userDetails) => (
            <User key={userDetails?._id} userDetails={userDetails} />
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 mt-5">No users found</div>
        )}
      </div>

      {/* Bottom Profile Section */}
      <div className='p-4 border-t border-base-300 bg-base-200/50 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className="avatar online">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userProfile?.avatar || "https://avatar.iran.liara.run/public"} alt="profile" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className='font-bold text-sm'>{userProfile?.fullName}</span>
            <span className='text-xs opacity-60'>@{userProfile?.username}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout} 
          className="btn btn-ghost btn-circle tooltip tooltip-left" 
          data-tip="Logout"
        >
          <BiLogOut className='text-2xl text-error' />
        </button>
      </div>
    </div>
  )
}

export default UserSlidebar