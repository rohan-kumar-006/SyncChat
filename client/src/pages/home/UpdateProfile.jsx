import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfileThunk } from '../../store/slice/user/user.thunk'
import { IoArrowBack, IoCamera } from 'react-icons/io5'

const UpdateProfile = ({ onClose }) => {
  const dispatch = useDispatch()
  const { userProfile, buttonLoading } = useSelector(state => state.userReducer)
  
  const [fullName, setFullName] = useState(userProfile?.fullName || '')
  const [avatarPreview, setAvatarPreview] = useState(userProfile?.avatar || '')
  const [avatarFile, setAvatarFile] = useState(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const data = new FormData()
    data.append('fullName', fullName)
    
    if (avatarFile) {
      data.append('avatar', avatarFile)
    }
    
    dispatch(updateUserProfileThunk(data)).then((result) => {
      if (result.type === 'user/updateProfile/fulfilled') {
        onClose()
      }
    })
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-base-100 rounded-lg w-full max-w-md shadow-xl'>
        {/* Header */}
        <div className='flex items-center gap-3 p-4 border-b border-base-300'>
          <button 
            onClick={onClose}
            className='btn btn-ghost btn-circle btn-sm'
          >
            <IoArrowBack className='text-xl' />
          </button>
          <h2 className='text-xl font-bold'>Update Profile</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6'>
          {/* Avatar Section */}
          <div className='flex flex-col items-center mb-6'>
            <div className='relative'>
              <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-primary'>
                <img 
                  src={avatarPreview} 
                  alt="Avatar" 
                  className='w-full h-full object-cover'
                />
              </div>
              <label 
                htmlFor='avatar-upload'
                className='absolute bottom-0 right-0 bg-primary text-primary-content p-3 rounded-full cursor-pointer hover:bg-primary-focus transition-colors'
              >
                <IoCamera className='text-xl' />
              </label>
              <input 
                type="file"
                id='avatar-upload'
                accept='image/*'
                onChange={handleAvatarChange}
                className='hidden'
              />
            </div>
            <p className='text-xs text-base-content/60 mt-2'>Click camera to change avatar</p>
          </div>

          {/* Username (Read Only) */}
          <div className='form-control mb-4'>
            <label className='label'>
              <span className='label-text font-semibold'>Username</span>
            </label>
            <input 
              type="text"
              value={userProfile?.username}
              className='input input-bordered w-full bg-base-200 cursor-not-allowed'
              disabled
            />
            <label className='label'>
              <span className='label-text-alt text-base-content/60'>Username cannot be changed</span>
            </label>
          </div>

          {/* Full Name */}
          <div className='form-control mb-6'>
            <label className='label'>
              <span className='label-text font-semibold'>Full Name</span>
            </label>
            <input 
              type="text"
              name='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='input input-bordered w-full'
              placeholder='Enter your full name'
              required
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-3'>
            <button 
              type='button'
              onClick={onClose}
              className='btn btn-ghost flex-1'
            >
              Cancel
            </button>
            <button 
              type='submit'
              className='btn btn-primary flex-1'
              disabled={buttonLoading}
            >
              {buttonLoading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile