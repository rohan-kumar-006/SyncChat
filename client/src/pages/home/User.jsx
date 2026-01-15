import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/user.slice'

const User = ({ userDetails }) => {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.userReducer)
    const { onlineUsers } = useSelector(state => state.socketReducer)
    const [avatarError, setAvatarError] = useState(false)

    const isUserOnline = onlineUsers?.includes(userDetails?._id)
    const isSelected = selectedUser?._id === userDetails?._id

    const handleUserClick = () => {
        dispatch(setSelectedUser(userDetails))
    }

    const getInitials = (name = '') => {
        if (!name) return ''

        const words = name.split(' ')
        const first = words[0][0]
        const second = words[1]?.[0] || ''

        return (first + second).toUpperCase()
    }

    // Check if avatar is a custom upload (Cloudinary URL)
    const isCustomAvatar = (avatar) => {
        return avatar && avatar.includes('cloudinary')
    }

    const handleAvatarError = () => {
        setAvatarError(true)
    }

    return (
        <div
            onClick={handleUserClick}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 
            ${isSelected ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
        >
            <div className={`avatar ${isUserOnline ? 'online' : ''}`}>
                <div className="w-10 h-10 rounded-full border border-base-300 overflow-hidden">
                    {isCustomAvatar(userDetails?.avatar) && !avatarError ? (
                        <img 
                            src={userDetails.avatar} 
                            alt={userDetails?.fullName || userDetails?.username}
                            className="w-full h-full object-cover"
                            onError={handleAvatarError}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-amber-100">
                            <span className="font-bold text-sm uppercase text-amber-800">
                                {getInitials(userDetails?.fullName || userDetails?.username)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* User Info */}
            <div className='flex flex-col overflow-hidden'>
                <h2 className='font-semibold text-sm truncate capitalize'>{userDetails?.fullName}</h2>
                <p className={`text-xs truncate ${isSelected ? 'text-primary-content/70' : 'text-base-content/60'}`}>
                    @{userDetails?.username}
                </p>
            </div>
        </div>
    )
}

export default User