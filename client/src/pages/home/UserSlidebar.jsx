import React, { useState, useEffect } from 'react'
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../../store/slice/user/user.thunk';
import UpdateProfile from './UpdateProfile';

const UserSlidebar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const [showUpdateProfile, setShowUpdateProfile] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
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

  // Get initials helper function
  const getInitials = (name = '') => {
    if (!name) return ''
    const words = name.split(' ')
    const first = words[0][0]
    const second = words[1]?.[0] || ''
    return (first + second).toUpperCase()
  }

  // Check if avatar is a custom upload (Cloudinary URL) or default
  const isCustomAvatar = (avatar) => {
    return avatar && avatar.includes('cloudinary')
  }

  const handleAvatarError = () => {
    setAvatarError(true)
  }

  return (
    <>
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
        <div className='p-4 border-t border-base-300 bg-base-200/50'>
          <div className='flex items-center gap-3 mb-3'>
            <div className="avatar online">
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                {isCustomAvatar(userProfile?.avatar) && !avatarError ? (
                  <img 
                    src={userProfile.avatar} 
                    alt="profile" 
                    className="w-full h-full object-cover"
                    onError={handleAvatarError}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary">
                    <span className="font-bold text-sm uppercase text-primary-content">
                      {getInitials(userProfile?.fullName || userProfile?.username)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className='font-bold text-sm truncate'>{userProfile?.fullName}</span>
              <span className='text-xs opacity-60 truncate'>@{userProfile?.username}</span>
            </div>
          </div>

          <div className='flex gap-2'>
            <button
              onClick={() => setShowUpdateProfile(true)}
              className="btn btn-sm btn-primary flex-1 gap-2"
            >
              <IoSettingsOutline className='text-lg' />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error btn-outline gap-2"
            >
              <BiLogOut className='text-lg' />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Update Profile Modal */}
      {showUpdateProfile && (
        <UpdateProfile onClose={() => setShowUpdateProfile(false)} />
      )}
    </>
  )
}

export default UserSlidebar